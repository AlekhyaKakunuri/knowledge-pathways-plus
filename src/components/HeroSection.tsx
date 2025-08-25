import { Button } from "@/components/ui/button";
import { Play, Star, Users, BookOpen } from "lucide-react";
import heroImage from "@/assets/hero-education.jpg";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-secondary/30 to-accent/10 py-20 lg:py-32">
      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">
                <Star className="h-4 w-4" />
                Trusted by 10,000+ learners
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Learn from the{" "}
                <span className="bg-gradient-hero bg-clip-text text-transparent">
                  best educators
                </span>{" "}
                worldwide
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Access premium educational content, expert-led courses, and in-depth tutorials. 
                Start learning with our free content or unlock everything with a premium subscription.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="group">
                Start Learning Free
                <Play className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg">
                Explore Courses
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-accent" />
                <span className="text-sm font-medium">10,000+ Students</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-accent" />
                <span className="text-sm font-medium">500+ Courses</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-premium" />
                <span className="text-sm font-medium">4.9/5 Rating</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-hero opacity-20 rounded-3xl blur-3xl animate-glow"></div>
            <img
              src={heroImage}
              alt="Students learning together"
              className="relative rounded-3xl shadow-glow object-cover w-full h-[400px] lg:h-[500px] animate-float"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;