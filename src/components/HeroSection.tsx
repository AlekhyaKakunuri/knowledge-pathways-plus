import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookOpen, Play, Calendar, Users, Star, Clock } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/30 py-20 lg:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
            Master Modern
            <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Web Development
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            Learn React, Next.js, and full-stack development with hands-on projects, 
            expert guidance, and a supportive community.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/blogs">
              <Button size="lg" className="text-lg px-8 py-3 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
                <BookOpen className="h-5 w-5 mr-2" />
                Start Learning Free
              </Button>
            </Link>
            
            <Link to="/courses">
              <Button size="lg" variant="outline" className="text-lg px-8 py-3 border-2 hover:bg-muted/50">
                <Play className="h-5 w-5 mr-2" />
                Explore Courses
              </Button>
            </Link>
          </div>

          {/* 1-to-1 Session Button */}
          <div className="mb-12">
            <Button 
              size="lg" 
              variant="default"
              className="text-lg px-8 py-3 bg-gradient-to-r from-premium to-accent hover:from-premium/90 hover:to-accent/90 text-premium-foreground shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              onClick={() => {
                // This will be handled by the parent component
                const event = new CustomEvent('openCalendly');
                window.dispatchEvent(event);
              }}
            >
              <Calendar className="h-5 w-5 mr-2" />
              Book 1-to-1 Session
            </Button>
            <p className="text-sm text-muted-foreground mt-2">
              Get personalized guidance from our experts
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary mb-1">500+</div>
              <div className="text-sm text-muted-foreground">Students</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary mb-1">50+</div>
              <div className="text-sm text-muted-foreground">Courses</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary mb-1">4.9</div>
              <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                <Star className="h-3 w-3 fill-current" />
                Rating
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary mb-1">24/7</div>
              <div className="text-sm text-muted-foreground">Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;