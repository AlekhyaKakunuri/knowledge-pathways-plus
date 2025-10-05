import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CourseGrid from "@/components/CourseGrid";
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
import { useData } from "@/contexts/DataContext";
import { Course } from "@/lib/courseService";

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

// Default FAQ data (fallback)
const defaultFaqs = [
  {
    category: "General",
    questions: [
      {
        question: "Is this course free or premium?",
        answer: "We offer both free and premium courses. Free courses provide basic content, while premium courses include comprehensive materials, live sessions, and placement support."
      },
      {
        question: "How can I clear my doubts during the course?",
        answer: "We provide multiple support channels including live Q&A sessions, discussion forums, dedicated mentor support, and 24/7 community access for all your learning needs."
      }
    ]
  }
];

const AllCourses = () => {
  const [expandedFAQs, setExpandedFAQs] = useState<{ [key: string]: boolean }>({});
  const { getCourses, state } = useData();
  
  const courses = getCourses();
  const loading = state.loading.courses;

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
            <CourseGrid 
              courses={courses} 
              showLearnMore={true} 
              loading={loading}
              className="mb-16"
            />
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
              <p className="text-gray-600 max-w-2xl mx-auto">
                Get answers to common questions about our courses and learning platform
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              {/* Course-specific FAQs */}
              {courses.length > 0 && courses.some(course => course.faqs && course.faqs.length > 0) ? (
                courses.map((course, courseIndex) => 
                  course.faqs && course.faqs.length > 0 ? (
                    <div key={courseIndex} className="mb-8">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">{course.title} - FAQs</h3>
                      <div className="space-y-4">
                        {course.faqs.map((faq, faqIndex) => {
                          const faqKey = `course-${courseIndex}-${faqIndex}`;
                          const isExpanded = expandedFAQs[faqKey];
                          return (
                            <Card key={faqKey} className="p-6">
                              <div
                                className="flex items-center justify-between cursor-pointer"
                                onClick={() => toggleFAQ(faqKey)}
                              >
                                <h4 className="text-lg font-semibold text-theme-primary">
                                  {faq.question}
                                </h4>
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
                        })}
                      </div>
                    </div>
                  ) : null
                )
              ) : (
                /* Fallback to default FAQs */
                defaultFaqs.map((category, categoryIndex) =>
                  category.questions.map((faq, faqIndex) => {
                    const faqKey = `default-${categoryIndex}-${faqIndex}`;
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
                )
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