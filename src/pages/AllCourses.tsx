import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Star, ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CourseCard from "@/components/CourseCard";
import CourseCurriculumModal from "@/components/CourseCurriculumModal";

// Mock course data
const courses = [
  {
    id: "1",
    title: 'Python Programming',
    duration: "4 weeks",
    instructor: "John Smith",
    instructorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    currentPrice: "299",
    originalPrice: "499",
    badge: "New",
    badgeColor: "bg-green-100 text-green-800"
  },
  {
    id: "2",
    title: "AI Technologies",
    duration: "8 weeks",
    instructor: "Sarah Johnson",
    instructorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    currentPrice: "399",
    originalPrice: "599",
    badge: "Most Popular",
    badgeColor: "bg-blue-100 text-blue-800"
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
  const [isCurriculumModalOpen, setIsCurriculumModalOpen] = useState(false);
  const [selectedBundleTitle, setSelectedBundleTitle] = useState("");

  const toggleFAQ = (faqKey: string) => {
    setExpandedFAQs(prev => ({
      ...prev,
      [faqKey]: !prev[faqKey]
    }));
  };

  const openCurriculumModal = (bundleTitle: string) => {
    setSelectedBundleTitle(bundleTitle);
    setIsCurriculumModalOpen(true);
  };

  const closeCurriculumModal = () => {
    setIsCurriculumModalOpen(false);
    setSelectedBundleTitle("");
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-12 md:py-16 lg:py-20">
          <div className="container text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6 text-gray-900">
              Explore Our Courses
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl lg:max-w-3xl mx-auto">
              Live mentor led training with placement support
            </p>
          </div>
        </section>

        {/* Courses Section */}
        <section className="py-12 md:py-16 lg:py-20">
          <div className="container">
            <div className="text-center mb-8 md:mb-12 lg:mb-16">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 text-gray-900">Featured Courses</h2>
              <p className="text-sm md:text-base lg:text-lg text-gray-600 max-w-xl md:max-w-2xl mx-auto">
                Master in-demand skills with our expert-led courses
              </p>
                </div>
            
            {/* Course Grid - Using CourseCard component */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <CourseCard 
                  key={course.id} 
                  course={course}
                  onLearnMore={() => openCurriculumModal(course.title)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Bundles Section */}
        <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
          <div className="container">
            <div className="text-center mb-8 md:mb-12 lg:mb-16">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 text-gray-900">Course Bundles</h2>
              <p className="text-sm md:text-base lg:text-lg text-gray-600 max-w-xl md:max-w-2xl mx-auto">
                Get more value with our comprehensive course bundles
                </p>
              </div>
              
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Complete Tech Bundle */}
              <Card className="bg-gradient-to-br from-purple-600 to-blue-600 text-white border-0 overflow-hidden">
                <CardContent className="p-6 md:p-8">
                  <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Complete Tech Bundle</h3>
                  <p className="text-purple-100 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                    Master all technologies with our comprehensive bundle including DSA, System Design, and Full Stack Development.
                  </p>
                  <Button 
                    variant="outline" 
                    className="border-purple-300 text-purple-300 hover:bg-purple-300 hover:text-purple-600"
                    onClick={() => openCurriculumModal("Complete Tech Bundle")}
                  >
                    Get Bundle
                  </Button>
                </CardContent>
              </Card>

              {/* Interview Prep Bundle */}
              <Card className="bg-gradient-to-br from-green-600 to-teal-600 text-white border-0 overflow-hidden">
                <CardContent className="p-6 md:p-8">
                  <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Interview Prep Bundle</h3>
                  <p className="text-green-100 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                    Get interview-ready with our specialized bundle covering coding interviews, system design, and behavioral questions.
                  </p>
                  <Button 
                    variant="outline" 
                    className="border-green-300 text-green-300 hover:bg-green-300 hover:text-green-600"
                    onClick={() => openCurriculumModal("Interview Prep Bundle")}
                  >
                    Get Bundle
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>


        {/* FAQs Section */}
        <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
          <div className="container">
            <div className="text-center mb-8 md:mb-12 lg:mb-16">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 text-gray-900">FAQs</h2>
              <p className="text-sm md:text-base lg:text-lg text-gray-600 max-w-xl md:max-w-2xl mx-auto">
                Find answers to commonly asked questions
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto space-y-4 md:space-y-6 lg:space-y-8">
              {faqs.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-gray-800">{category.category}</h3>
                  <div className="space-y-2 md:space-y-3">
                    {category.questions.map((faq, faqIndex) => {
                      const faqKey = `${categoryIndex}-${faqIndex}`;
                      const isExpanded = expandedFAQs[faqKey];
                      
                      return (
                        <Card key={faqIndex} className="border-gray-200">
                          <CardHeader 
                            className="pb-2 md:pb-3 cursor-pointer hover:bg-gray-50 transition-colors"
                            onClick={() => toggleFAQ(faqKey)}
                          >
                            <div className="flex items-center justify-between">
                              <h4 className="text-base md:text-lg font-medium text-gray-900">{faq.question}</h4>
                              {isExpanded ? (
                                <ChevronUp className="h-5 w-5 text-gray-500" />
                              ) : (
                                <ChevronDown className="h-5 w-5 text-gray-500" />
                              )}
                            </div>
                  </CardHeader>
                          
                                                    {isExpanded && (
                            <CardContent className="pt-0 bg-gray-50">
                              <p className="text-sm md:text-base text-gray-600 leading-relaxed">{faq.answer}</p>
                            </CardContent>
                          )}
                </Card>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />

      {/* Course Curriculum Modal */}
      <CourseCurriculumModal
        isOpen={isCurriculumModalOpen}
        onClose={closeCurriculumModal}
        courseTitle={selectedBundleTitle}
      />
    </div>
  );
};

export default AllCourses;