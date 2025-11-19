import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, Heart, Zap } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Mission",
      description: "To empower aspiring professionals with industry-relevant skills, real-world experience, and personalized mentorship that accelerates their career growth.",
    },
    {
      icon: Eye,
      title: "Vision",
      description: "To become the most trusted platform for professional development, bridging the gap between education and employment through innovative training solutions.",
    },
    {
      icon: Heart,
      title: "Values",
      description: "Integrity, Excellence, Innovation, and Student Success drive everything we do. We believe in quality education accessible to everyone.",
    },
    {
      icon: Zap,
      title: "Approach",
      description: "Hands-on learning with real projects, industry expert mentorship, continuous feedback, and personalized growth tracking for each student.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-hero">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
            About{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              V Rise Techno Group
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in">
            We are a technology training and development company committed to empowering individuals and businesses through innovative solutions and comprehensive learning programs.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-secondary/5 animate-pulse-slow pointer-events-none" />
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-12 space-y-4 animate-fade-in">
            <h2 className="text-4xl font-bold">Our Story</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We obsess over two things: students shipping production-ready work, and clients watching their products improve every sprint.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-start">
            <Card className="relative overflow-hidden border border-primary/10 shadow-strong animate-fade-in" style={{ animationDelay: "100ms" }}>
              <div className="absolute inset-0 bg-gradient-primary/30 blur-3xl opacity-30" />
              <CardContent className="relative p-10 space-y-6">
                <div className="inline-flex items-center px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold uppercase tracking-wide animate-fade-in" style={{ animationDelay: "150ms" }}>
                  Students × Clients
                </div>
                <p className="text-xl text-foreground leading-relaxed">
                  Every internship brief mirrors a real client problem. Learners collaborate with mentors, shadow scrum ceremonies, and present updates the same way we do in production teams. It keeps the learning curve steep, and the wins visible.
                </p>
                <p className="text-lg text-muted-foreground">
                  Meanwhile, founders get a nimble product squad that ships MVPs, dashboards, and automations with measurable lifts. They see prototypes every week, giving them proof of progress—not promises.
                </p>
                <p className="text-lg text-muted-foreground">
                  When both sides share the same backlog and demo cadence, improvements become infectious—students grow into confident contributors and clients gain features that actually move their metrics.
                </p>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="border border-border shadow-soft hover:shadow-medium transition-all animate-slide-up" style={{ animationDelay: "200ms" }}>
                <CardContent className="p-6 space-y-3">
                  <p className="text-sm font-semibold uppercase tracking-wide text-primary">Student Breakthroughs</p>
                  <p className="text-foreground">
                    Code reviews, mock interviews, and stand-ups happen side-by-side so interns learn accountability fast. When they demo to clients, their improvements become real metrics, not just portfolio lines.
                  </p>
                </CardContent>
              </Card>
              <Card className="border border-border shadow-soft hover:shadow-medium transition-all animate-slide-up" style={{ animationDelay: "340ms" }}>
                <CardContent className="p-6 space-y-3">
                  <p className="text-sm font-semibold uppercase tracking-wide text-secondary">Client Lift</p>
                  <p className="text-foreground">
                    Founders plug into our product pod to see weekly prototypes, iterate faster, and deploy features that reduce manual hours. Student energy plus senior oversight keeps quality and velocity high.
                  </p>
                </CardContent>
              </Card>
              <Card className="border border-border shadow-soft hover:shadow-medium transition-all animate-slide-up" style={{ animationDelay: "480ms" }}>
                <CardContent className="p-6 space-y-3">
                  <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Shared Wins</p>
                  <p className="text-foreground">
                    When learners ship features used by real customers, both sides win. Students build confidence; clients see better retention. That feedback loop is the heart of our story.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-muted">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center">Our Core Principles</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="shadow-soft hover:shadow-medium transition-all animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mb-6">
                    <value.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center">What Makes Us Different</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="text-center shadow-soft">
              <CardContent className="p-8">
                <div className="text-4xl font-bold text-primary mb-2">₹49</div>
                <h3 className="text-xl font-semibold mb-3">Affordable Pricing</h3>
                <p className="text-muted-foreground">
                  Quality mock interviews at unbeatable prices, making professional guidance accessible to all
                </p>
              </CardContent>
            </Card>
            <Card className="text-center shadow-soft">
              <CardContent className="p-8">
                <div className="text-4xl font-bold text-secondary mb-2">100%</div>
                <h3 className="text-xl font-semibold mb-3">Real Projects</h3>
                <p className="text-muted-foreground">
                  Every intern works on actual client projects, gaining genuine industry experience
                </p>
              </CardContent>
            </Card>
            <Card className="text-center shadow-soft">
              <CardContent className="p-8">
                <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                <h3 className="text-xl font-semibold mb-3">Support</h3>
                <p className="text-muted-foreground">
                  Round-the-clock mentorship and support throughout your learning journey
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

export default About;
