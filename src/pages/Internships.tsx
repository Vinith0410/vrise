import { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { CheckCircle, Code, Award, Briefcase, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import internshipImage from "@/assets/internship.jpg";
import { postJson } from "@/lib/api";

const formSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Please enter a valid email address").max(255, "Email must be less than 255 characters"),
  mobile: z.string().trim().regex(/^[0-9]{10}$/, "Please enter a valid 10-digit mobile number"),
  domain: z.string().min(1, "Please select a domain"),
  college: z.string().trim().min(2, "Please enter your college name").max(200, "College name must be less than 200 characters"),
  year: z.string().min(1, "Please select your year"),
  reason: z.string().trim().max(1000, "Reason must be less than 1000 characters").optional(),
});

type FormData = z.infer<typeof formSchema>;

const Internships = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const { toast } = useToast();
  const formRef = useRef<HTMLDivElement | null>(null);

  const LS_KEY = "internship_form";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      domain: "",
      college: "",
      year: "",
      reason: "",
    },
  });

  // Preload saved values on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as Partial<FormData>;
        reset({
          name: saved.name ?? "",
          email: saved.email ?? "",
          mobile: saved.mobile ?? "",
          domain: saved.domain ?? "",
          college: saved.college ?? "",
          year: saved.year ?? "",
          reason: saved.reason ?? "",
        });
        setSelectedDomain(saved.domain ?? "");
        setSelectedYear(saved.year ?? "");
      }
    } catch {}
  }, [reset]);

  // Persist any changes to localStorage
  useEffect(() => {
    const subscription = watch((values) => {
      try {
        localStorage.setItem(LS_KEY, JSON.stringify(values));
      } catch {}
    });
    return () => subscription.unsubscribe?.();
  }, [watch]);

  const onSubmit = async (data: FormData) => {
    try {
      const res = await postJson("/internships/applications", data);
      setShowDialog(true);
      toast({
        title: "Application submitted!",
        description: "Our team will contact you soon.",
      });
      // Warn if email was not sent by backend
      const emailSent = (res as any)?.data?.emailSent;
      if (emailSent === false) {
        toast({ title: "Enter a valid mail", description: "We could not send a confirmation email.", variant: "destructive" });
      }
      // Reset the form and clear persisted values after successful submit
      localStorage.removeItem(LS_KEY);
      reset({ name: "", email: "", mobile: "", domain: "", college: "", year: "", reason: "" });
      setSelectedDomain("");
      setSelectedYear("");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to submit your application right now.";
      toast({ title: "Submission failed", description: message, variant: "destructive" });
    }
  };

  const domains = [
    "Full Stack Development",
    "Frontend Development",
    "Backend Development",
    "Data Analysis",
    "Power BI",
    "UI/UX Design",
    "Java Development",
    "Python Programming",
  ];

  const years = ["1st Year", "2nd Year", "3rd Year", "4th Year", "Graduate"];

  const benefits = [
    {
      icon: Code,
      title: "Real Projects",
      description: "Work on actual client projects and build your portfolio with real-world applications",
    },
    {
      icon: Users,
      title: "Expert Mentorship",
      description: "Learn from industry professionals with years of practical experience",
    },
    {
      icon: Award,
      title: "Certificate",
      description: "Receive certificate of completion recognized by industry",
    },
    {
      icon: Briefcase,
      title: "Career Support",
      description: "Get placement assistance and interview preparation guidance",
    },
  ];

  const trainingPrograms = [
    {
      name: "Full Stack Development",
      badge: "Most Popular",
      duration: "10-day internship",
      trainingHours: "20+ hours of live training",
      practicalHours: "Daily practical builds & deployments",
      price: "₹3,499",
      originalPrice: "₹4,999",
      modules: ["React + Node.js delivery", "Cloud deployment lab"],
    },
    {
      name: "Frontend Development",
      badge: "UI Sprint",
      duration: "10-day internship",
      trainingHours: "20+ hours of live training",
      practicalHours: "Hands-on UI builds every day",
      price: "₹2,999",
      originalPrice: "₹4,199",
      modules: ["Advanced React patterns", "Design-to-code challenges"],
    },
    {
      name: "Backend Engineering",
      badge: "API Sprint",
      duration: "10-day internship",
      trainingHours: "20+ hours of live training",
      practicalHours: "Daily API & DB practicals",
      price: "₹3,199",
      originalPrice: "₹4,499",
      modules: ["Microservice patterns", "Database scaling workshop"],
    },
    {
      name: "Data Analysis",
      badge: "Analytics Lab",
      duration: "10-day internship",
      trainingHours: "20+ hours of live training",
      practicalHours: "Practical notebooks and case studies",
      price: "₹2,899",
      originalPrice: "₹4,199",
      modules: ["Python data projects", "Reporting automation"],
    },
    {
      name: "Power BI",
      badge: "Dashboard Pro",
      duration: "10-day internship",
      trainingHours: "20+ hours of live training",
      practicalHours: "Daily dashboard practicals",
      price: "₹2,799",
      originalPrice: "₹3,999",
      modules: ["Business-ready dashboards", "Data gateway setup"],
    },
    {
      name: "UI/UX Design",
      badge: "Designer Pick",
      duration: "10-day internship",
      trainingHours: "20+ hours of live training",
      practicalHours: "Portfolio practicals & critiques",
      price: "₹2,799",
      originalPrice: "₹3,999",
      modules: ["Figma live critiques", "Case study masterclass"],
    },
  ];

  const teachingSchedule = [
    {
      title: "Hour 1 • Mentor-Led Session",
      description: "We teach the concept live, share use cases, and show how it appears in real project sprints.",
    },
    {
      title: "Hour 2 • Guided Practice",
      description: "You implement the same concept with mentor supervision, get feedback, and receive a focused task.",
    },
    {
      title: "Hour 3 • Deep-Dive Mentoring",
      description: "We regroup, answer blockers, introduce the next layer of the stack, and demo pro tips from client work.",
    },
    {
      title: "Hour 4 • Independent Build",
      description: "You apply the learning again with guidance available on call/chat, close the task, and log your learnings.",
    },
  ];

  const features = [
    "Duration: 4-8 weeks flexible timeline",
    "Real-time project exposure from day one",
    "Weekly evaluation and personalized feedback",
    "Industry-standard tools and technologies",
    "Recorded sessions for future reference",
    "24/7 mentor support and doubt clearing",
    "Resume building and LinkedIn optimization",
    "Mock interviews and soft skills training",
  ];

  const handleProgramApply = (programName: string) => {
    setSelectedDomain(programName);
    setValue("domain", programName, { shouldValidate: true });
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-hero">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Online{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Internship Programs
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Gain hands-on experience with real projects, expert mentorship, and industry-relevant skills that accelerate your career growth.
              </p>
            </div>
            <div className="animate-float">
              <img
                src={internshipImage}
                alt="Internship Programs"
                className="rounded-2xl shadow-strong w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Internship Benefits</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="text-center shadow-soft hover:shadow-medium transition-all animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Training Domains Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-4">Internship Training Domains</h2>
            <p className="text-lg text-muted-foreground">
              Choose from our wide range of specialized training programs. Each track includes 10 days of focused learning, 20+ hours of mentor-led training, and practical hours where you ship real work.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trainingPrograms.map((program, index) => (
              <Card
                key={program.name}
                className="relative shadow-soft hover:shadow-medium transition-all border border-border animate-fade-in"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <CardContent className="p-6 space-y-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wide">
                    {program.badge}
                  </span>
                  <div>
                    <h3 className="text-2xl font-bold">{program.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{program.duration}</p>
                    <p className="text-sm text-primary mt-1">{program.trainingHours}</p>
                    <p className="text-xs text-muted-foreground">{program.practicalHours}</p>
                  </div>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-3xl font-bold text-primary">{program.price}</span>
                    <span className="text-sm text-muted-foreground line-through">{program.originalPrice}</span>
                  </div>
                  <div className="space-y-2">
                    {program.modules.map((module) => (
                      <p key={module} className="text-sm text-muted-foreground flex items-center">
                        <span className="w-2 h-2 rounded-full bg-primary mr-2" />
                        {module}
                      </p>
                    ))}
                  </div>
                  <div className="rounded-xl bg-background px-4 py-3 border border-dashed border-primary/40 text-sm text-foreground">
                    Includes project reviews, certificate, and 10% loyalty discount on next program.
                  </div>
                  <Button className="w-full" variant="outline" onClick={() => handleProgramApply(program.name)}>
                    Apply for this Track
                  </Button>
                </CardContent>
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-primary rounded-t-xl" />
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How We Teach */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-10 space-y-3">
            <h2 className="text-4xl font-bold">How We Teach</h2>
            <p className="text-lg text-muted-foreground">
              Daily 4-hour internship pods that mix teaching, guided practice, independent builds, and feedback until you ship with confidence.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {teachingSchedule.map((slot, index) => (
              <Card
                key={slot.title}
                className="shadow-soft hover:shadow-medium transition-all animate-fade-in border border-border"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <CardContent className="p-6 space-y-3">
                  <p className="text-sm font-semibold uppercase tracking-wide text-primary">{slot.title}</p>
                  <p className="text-foreground">{slot.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-8">
            We repeat this cycle until you’re confident. Mentors stay on call, and tasks mimic what our client teams get every day.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">What's Included</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
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
        <div ref={formRef} className="container mx-auto max-w-2xl">
          <Card className="shadow-strong">
            <CardContent className="p-8 lg:p-12">
              <h2 className="text-3xl font-bold mb-2">Apply for Internship</h2>
              <p className="text-muted-foreground mb-8">
                Start your journey towards a successful tech career
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
                  <Label htmlFor="domain">Interested Domain *</Label>
                  <Select
                    value={selectedDomain || undefined}
                    onValueChange={(value) => {
                      setSelectedDomain(value);
                      setValue("domain", value, { shouldValidate: true });
                    }}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select your domain of interest" />
                    </SelectTrigger>
                    <SelectContent>
                      {domains.map((domain) => (
                        <SelectItem key={domain} value={domain}>
                          {domain}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.domain && (
                    <p className="text-destructive text-sm mt-1">{errors.domain.message}</p>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="college">College Name *</Label>
                    <Input
                      id="college"
                      {...register("college")}
                      placeholder="Your college name"
                      className="mt-2"
                    />
                    {errors.college && (
                      <p className="text-destructive text-sm mt-1">{errors.college.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="year">Year of Study *</Label>
                    <Select value={selectedYear || undefined} onValueChange={(value) => { setSelectedYear(value); setValue("year", value, { shouldValidate: true }); }}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map((year) => (
                          <SelectItem key={year} value={year}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.year && (
                      <p className="text-destructive text-sm mt-1">{errors.year.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="reason">Why do you want this internship? (optional)</Label>
                  <Textarea
                    id="reason"
                    {...register("reason")}
                    placeholder="You can share your goals or skip this section"
                    className="mt-2 min-h-32"
                  />
                  {errors.reason && (
                    <p className="text-destructive text-sm mt-1">{errors.reason.message}</p>
                  )}
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
              Thank you for your interest! Our team will review your application and contact you within 2-3 business days via email and phone.
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

export default Internships;
