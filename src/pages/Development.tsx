import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import {
  Globe,
  Smartphone,
  Database,
  Cloud,
  Shield,
  Zap,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

const Development = () => {
  const services = [
    {
      icon: Globe,
      title: "Web Application Development",
      description: "Modern, responsive web applications built with React, Node.js, and cloud technologies for scalability and performance.",
      features: [
        "Single Page Applications (SPA)",
        "Progressive Web Apps (PWA)",
        "E-commerce Platforms",
        "Content Management Systems",
        "Custom Web Portals",
      ],
    },
    {
      icon: Smartphone,
      title: "Software Application Development",
      description: "Custom desktop and cross-platform applications tailored to your business requirements with intuitive user interfaces.",
      features: [
        "Desktop Applications",
        "Cross-Platform Solutions",
        "Enterprise Software",
        "API Development & Integration",
        "Legacy System Modernization",
      ],
    },
    {
      icon: Database,
      title: "Database Design & Management",
      description: "Robust database architecture and management solutions ensuring data integrity, security, and optimal performance.",
      features: [
        "Database Architecture",
        "Data Migration Services",
        "Performance Optimization",
        "Backup & Recovery Solutions",
        "Database Security",
      ],
    },
  ];

  const technologies = [
    { name: "React", category: "Frontend" },
    { name: "Node.js", category: "Backend" },
    { name: "TypeScript", category: "Language" },
    { name: "Python", category: "Language" },
    { name: "PostgreSQL", category: "Database" },
    { name: "MongoDB", category: "Database" },
    { name: "AWS", category: "Cloud" },
    { name: "Docker", category: "DevOps" },
  ];

  const process = [
    {
      step: "1",
      title: "Discovery & Planning",
      description: "Understanding your requirements, goals, and technical specifications",
    },
    {
      step: "2",
      title: "Design & Architecture",
      description: "Creating wireframes, UI/UX designs, and technical architecture",
    },
    {
      step: "3",
      title: "Development & Testing",
      description: "Agile development with continuous testing and quality assurance",
    },
    {
      step: "4",
      title: "Deployment & Support",
      description: "Smooth deployment with ongoing maintenance and support",
    },
  ];

  const benefits = [
    {
      icon: Zap,
      title: "Fast Delivery",
      description: "Agile methodology ensures quick turnaround times without compromising quality",
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Industry-standard security practices and robust error handling",
    },
    {
      icon: Cloud,
      title: "Scalable Solutions",
      description: "Architecture designed to grow with your business needs",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-hero">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
            Web & Software{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Development
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 animate-fade-in">
            Transform your ideas into powerful, scalable applications with cutting-edge technologies and expert development
          </p>
          <Button asChild size="lg" className="shadow-medium animate-fade-in">
            <Link to="/contact">
              Get Started <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center">Our Development Services</h2>
          <div className="space-y-12">
            {services.map((service, index) => (
              <Card
                key={index}
                className="shadow-medium hover:shadow-strong transition-all animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-8 lg:p-12">
                  <div className="grid lg:grid-cols-2 gap-8 items-start">
                    <div>
                      <div className="w-16 h-16 rounded-xl bg-gradient-primary flex items-center justify-center mb-6">
                        <service.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-3xl font-bold mb-4">{service.title}</h3>
                      <p className="text-lg text-muted-foreground">
                        {service.description}
                      </p>
                    </div>
                    <div className="bg-gradient-card rounded-xl p-8">
                      <h4 className="font-semibold text-lg mb-4">Key Offerings:</h4>
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

      {/* Technologies Section */}
      <section className="py-20 px-4 bg-muted">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center">Technologies We Use</h2>
          <p className="text-xl text-muted-foreground text-center mb-12">
            Modern, proven technologies for robust applications
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {technologies.map((tech, index) => (
              <Card
                key={index}
                className="text-center shadow-soft hover:shadow-medium transition-all animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CardContent className="p-6">
                  <p className="font-bold text-lg mb-1">{tech.name}</p>
                  <p className="text-sm text-muted-foreground">{tech.category}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center">Our Development Process</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <Card
                key={index}
                className="text-center shadow-soft hover:shadow-medium transition-all animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-muted">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center">Why Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-8">
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

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <Card className="bg-gradient-primary text-white shadow-strong">
            <CardContent className="p-12 text-center">
              <h2 className="text-4xl font-bold mb-4">Ready to Build Your Application?</h2>
              <p className="text-xl mb-8 text-white/90">
                Let's discuss your project and create something amazing together
              </p>
              <Button asChild size="lg" variant="secondary">
                <Link to="/contact">
                  Contact Us Now <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Development;
