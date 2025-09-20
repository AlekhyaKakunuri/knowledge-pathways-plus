import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CourseCard from "@/components/CourseCard";
import {
  Code2,
  Brain,
  Palette,
  Database,
  Shield,
  Trophy,
  Users,
  Clock,
  Star,
  CheckCircle,
  Play,
  Award,
  Infinity,
  ChevronDown,
  ChevronUp,
  Blocks,
  HandHeart,
  Settings
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";


// Mock course data
const courses = [
  {
    id: 1,
    title: "Python Programming Mastery",
    description: "Learn Python from basics to advanced with real-world projects",
    price: 0,
    originalPrice: 299,
    duration: "8 weeks",
    level: "Beginner",
    icon: Code2,
    color: "bg-blue-500",
    category: "programming",
    students: 1250,
    rating: 4.8,
    lessons: 45,
    instructor: "John Smith",
    isFree: true,
    isPremium: false,
    isMostPopular: false
  },
  {
    id: 2,
    title: "AI Fundamentals",
    description: "Master artificial intelligence concepts and machine learning",
    price: 30000,
    originalPrice: 35000,
    duration: "8 weeks",
    level: "Intermediate",
    icon: Brain,
    color: "bg-purple-500",
    category: "ai",
    students: 890,
    rating: 4.9,
    lessons: 32,
    instructor: "Dr. Sarah Chen",
    isFree: false,
    isPremium: true,
    isMostPopular: true
  }
];

const features = [
  {
    icon: Blocks,
    title: "Hands-on Projects",
    description: "Build real-world applications",
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600"
  },
  {
    icon: Clock,
    title: "Flexible Schedule",
    description: "Learn at your own pace",
    bgColor: "bg-purple-100",
    iconColor: "text-purple-600"
  },
  {
    icon: Shield,
    title: "Placement Support",
    description: "Career guidance included",
    bgColor: "bg-green-100",
    iconColor: "text-green-600"
  },
  {
    icon: Trophy,
    title: "Expert Mentors",
    description: "Learn from industry leaders",
    bgColor: "bg-yellow-100",
    iconColor: "text-yellow-600"
  }
];

const benefits = [
  {
    icon: CheckCircle,
    title: "Expert Mentors",
    description: "Learn from industry professionals with years of experience",
    bgColor: "bg-blue-500",
    iconColor: "text-white"
  },
  {
    icon: HandHeart,
    title: "Placement Assistance",
    description: "Get help with job interviews and career opportunities",
    bgColor: "bg-green-500",
    iconColor: "text-white"
  },
  {
    icon: Award,
    title: "Certification",
    description: "Receive industry-recognized certificates upon completion",
    bgColor: "bg-purple-500",
    iconColor: "text-white"
  },
  {
    icon: Infinity,
    title: "Lifetime Access",
    description: "Access course materials and updates forever",
    bgColor: "bg-orange-500",
    iconColor: "text-white"
  }
];

// FAQ data
const faqs = [
  {
    category: "Course Related",
    questions: [
      {
        question: "Is this course free or premium?",
        answer: "We offer both free and premium courses. Free courses provide basic content, while premium courses include comprehensive materials, live sessions, and placement support."
      },
      {
        question: "Do I need to purchase premium access for blogs and resources?",
        answer: "Premium access gives you unlimited access to all blogs, downloadable resources, and exclusive content. Free users have limited access."
      }
    ]
  },
  {
    category: "Placement & Career Support",
    questions: [
      {
        question: "Will I get guaranteed placement after completing the course?",
        answer: "While we don't guarantee placement, we provide comprehensive career support including resume building, interview preparation, and job placement assistance through our network of partner companies."
      }
    ]
  },
  {
    category: "Learning Experience",
    questions: [
      {
        question: "What will I learn in this course?",
        answer: "Our courses cover industry-relevant topics with hands-on projects, real-world case studies, and practical applications. Each course includes theoretical concepts and practical implementation."
      }
    ]
  },
  {
    category: "Support & Access",
    questions: [
      {
        question: "How can I clear my doubts during the course?",
        answer: "We provide multiple support channels including live Q&A sessions, discussion forums, dedicated mentor support, and 24/7 community access for all your learning needs."
      }
    ]
  }
];

const AllCourses = () => {
  const [expandedFAQs, setExpandedFAQs] = useState<{ [key: string]: boolean }>({});


  const toggleFAQ = (faqKey: string) => {
    setExpandedFAQs(prev => ({
      ...prev,
      [faqKey]: !prev[faqKey]
    }));
  };



  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Course Grid */}
        <section className="py-12">
          <div className="container px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore Our Courses</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Master in-demand skills with expert-led courses designed for your career growth
              </p>
            </div>

            {/* Courses Grid */}
            <div className="flex flex-wrap justify-center gap-8 mb-16">
              {courses.map((course) => (
                <div key={course.id} className="w-full max-w-sm">
                  <CourseCard
                    course={course}
                    showLearnMore={true}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="container px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="text-center">
                    <div className={`w-20 h-20 ${feature.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <IconComponent className={`w-10 h-10 ${feature.iconColor}`} />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why Choose Section */}
        <section className="py-16">
          <div className="container px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Choose EduPlatform?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We provide comprehensive learning experiences with industry experts and practical projects
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                    <div className={`w-20 h-20 ${benefit.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <IconComponent className={`w-10 h-10 ${benefit.iconColor}`} />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>


        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="container px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((category, categoryIndex) =>
                category.questions.map((faq, faqIndex) => {
                  const faqKey = `${categoryIndex}-${faqIndex}`;
                  const isExpanded = expandedFAQs[faqKey];

                  return (
                    <Card key={faqKey} className="p-6">
                      <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => toggleFAQ(faqKey)}
                      >
                        <h3 className="text-lg font-semibold text-theme-primary">
                          {faq.question}
                        </h3>
                        {isExpanded ? (
                          <ChevronUp className="h-5 w-5 text-gray-500" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-500" />
                        )}
                      </div>
                      {isExpanded && (
                        <p className="text-gray-600 mt-4">{faq.answer}</p>
                      )}
                    </Card>
                  );
                })
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />

    </div>
  );
};

export default AllCourses;