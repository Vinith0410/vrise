import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

dotenv.config();

// Resolve __dirname in ESM and compute dist path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, "..", "dist");

const {
  PORT = 5000,
  MONGODB_URI,
  EMAIL_USER,
  EMAIL_PASSWORD,
  EMAIL_FROM,
  NOTIFY_EMAIL,
  CLIENT_ORIGIN = "http://localhost:5173",
} = process.env;

// Enable/disable email sending (set EMAIL_ENABLED=false in .env for local dev)
const EMAIL_ALLOW_SELF_SIGNED = (process.env.EMAIL_ALLOW_SELF_SIGNED ?? "false").toLowerCase() === "true";
const EMAIL_ENABLED = (process.env.EMAIL_ENABLED ?? "true").toLowerCase() !== "false";

if (!MONGODB_URI) {
  throw new Error("Missing MONGODB_URI in environment");
}

if (EMAIL_ENABLED && (!EMAIL_USER || !EMAIL_PASSWORD || !EMAIL_FROM || !NOTIFY_EMAIL)) {
  throw new Error("Missing email configuration (EMAIL_USER, EMAIL_PASSWORD, EMAIL_FROM, NOTIFY_EMAIL)");
}

const app = express();
app.use(
  cors({
    origin: CLIENT_ORIGIN.split(",").map((origin) => origin.trim()),
  }),
);
app.use(express.json({ limit: "15mb" }));

// Serve static files with proper MIME types
app.use(express.static(path.join(__dirname, "..", "dist"), {
  setHeaders: (res, path) => {
    if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    } else if (path.endsWith('.mjs')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
  }
}));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
});


mongoose
  .connect(MONGODB_URI, { autoIndex: true })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });

// Conditionally create the transporter only when emails are enabled
const transporter = EMAIL_ENABLED
  ? nodemailer.createTransport({
      service: "gmail",
      auth: { user: EMAIL_USER, pass: EMAIL_PASSWORD },
      tls: EMAIL_ALLOW_SELF_SIGNED ? { rejectUnauthorized: false } : undefined,
    })
  : null;

const sendEmail = async ({ to, subject, html, attachments = [] }) => {
  if (!EMAIL_ENABLED || !transporter) {
    console.log("[email:disabled] would send:", { to, subject });
    return;
  }

  return transporter.sendMail({
    from: EMAIL_FROM,
    to,
    subject,
    html,
    attachments,
  });
};

const sendAcknowledgementEmails = async ({ userEmail, subject, message, attachments = [] }) => {
  // Return a boolean indicating whether emails were actually sent
  if (!EMAIL_ENABLED || !transporter) {
    // Email disabled in env
    return false;
  }
  try {
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

    return true;
  } catch (err) {
    console.warn("Email sending failed:", err);
    return false; // Do not throw to avoid breaking API responses
  }
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

// Frie ndly user email templates
const userEmailTemplates = {
  internship: ({ name, domain }) => `
    <h1>Thank you, ${name}!</h1>
    <p>Your ${domain} internship application has been received and is under review.</p>
    <p>Fees and timing details will be shared by our team soon. We will contact you shortly with next steps.</p>
  `,
  mockInterview: ({ name, stack }) => `
    <h1>Mock Interview Booking Confirmed</h1>
    <p>Hi ${name}, your mock interview for ${stack} has been booked.</p>
    <p>Payment and timing details will be shared by our team soon. You will receive a confirmation email shortly.</p>
  `,
  feedback: ({ name }) => `
    <h1>Thanks for your feedback</h1>
    <p>Dear ${name}, we appreciate you taking the time to share your feedback. It helps us improve.</p>
  `,
};

app.get("/api/health", (_req, res) => {
  res.json({ success: true, message: "OK" });
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

    const summary = formatHtmlList("Internship Application Details", {
      Name: name,
      Email: email,
      Mobile: mobile,
      Domain: domain,
      College: college,
      Year: year,
      Reason: reason,
    });

    const messageHtml = `${userEmailTemplates.internship({ name, domain })}${summary}`;

    const emailSent = await sendAcknowledgementEmails({
      userEmail: email,
      subject: `Thanks for applying for the ${domain} internship`,
      message: messageHtml,
    });

    res.json({ success: true, message: "Application stored successfully.", data: { id: application._id, emailSent } });
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

    const summary = formatHtmlList("Mock Interview Booking Details", {
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

    const messageHtml = `${userEmailTemplates.mockInterview({ name, stack })}${summary}`;

    const emailSent = await sendAcknowledgementEmails({
      userEmail: email,
      subject: `Mock interview booking confirmed for ${stack}`,
      message: messageHtml,
      attachments,
    });

    res.json({ success: true, message: "Mock interview stored successfully.", data: { id: booking._id, emailSent } });
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

    const summary = formatHtmlList("Feedback Details", {
      Name: name,
      Email: email,
      "Feedback Type": feedbackType,
      Rating: rating,
      Message: message,
    });

    const messageHtml = `${userEmailTemplates.feedback({ name })}${summary}`;

    const emailSent = await sendAcknowledgementEmails({
      userEmail: email,
      subject: "Thanks for sharing your feedback",
      message: messageHtml,
    });

    res.json({ success: true, message: "Feedback stored successfully.", data: { id: feedback._id, emailSent } });
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

// Serve frontend build if present (production) BEFORE 404
if (fs.existsSync(distPath)) {
  // Static assets
  app.use(express.static(distPath));
  // SPA fallback for non-API routes
  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api")) return next();
    res.sendFile(path.join(distPath, "index.html"));
  });
}

// 404 handler (keep after SPA fallback)
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`🚀 API server ready on http://localhost:${PORT}`);
});

// Frontend serving configured above (removed duplicate)
// if (fs.existsSync(distPath)) {
//   app.use(express.static(distPath));
//   app.get("*", (req, res, next) => {
//     if (req.path.startsWith("/api")) return next();
//     res.sendFile(path.join(distPath, "index.html"));
//   });
// }

