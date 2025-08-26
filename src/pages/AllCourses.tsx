import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Eye, Video, Crown, Search, Loader2, Filter, X, TrendingUp, Star, Users, Play, Construction } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ContentService, ContentFilters } from "@/services/contentService";

const AllCourses = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [levels, setLevels] = useState<string[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const contentCategories = await ContentService.getContentCategories();
      setCategories(contentCategories.courseCategories);
      setLevels(contentCategories.courseLevels);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Header */}
        <section className="bg-gradient-to-r from-background to-accent/20 py-12">
          <div className="container text-center">
            <h1 className="text-4xl font-bold mb-4">All Video Courses</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Master new skills with our comprehensive video courses designed for all skill levels
            </p>
            
            {/* Coming Soon Message */}
            <div className="bg-white/50 rounded-2xl p-8 max-w-2xl mx-auto">
              <Construction className="h-16 w-16 text-accent mx-auto mb-6" />
              <h2 className="text-2xl font-bold mb-4">Courses Coming Soon!</h2>
              <p className="text-muted-foreground mb-6">
                We're working hard to bring you amazing video courses. Our team is creating comprehensive, 
                high-quality content that will help you master new skills and advance your career.
              </p>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">5+</div>
                  <div className="text-sm text-muted-foreground">Categories</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">3</div>
                  <div className="text-sm text-muted-foreground">Skill Levels</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-premium">20+</div>
                  <div className="text-sm text-muted-foreground">Courses</div>
                </div>
              </div>
              <div className="flex gap-4 justify-center">
                <Button variant="outline" asChild>
                  <Link to="/blogs">Read Our Blog</Link>
                </Button>
                <Button variant="default" asChild>
                  <Link to="/pricing">View Pricing</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* What to Expect */}
        <section className="py-16">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">What You Can Expect</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Video className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">High-Quality Video Content</h3>
                <p className="text-muted-foreground">
                  Professional video lessons with clear explanations, practical examples, and hands-on projects.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Expert Instructors</h3>
                <p className="text-muted-foreground">
                  Learn from industry professionals with years of experience in their respective fields.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-premium/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Crown className="h-8 w-8 text-premium" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Premium Learning Experience</h3>
                <p className="text-muted-foreground">
                  Access to exclusive content, downloadable resources, and community support.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Course Categories Preview */}
        <section className="py-16 bg-gradient-to-r from-accent/5 to-primary/5">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Course Categories</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'Frontend Development', icon: '🎨', description: 'HTML, CSS, JavaScript, React, Vue.js' },
                { name: 'Backend Development', icon: '⚙️', description: 'Node.js, Python, Java, Databases' },
                { name: 'Mobile Development', icon: '📱', description: 'React Native, Flutter, iOS, Android' },
                { name: 'Data Science', icon: '📊', description: 'Python, Machine Learning, AI, Analytics' },
                { name: 'DevOps & Cloud', icon: '☁️', description: 'AWS, Docker, Kubernetes, CI/CD' },
                { name: 'Design & UX', icon: '🎯', description: 'UI/UX Design, Figma, Prototyping' }
              ].map((category, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="text-4xl mb-2">{category.icon}</div>
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">{category.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16">
          <div className="container text-center">
            <TrendingUp className="h-16 w-16 text-accent mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Be the first to know when our courses are available. Subscribe to our newsletter for updates.
            </p>
            <div className="flex gap-4 justify-center">
              <Button variant="outline" asChild>
                <Link to="/blogs">Read Our Blog</Link>
              </Button>
              <Button variant="default" asChild>
                <Link to="/pricing">View Pricing Plans</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AllCourses;