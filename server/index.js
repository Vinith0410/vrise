import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const {
  PORT = 4000,
  MONGODB_URI,
  EMAIL_USER,
  EMAIL_PASSWORD,
  EMAIL_FROM,
  NOTIFY_EMAIL,
  CLIENT_ORIGIN = "http://localhost:5173",
} = process.env;

if (!MONGODB_URI) {
  throw new Error("Missing MONGODB_URI in environment");
}

if (!EMAIL_USER || !EMAIL_PASSWORD || !EMAIL_FROM || !NOTIFY_EMAIL) {
  throw new Error("Missing email configuration (EMAIL_USER, EMAIL_PASSWORD, EMAIL_FROM, NOTIFY_EMAIL)");
}

const app = express();
app.use(
  cors({
    origin: CLIENT_ORIGIN.split(",").map((origin) => origin.trim()),
  }),
);
app.use(express.json({ limit: "15mb" }));

mongoose
  .connect(MONGODB_URI, { autoIndex: true })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
  },
});

const sendEmail = async ({ to, subject, html, attachments = [] }) =>
  transporter.sendMail({
    from: EMAIL_FROM,
    to,
    subject,
    html,
    attachments,
  });

const sendAcknowledgementEmails = async ({ userEmail, subject, message, attachments = [] }) => {
  await sendEmail({
    to: userEmail,
    subject,
    html: message,
  });

  await sendEmail({
    to: NOTIFY_EMAIL,
    subject: `[Admin Copy] ${subject}`,
    html: message,
    attachments,
  });
};

const baseRequiredString = {
  type: String,
  required: true,
  trim: true,
};

const internshipApplicationSchema = new mongoose.Schema(
  {
    name: baseRequiredString,
    email: baseRequiredString,
    mobile: baseRequiredString,
    domain: baseRequiredString,
    college: baseRequiredString,
    year: baseRequiredString,
    reason: {
      ...baseRequiredString,
      maxlength: 1000,
    },
  },
  { timestamps: true },
);

const mockInterviewSchema = new mongoose.Schema(
  {
    name: baseRequiredString,
    email: baseRequiredString,
    mobile: baseRequiredString,
    stack: baseRequiredString,
    experience: baseRequiredString,
    resume: {
      filename: String,
      mimetype: String,
      size: Number,
      data: Buffer,
    },
  },
  { timestamps: true },
);

const feedbackSchema = new mongoose.Schema(
  {
    name: baseRequiredString,
    email: baseRequiredString,
    feedbackType: baseRequiredString,
    rating: baseRequiredString,
    message: {
      ...baseRequiredString,
      maxlength: 1000,
    },
  },
  { timestamps: true },
);

const InternshipApplication = mongoose.model("InternshipApplication", internshipApplicationSchema);
const MockInterviewBooking = mongoose.model("MockInterviewBooking", mockInterviewSchema);
const Feedback = mongoose.model("Feedback", feedbackSchema);

const formatHtmlList = (title, items) => {
  const rows = Object.entries(items)
    .map(([key, value]) => `<li><strong>${key}:</strong> ${value ?? "N/A"}</li>`)
    .join("");
  return `<h2>${title}</h2><ul>${rows}</ul>`;
};

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: Date.now() });
});

app.post("/api/internships/applications", async (req, res) => {
  try {
    const { name, email, mobile, domain, college, year, reason } = req.body;

    if (!name || !email || !mobile || !domain || !college || !year || !reason) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    const application = await InternshipApplication.create({
      name,
      email,
      mobile,
      domain,
      college,
      year,
      reason,
    });

    const summary = formatHtmlList("Internship Application Received", {
      Name: name,
      Email: email,
      Mobile: mobile,
      Domain: domain,
      College: college,
      Year: year,
      Reason: reason,
    });

    await sendAcknowledgementEmails({
      userEmail: email,
      subject: `Thanks for applying for the ${domain} internship`,
      message: summary,
    });

    res.json({ success: true, message: "Application stored successfully.", data: { id: application._id } });
  } catch (error) {
    console.error("Internship application error:", error);
    res.status(500).json({ success: false, message: "Failed to save application." });
  }
});

app.post("/api/mock-interviews", async (req, res) => {
  try {
    const { name, email, mobile, stack, experience, resume } = req.body;

    if (!name || !email || !mobile || !stack || !experience) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    const resumePayload =
      resume && resume.content
        ? {
            filename: resume.filename,
            mimetype: resume.mimetype,
            size: resume.size,
            data: Buffer.from(resume.content, "base64"),
          }
        : undefined;

    const booking = await MockInterviewBooking.create({
      name,
      email,
      mobile,
      stack,
      experience,
      resume: resumePayload,
    });

    const summary = formatHtmlList("Mock Interview Booking Received", {
      Name: name,
      Email: email,
      Mobile: mobile,
      Stack: stack,
      Experience: experience,
    });

    const attachments =
      resumePayload && resumePayload.data
        ? [
            {
              filename: resumePayload.filename || "resume",
              content: resumePayload.data,
              contentType: resumePayload.mimetype,
            },
          ]
        : [];

    await sendAcknowledgementEmails({
      userEmail: email,
      subject: `Mock interview booking confirmed for ${stack}`,
      message: summary,
      attachments,
    });

    res.json({ success: true, message: "Mock interview stored successfully.", data: { id: booking._id } });
  } catch (error) {
    console.error("Mock interview booking error:", error);
    res.status(500).json({ success: false, message: "Failed to save mock interview booking." });
  }
});

app.post("/api/feedback", async (req, res) => {
  try {
    const { name, email, feedbackType, rating, message } = req.body;

    if (!name || !email || !feedbackType || !rating || !message) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    const feedback = await Feedback.create({
      name,
      email,
      feedbackType,
      rating,
      message,
    });

    const summary = formatHtmlList("Feedback Received", {
      Name: name,
      Email: email,
      "Feedback Type": feedbackType,
      Rating: rating,
      Message: message,
    });

    await sendAcknowledgementEmails({
      userEmail: email,
      subject: "Thanks for sharing your feedback",
      message: summary,
    });

    res.json({ success: true, message: "Feedback stored successfully.", data: { id: feedback._id } });
  } catch (error) {
    console.error("Feedback error:", error);
    res.status(500).json({ success: false, message: "Failed to save feedback." });
  }
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

app.use((error, _req, res, _next) => {
  console.error("Unexpected error:", error);
  res.status(500).json({ success: false, message: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`🚀 API server ready on http://localhost:${PORT}`);
});

