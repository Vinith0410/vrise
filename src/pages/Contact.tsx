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
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { postJson } from "@/lib/api";

const feedbackSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Please enter a valid email address").max(255, "Email must be less than 255 characters"),
  feedbackType: z.string().min(1, "Please select feedback type"),
  rating: z.string().min(1, "Please select a rating"),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(1000, "Message must be less than 1000 characters"),
});

type FeedbackData = z.infer<typeof feedbackSchema>;

const Contact = () => {
  const { toast } = useToast();

  const feedbackForm = useForm<FeedbackData>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      name: "",
      email: "",
      feedbackType: "",
      rating: "",
      message: "",
    },
  });

  const onFeedbackSubmit = async (data: FeedbackData) => {
    try {
      await postJson("/feedback", data);
      toast({
        title: "Feedback submitted!",
        description: "Thank you for helping us improve.",
      });
      feedbackForm.reset();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to submit feedback right now.";
      toast({ title: "Submission failed", description: message, variant: "destructive" });
    }
  };

  const feedbackTopics = [
    { value: "internship_program", label: "Internship Program" },
    { value: "mock_interview", label: "Mock Interview" },
    { value: "development_services", label: "Development & Projects" },
    { value: "support", label: "Support & Communication" },
    { value: "other", label: "Other" },
  ];

  const ratings = ["1 - Poor", "2 - Fair", "3 - Good", "4 - Very Good", "5 - Excellent"];

  const faqs = [
    {
      question: "How quickly will someone respond to my message?",
      answer: "We typically reply within 24 hours on business days. For urgent inquiries, please call us directly.",
    },
    {
      question: "Can I request both internship and project support?",
      answer: "Absolutely. Use the feedback form to describe your needs, and our team will connect you with the right specialists.",
    },
    {
      question: "Do you offer remote mock interviews?",
      answer: "Yes, all mock interview sessions are available online and can be scheduled at your convenience.",
    },
    {
      question: "What happens after I submit feedback?",
      answer: "Your feedback is routed to the relevant team. We'll follow up if we need clarification or can offer additional help.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-hero">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
            Contact &{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Feedback
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in">
            We'd love to hear from you. Send us your feedback, questions, or inquiries.
          </p>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center shadow-soft">
              <CardContent className="p-8">
                <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="text-sm text-muted-foreground">info@vrisetechno.com</p>
              </CardContent>
            </Card>
            <Card className="text-center shadow-soft">
              <CardContent className="p-8">
                <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Phone</h3>
                <p className="text-sm text-muted-foreground">+91 98765 43210</p>
              </CardContent>
            </Card>
            <Card className="text-center shadow-soft">
              <CardContent className="p-8">
                <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Location</h3>
                <p className="text-sm text-muted-foreground">Bangalore, India</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Unified Feedback Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-3xl">
          <Card className="shadow-strong">
            <CardContent className="p-8 lg:p-12">
              <h2 className="text-3xl font-bold mb-2">Share Your Feedback</h2>
              <p className="text-muted-foreground mb-8">
                One form for internships, mock interviews, and client engagements. Tell us what worked well and where we can do better.
              </p>

              <form onSubmit={feedbackForm.handleSubmit(onFeedbackSubmit)} className="space-y-6">
                <div>
                  <Label htmlFor="feedback-name">Your Name *</Label>
                  <Input
                    id="feedback-name"
                    {...feedbackForm.register("name")}
                    placeholder="Enter your name"
                    className="mt-2"
                  />
                  {feedbackForm.formState.errors.name && (
                    <p className="text-destructive text-sm mt-1">{feedbackForm.formState.errors.name.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="feedback-email">Email Address *</Label>
                  <Input
                    id="feedback-email"
                    type="email"
                    {...feedbackForm.register("email")}
                    placeholder="your.email@example.com"
                    className="mt-2"
                  />
                  {feedbackForm.formState.errors.email && (
                    <p className="text-destructive text-sm mt-1">{feedbackForm.formState.errors.email.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="feedback-type">Feedback Type *</Label>
                  <Select
                    value={feedbackForm.watch("feedbackType") ?? undefined}
                    onValueChange={(value) => feedbackForm.setValue("feedbackType", value, { shouldValidate: true })}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {feedbackTopics.map((topic) => (
                        <SelectItem key={topic.value} value={topic.value}>
                          {topic.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {feedbackForm.formState.errors.feedbackType && (
                    <p className="text-destructive text-sm mt-1">{feedbackForm.formState.errors.feedbackType.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="feedback-rating">Overall Rating *</Label>
                  <Select
                    value={feedbackForm.watch("rating") ?? undefined}
                    onValueChange={(value) => feedbackForm.setValue("rating", value, { shouldValidate: true })}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select rating" />
                    </SelectTrigger>
                    <SelectContent>
                      {ratings.map((rating) => (
                        <SelectItem key={rating} value={rating}>
                          {rating}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {feedbackForm.formState.errors.rating && (
                    <p className="text-destructive text-sm mt-1">{feedbackForm.formState.errors.rating.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="feedback-message">Your Feedback *</Label>
                  <Textarea
                    id="feedback-message"
                    {...feedbackForm.register("message")}
                    placeholder="Share your detailed feedback..."
                    rows={5}
                    className="mt-2"
                  />
                  {feedbackForm.formState.errors.message && (
                    <p className="text-destructive text-sm mt-1">{feedbackForm.formState.errors.message.message}</p>
                  )}
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={feedbackForm.formState.isSubmitting}>
                  <Send className="w-5 h-5 mr-2" />
                  {feedbackForm.formState.isSubmitting ? "Submitting..." : "Submit Feedback"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 px-4 bg-muted">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-3">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">
              Find quick answers to the most common questions from students, candidates, and clients.
            </p>
          </div>

          <Card className="shadow-soft">
            <CardContent className="p-0">
              <Accordion type="single" collapsible className="divide-y">
                {faqs.map((faq, index) => (
                  <AccordionItem key={faq.question} value={`faq-${index}`}>
                    <AccordionTrigger className="px-6">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
