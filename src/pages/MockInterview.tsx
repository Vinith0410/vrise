import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import mockInterviewImage from "@/assets/mock-interview.jpg";
import { postJson } from "@/lib/api";

const formSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Please enter a valid email address").max(255, "Email must be less than 255 characters"),
  mobile: z.string().trim().regex(/^[0-9]{10}$/, "Please enter a valid 10-digit mobile number"),
  stack: z.string().min(1, "Please enter your interview stack"),
  experience: z.string().min(1, "Please select your experience level"),
});

type FormData = z.infer<typeof formSchema>;

const MockInterview = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [selectedExperience, setSelectedExperience] = useState<string>("");
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      stack: "",
      experience: "",
    },
  });

  const fileToBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        const base64 = result.includes(",") ? result.split(",").pop() ?? "" : result;
        resolve(base64);
      };
      reader.onerror = () => reject(reader.error ?? new Error("Failed to read file"));
      reader.readAsDataURL(file);
    });

  const onSubmit = async (data: FormData) => {
    try {
      let resumePayload;
      if (resumeFile) {
        resumePayload = {
          filename: resumeFile.name,
          mimetype: resumeFile.type,
          size: resumeFile.size,
          content: await fileToBase64(resumeFile),
        };
      }

      const resp = await postJson<{ emailSent?: boolean }>("/mock-interviews", { ...data, resume: resumePayload });
      setShowDialog(true);
      reset({ name: "", email: "", mobile: "", stack: "", experience: "" });
      setResumeFile(null);
      setSelectedExperience("");
      localStorage.removeItem("mockInterviewForm");
      toast({
        title: "Application submitted!",
        description: "Interview slot will be sent to your email.",
      });
      const emailSent = resp?.data?.emailSent;
      if (emailSent === false) {
        toast({ title: "Enter a valid mail", description: "Email was not delivered. Please check your email address.", variant: "destructive" });
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to submit your request right now.";
      toast({ title: "Submission failed", description: message, variant: "destructive" });
    }
  };

  const features = [
    "Professional industry interviewers with 5+ years experience",
    "Personalized mistake summary and improvement report",
    "Detailed performance feedback on technical and soft skills",
    "Interview slot confirmation via email within 24 hours",
    "Multiple technology stack options available",
    "Video interview recording for your reference",
  ];

  const stacks = [
    "Full Stack Development",
    "Frontend Development",
    "Backend Development",
    "Java Development",
    "Python Development",
    "Power BI & Data Analytics",
    "UI/UX Design",
    "Data Analytics",
  ];

  const experienceLevels = [
    "Fresher (0 months)",
    "6 Months Experience",
    "1 Year Experience",
    "2 Years Experience",
    "Other",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-hero">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
                SPECIAL OFFER - ₹49 ONLY
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Mock Interview{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Service
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Prepare for your dream job with professional mock interviews conducted by industry experts. Get detailed feedback and boost your confidence.
              </p>
            </div>
            <div className="animate-float">
              <img
                src={mockInterviewImage}
                alt="Mock Interview"
                className="rounded-2xl shadow-strong w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">What You Get</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-foreground">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-2xl">
          <Card className="shadow-strong">
            <CardContent className="p-8 lg:p-12">
              <h2 className="text-3xl font-bold mb-2">Book Your Mock Interview</h2>
              <p className="text-muted-foreground mb-8">
                Fill in the details below and we'll send your interview slot to your email
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    {...register("name")}
                    placeholder="Enter your full name"
                    className="mt-2"
                  />
                  {errors.name && (
                    <p className="text-destructive text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="your.email@example.com"
                    className="mt-2"
                  />
                  {errors.email && (
                    <p className="text-destructive text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="mobile">Mobile Number *</Label>
                  <Input
                    id="mobile"
                    {...register("mobile")}
                    placeholder="10-digit mobile number"
                    className="mt-2"
                  />
                  {errors.mobile && (
                    <p className="text-destructive text-sm mt-1">{errors.mobile.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="stack">Preferred Interview Stack (you can type your own) *</Label>
                  <Input
                    id="stack"
                    {...register("stack")}
                    placeholder="Enter your preferred stack (e.g., React, Node.js, Java)"
                    className="mt-2"
                  />
                  {errors.stack && (
                    <p className="text-destructive text-sm mt-1">{errors.stack.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="experience">Experience Level *</Label>
                  <Select value={selectedExperience || undefined} onValueChange={(value) => { setSelectedExperience(value); setValue("experience", value, { shouldValidate: true }); }}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select your experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      {experienceLevels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.experience && (
                    <p className="text-destructive text-sm mt-1">{errors.experience.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="resume">Upload Resume (Optional)</Label>
                  <div className="mt-2">
                    <label
                      htmlFor="resume"
                      className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors"
                    >
                      <Upload className="w-5 h-5 mr-2 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {resumeFile ? resumeFile.name : "Click to upload resume (PDF, DOC, DOCX)"}
                      </span>
                    </label>
                    <input
                      id="resume"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                      className="hidden"
                    />
                  </div>
                </div>

                <div className="bg-accent/50 p-6 rounded-lg border border-border">
                  <p className="text-lg font-semibold text-center text-primary">
                    Mock Interview Price: ₹49 Only
                  </p>
                  <p className="text-sm text-center text-muted-foreground mt-2">
                    Payment details will be shared via email
                  </p>
                </div>

                <Button type="submit" size="lg" className="w-full shadow-medium" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Success Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center text-primary">
              <CheckCircle className="w-6 h-6 mr-2" />
              Application Submitted!
            </DialogTitle>
            <DialogDescription className="text-base pt-4">
              Thank you for applying! Your interview slot will be sent to your email within 24 hours. Please check your inbox and spam folder.
            </DialogDescription>
          </DialogHeader>
          <Button onClick={() => setShowDialog(false)} className="mt-4">
            Close
          </Button>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default MockInterview;
