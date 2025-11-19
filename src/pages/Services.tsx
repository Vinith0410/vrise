import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Code2,
  Users,
  Briefcase,
  Award,
  CheckCircle,
  ArrowRight,
  Globe,
  Smartphone,
  Database,
  Cloud,
  Presentation,
  BarChart3,
} from "lucide-react";

const Services = () => {
  const mainServices = [
    {
      icon: Code2,
      title: "Web Application Development",
      description: "Custom, scalable web applications built with modern technologies like React, Node.js, and cloud infrastructure.",
      features: [
        "Responsive & Mobile-First Design",
        "Performance Optimized",
        "SEO-Friendly Architecture",
        "Secure & Scalable Solutions",
      ],
      link: "/development",
    },
    {
      icon: Smartphone,
      title: "Software Application Development",
      description: "End-to-end software solutions tailored to your business needs with focus on user experience and reliability.",
      features: [
        "Custom Software Solutions",
        "Cross-Platform Development",
        "API Integration",
        "Maintenance & Support",
      ],
      link: "/development",
    },
    {
      icon: Users,
      title: "Online Internship Programs",
      description: "Comprehensive training programs with hands-on projects, mentorship, and industry-relevant skill development.",
      features: [
        "Real Project Experience",
        "Industry Expert Mentorship",
        "Certificate of Completion",
        "Portfolio Development",
      ],
      link: "/internships",
    },
  ];

  const internshipDomains = [
    { icon: Globe, name: "Full Stack Development" },
    { icon: Code2, name: "Frontend Development" },
    { icon: Database, name: "Backend Development" },
    { icon: BarChart3, name: "Data Analysis" },
    { icon: Presentation, name: "Power BI" },
    { icon: Cloud, name: "UI/UX Design" },
  ];

  const mockInterviewFeatures = [
    "Professional Industry Interviewers",
    "Personalized Mistake Summary Report",
    "Detailed Performance Feedback",
    "Interview Slot Confirmation via Email",
    "Multiple Technology Stack Options",
    "Affordable ₹49 Pricing",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-hero">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
            Our{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Services
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in">
            Comprehensive solutions for career growth, skill development, and business innovation
          </p>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="space-y-12">
            {mainServices.map((service, index) => (
              <Card
                key={index}
                className="shadow-medium hover:shadow-strong transition-all animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-8 lg:p-12">
                  <div className="grid lg:grid-cols-2 gap-8 items-center">
                    <div>
                      <div className="w-16 h-16 rounded-xl bg-gradient-primary flex items-center justify-center mb-6">
                        <service.icon className="w-8 h-8 text-white" />
                      </div>
                      <h2 className="text-3xl font-bold mb-4">{service.title}</h2>
                      <p className="text-lg text-muted-foreground mb-6">
                        {service.description}
                      </p>
                      <Button asChild size="lg" className="shadow-soft">
                        <Link to={service.link}>
                          Learn More <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                      </Button>
                    </div>
                    <div className="bg-gradient-card rounded-xl p-8">
                      <h3 className="font-semibold text-lg mb-4">Key Features:</h3>
                      <ul className="space-y-3">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start space-x-3">
                            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Internship Domains */}
      <section className="py-20 px-4 bg-muted">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Internship Training Domains</h2>
            <p className="text-xl text-muted-foreground">
              Choose from our wide range of specialized training programs
            </p>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
            {internshipDomains.map((domain, index) => (
              <Card
                key={index}
                className="text-center shadow-soft hover:shadow-medium transition-all animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CardContent className="p-6">
                  <domain.icon className="w-10 h-10 mx-auto mb-3 text-primary" />
                  <p className="font-medium text-sm">{domain.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mock Interview Service */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
                SPECIAL OFFER - ₹49 ONLY
              </div>
              <h2 className="text-4xl font-bold mb-6">Mock Interview Service</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Prepare for your dream job with professional mock interviews conducted by industry experts. Get detailed feedback and personalized improvement suggestions.
              </p>
              <Button asChild size="lg" className="shadow-soft">
                <Link to="/mock-interview">
                  Book Your Mock Interview <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
            <Card className="shadow-medium">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <Briefcase className="w-7 h-7 mr-3 text-primary" />
                  What You Get
                </h3>
                <ul className="space-y-4">
                  {mockInterviewFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-muted">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Why Choose Our Services?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center shadow-soft">
              <CardContent className="p-8">
                <Award className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-3">Quality Assured</h3>
                <p className="text-muted-foreground">
                  Every service is delivered with the highest standards of quality and professionalism
                </p>
              </CardContent>
            </Card>
            <Card className="text-center shadow-soft">
              <CardContent className="p-8">
                <Users className="w-12 h-12 mx-auto mb-4 text-secondary" />
                <h3 className="text-xl font-bold mb-3">Expert Team</h3>
                <p className="text-muted-foreground">
                  Learn from industry professionals with years of practical experience
                </p>
              </CardContent>
            </Card>
            <Card className="text-center shadow-soft">
              <CardContent className="p-8">
                <CheckCircle className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-3">Proven Results</h3>
                <p className="text-muted-foreground">
                  Join hundreds of satisfied students and clients who achieved their goals
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
