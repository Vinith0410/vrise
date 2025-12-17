import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  Code,
  Users,
  Briefcase,
  Award,
  ArrowRight,
  CheckCircle,
  Star,
  Laptop,
  MessageSquare,
} from "lucide-react";
import heroImage from "@/assets/hero-tech.jpg";

const Home = () => {
  const services = [
    {
      icon: Code,
      title: "Web & Software Development",
      description: "Custom applications built with cutting-edge technologies tailored to your business needs.",
      link: "/development",
    },
    {
      icon: Users,
      title: "Online Internship Programs",
      description: "Comprehensive training in Full Stack, Frontend, Backend, Data Analysis, Power BI & UI/UX.",
      link: "/internships",
    },
    {
      icon: Briefcase,
      title: "Mock Interview Service",
      description: "Professional mock interviews at just ₹49 with industry experts and personalized feedback.",
      link: "/mock-interview",
    },
  ];

  const benefits = [
    "Real-time project exposure and hands-on experience",
    "Personalized feedback from industry professionals",
    "Comprehensive skill evaluation and growth tracking",
    "Affordable pricing with maximum value delivery",
    "Certificate of completion for internship programs",
    "24/7 support and mentorship throughout your journey",
  ];

  const testimonialCategories = [
    {
      title: "Internship Feedback",
      description: "Stories from learners who completed our structured internship journeys.",
      testimonials: [
        {
          name: "Kanishka",
          role: "Data Analytics Intern",
          content: "I learned how to handle data effectively and create pivot tables independently. I also created bar charts using both Excel and Power BI. The guidance provided was excellent and helped me build strong practical skills.",
          rating: 5,
        },
        {
          name: "Darshini",
          role: "UI/UX Intern",
          content: "I gained solid UI/UX knowledge and learned to design professional interfaces using Figma. The guidance from the Vrise team gave me confidence and helped me think like a designer. I’m truly grateful for their support.",
          rating: 5,
        },
        {
          name: "Haritha",
          role: "Full Stack Intern",
          content: "I built a full-stack application from development to deployment during my internship. The application is live and shareable, which makes me feel incredibly proud. Achieving this in such a short time was an amazing experience. Thank you to the Vrise team for their excellent guidance and support.",
          rating: 5,
        },
      ],
    },
    {
      title: "Mock Interview Feedback",
      description: "Professionals who improved their interview performance with our ₹49 sessions.",
      testimonials: [
        {
          name: "Rahul",
          role: "Mock Interview Participant",
          content: "The mock interview felt like a real interview. My mistakes were clearly identified, and I received proper guidance and solutions to improve. It was a very helpful and confidence-boosting experience.",
          rating: 5,
        },
        {
          name: "Rajesh",
          role: "Data Analyst Aspirant",
          content: "The data analysis mock interview felt real and well structured. I got clear feedback, useful tips, and guidance that was completely worth the money. It really boosted my confidence.",
          rating: 5,
        },
        {
          name: "Priya",
          role: "Full-Stack Developer",
          content: "The full-stack mock interview felt like a real interview. They clearly pointed out my mistakes and explained how to fix them. The guidance was completely worth the money—honestly, it feels like they could charge more for this level of support. It was an awesome experience.",
          rating: 5,
        },
      ],
    },
    {
      title: "Client Project Feedback",
      description: "Product owners who trusted us with application builds and support.",
      testimonials: [
        {
          name: "Murugesan",
          role: "Murugesan Auditing",
          content: "File handling in our auditor office was difficult earlier, but this application made it simple and efficient. It works smoothly, is reasonably priced, and comes with good support. We are very satisfied.",
          rating: 5,
        },
        {
          name: "Arun",
          role: "Elite System",
          content: "The Elite System billing software made our billing process fast and simple. It works smoothly, is easy to use, and is reasonably priced. Excellent support and a very satisfying experience.",
          rating: 5,
        },
      ],
    },
  ];

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

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-background/80" />
        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="animate-fade-in">
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                We Build.{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  You Rise.
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Empowering careers through quality training, innovative development, and professional growth opportunities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="text-lg shadow-medium hover:shadow-strong transition-all">
                  <Link to="/internships">
                    Explore Internships <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg">
                  <Link to="/mock-interview">Mock Interview - ₹49</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What We Do</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive solutions for your career growth and business development needs
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="group hover:shadow-medium transition-all duration-300 border-border animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="text-muted-foreground mb-6">{service.description}</p>
                  <Button asChild variant="ghost" className="group-hover:bg-accent">
                    <Link to={service.link}>
                      Learn More <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Training Domains */}
      <section className="py-20 px-4 bg-muted">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Training Domains</h2>
            <p className="text-xl text-muted-foreground">
              Master in-demand skills with expert-led training programs
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {domains.map((domain, index) => (
              <div
                key={index}
                className="bg-card p-6 rounded-xl shadow-soft hover:shadow-medium transition-all text-center animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <Laptop className="w-8 h-8 mx-auto mb-3 text-primary" />
                <p className="font-medium text-sm">{domain}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Why Choose V Rise?</h2>
              <p className="text-xl text-muted-foreground mb-8">
                We are committed to delivering excellence through innovation, dedication, and personalized attention to every individual.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-foreground">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-card rounded-2xl p-8 shadow-medium">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Award className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold">10+</h4>
                    <p className="text-muted-foreground">Students Trained</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center">
                    <Star className="w-8 h-8 text-secondary" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold">4.9/5</h4>
                    <p className="text-muted-foreground">Average Rating</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Briefcase className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold">10+</h4>
                    <p className="text-muted-foreground">Projects Delivered</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-muted">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What People Say About Us</h2>
            <p className="text-xl text-muted-foreground">
              Real feedback from interns, mock interview candidates, and clients
            </p>
          </div>
          <div className="space-y-12">
            {testimonialCategories.map((category, categoryIndex) => (
              <div key={category.title}>
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold">{category.title}</h3>
                  <p className="text-muted-foreground mt-2">{category.description}</p>
                </div>
                <div
                  className={`grid gap-8 justify-items-center ${
                    category.testimonials.length === 2 ? "md:grid-cols-2 max-w-4xl mx-auto" : "md:grid-cols-2 lg:grid-cols-3"
                  }`}
                >
                  {category.testimonials.map((testimonial, testimonialIndex) => (
                    <Card
                      key={`${category.title}-${testimonialIndex}`}
                      className="shadow-soft hover:shadow-medium transition-all animate-fade-in"
                      style={{ animationDelay: `${categoryIndex * 120 + testimonialIndex * 60}ms` }}
                    >
                      <CardContent className="p-8">
                        <div className="flex mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                          ))}
                        </div>
                        <p className="text-foreground mb-6 italic">"{testimonial.content}"</p>
                        <div>
                          <p className="font-semibold">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <Card className="bg-gradient-primary text-white shadow-strong">
            <CardContent className="p-12 text-center">
              <h2 className="text-4xl font-bold mb-4">Ready to Rise with Us?</h2>
              <p className="text-xl mb-8 text-white/90">
                Join hundreds of successful students who transformed their careers with V Rise Techno Group
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="secondary" className="text-lg">
                  <Link to="/internships">
                    Start Your Internship <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-lg bg-white text-primary hover:bg-white/90">
                  <Link to="/contact">
                    Contact Us <MessageSquare className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
