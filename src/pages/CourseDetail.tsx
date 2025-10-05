import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useSubscriptionCheck } from "@/hooks/useSubscriptionCheck";
import jsPDF from 'jspdf';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  Star, 
  Users, 
  Play, 
  CheckCircle, 
  ArrowLeft, 
  User, 
  Calendar,
  AlertCircle,
  BookOpen,
  Award,
  Globe,
  Target,
  Zap,
  ChevronDown,
  ChevronUp,
  Download
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VideoPlayer from "@/components/VideoPlayer";
import UPIPayment from "@/components/UPIPayment";
import { useData } from "@/contexts/DataContext";
import { Course } from "@/lib/courseService";

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { currentUser } = useAuth();
  const { getCourseById, state } = useData();
  const { 
    isActive, 
    isPremium, 
    canAccessAICourse,
    canAccessPremiumContent 
  } = useSubscriptionCheck();
  const [isUPIOpen, setIsUPIOpen] = useState(false);
  const [expandedCurriculum, setExpandedCurriculum] = useState<{ [key: number]: boolean }>({});

  const course = id ? getCourseById(id) : null;
  const loading = state.loading.courses;
  const error = course ? null : (id ? "Course not found" : "Course ID not provided");

  // Determine if user has access to this course based on subscription
  const hasAccessToCourse = () => {
    if (!course) return false;
    if (course.isFree) return true;
    
    // Check if user has AI course subscription for AI/ML courses
    if (course.category === 'AI/ML' || course.tags.includes('AI') || course.tags.includes('LLM')) {
      return canAccessAICourse;
    }
    
    // For other premium courses, check general premium access
    return canAccessPremiumContent;
  };

  const hasActiveSubscription = hasAccessToCourse();

  const formatPrice = () => {
    if (!course) return 'Free';
    if (course.isFree) {
      return 'Free';
    }
    const currentPrice = course.sale_price || course.price;
    return `₹${currentPrice.toLocaleString()}`;
  };

  const getLevelColor = (level: string) => {
    const colors = {
      'beginner': 'bg-green-100 text-green-800',
      'intermediate': 'bg-yellow-100 text-yellow-800',
      'advanced': 'bg-red-100 text-red-800',
      'expert': 'bg-purple-100 text-purple-800'
    };
    return colors[level as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const toggleCurriculum = (index: number) => {
    setExpandedCurriculum(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Generate and download PDF curriculum
  const downloadCurriculumPDF = () => {
    if (!course) return;

    // Get curriculum data
    const curriculum = course.curriculum || course.course_curriculum || [];
    
    // Create new PDF document
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    let yPosition = 20;

    // Helper function to add text with word wrap
    const addText = (text: string, x: number, y: number, options: any = {}) => {
      const maxWidth = pageWidth - 2 * margin;
      const lines = doc.splitTextToSize(text, maxWidth);
      doc.text(lines, x, y);
      return y + (lines.length * (options.lineHeight || 7));
    };

    // Helper function to format duration
    const formatDuration = (minutes: number) => {
      if (minutes < 60) return `${minutes}m`;
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
    };

    // Add header
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    yPosition = addText(course.title, margin, yPosition, { lineHeight: 10 });
    
    yPosition += 5;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    const courseMeta = `${course.category} • ${course.level} • ${course.duration} • ${curriculum.reduce((total, module) => total + (module.lessons?.length || 0), 0)} lessons`;
    yPosition = addText(courseMeta, margin, yPosition, { lineHeight: 6 });

    // Add line separator
    yPosition += 10;
    doc.setLineWidth(0.5);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 10;

    // Add curriculum title
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    yPosition = addText('Course Curriculum', margin, yPosition, { lineHeight: 8 });
    yPosition += 10;

    // Add modules
    curriculum.forEach((module, index) => {
      // Check if we need a new page
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }

      const totalDuration = module.lessons?.reduce((sum, lesson) => sum + (lesson.duration_minutes || 0), 0) || 0;

      // Module header
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      const moduleTitle = `Module ${index + 1}: ${module.module_title}`;
      yPosition = addText(moduleTitle, margin, yPosition, { lineHeight: 7 });

      // Module meta
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      const moduleMeta = `Duration: ${formatDuration(totalDuration)} • Lessons: ${module.lessons?.length || 0}`;
      yPosition = addText(moduleMeta, margin, yPosition, { lineHeight: 5 });
      yPosition += 5;

      // Module description (mini project)
      if (module.mini_project) {
        doc.setFontSize(10);
        doc.setFont('helvetica', 'italic');
        yPosition = addText(module.mini_project, margin, yPosition, { lineHeight: 5 });
        yPosition += 5;
      }

      // Add lessons
      if (module.lessons && module.lessons.length > 0) {
        module.lessons.forEach((lesson, lessonIndex) => {
          if (yPosition > 250) {
            doc.addPage();
            yPosition = 20;
          }

          doc.setFontSize(9);
          doc.setFont('helvetica', 'normal');
          const lessonText = `  ${lessonIndex + 1}. ${lesson.title} (${formatDuration(lesson.duration_minutes || 0)})`;
          yPosition = addText(lessonText, margin, yPosition, { lineHeight: 4 });
        });
      }

      yPosition += 10;
    });

    // Add footer
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    const footerText = `Generated on ${new Date().toLocaleDateString()} • EduMentor Learning Platform`;
    doc.text(footerText, margin, doc.internal.pageSize.getHeight() - 10);

    // Download the PDF
    const fileName = `${course.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_curriculum.pdf`;
    doc.save(fileName);
  };

  const handleEnrollClick = () => {
    if (!course) return;
    
    if (course.isFree) {
      // For free courses, just navigate to course content
      // You can implement course content navigation here
      return;
    }
    
    if (!currentUser) {
      // Redirect to sign in if not authenticated
      window.location.href = '/signin';
      return;
    }
    
    // Open UPI payment modal for paid courses
    setIsUPIOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading course...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-6 text-center">
              <AlertCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-red-800 mb-2">Error Loading Course</h3>
              <p className="text-red-700">{error}</p>
              <Link to="/courses" className="mt-4 inline-block">
                <Button variant="outline">
                  <ArrowLeft className="h-4 w-4 mr-2" /> Back to Courses
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="p-6 text-center">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Course Not Found</h3>
              <p className="text-gray-500">The course you are looking for does not exist.</p>
              <Link to="/courses" className="mt-4 inline-block">
                <Button variant="outline">
                  <ArrowLeft className="h-4 w-4 mr-2" /> Back to Courses
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section with Banner */}
      <div className="relative min-h-[70vh] flex items-center">
        {course.banner_url ? (
          <div className="absolute inset-0">
            <img
              src={course.banner_url}
              alt={course.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800"></div>
        )}
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl">
            {/* Back Button */}
            <Link to="/courses" className="inline-flex items-center text-white hover:text-blue-200 mb-8 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Courses
            </Link>

            <div className="max-w-4xl">
              {/* Course Meta */}
              <div className="flex flex-wrap items-center gap-4 mb-6 text-white">
                <Badge className={`${getLevelColor(course.level)} text-sm px-3 py-1`}>
                  {course.level}
                </Badge>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span className="text-sm">{course.enrollment_count.toLocaleString()} students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span className="text-sm">{course.average_rating.toFixed(1)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  <span className="text-sm">{course.language.toUpperCase()}</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight text-white">
                {course.title}
              </h1>

              {/* Description */}
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                {course.description || course.short_description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {course.tags.slice(0, 5).map((tag, index) => (
                  <Badge key={index} variant="secondary" className="bg-white/20 text-white border-white/30 hover:bg-white/30 transition-colors">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Price and Action */}
              <div className="flex items-center gap-6">
                <div className="text-white bg-black/20 px-6 py-4 rounded-lg backdrop-blur-sm">
                  {!course.isFree && course.sale_price && course.price > course.sale_price && (
                    <div className="text-sm text-gray-300 line-through mb-1">
                      ₹{course.price.toLocaleString()}
                    </div>
                  )}
                  <div className="text-3xl font-bold">
                    {formatPrice()}
                  </div>
                  {!course.isFree && course.sale_price && course.price > course.sale_price && (
                    <div className="text-xs bg-red-500/80 text-white px-2 py-1 rounded-full font-medium mt-1 inline-block">
                      {Math.round(((course.price - course.sale_price) / course.price) * 100)}% OFF
                    </div>
                  )}
                </div>
                <Button 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold"
                  onClick={handleEnrollClick}
                >
                  <Play className="h-5 w-5 mr-2" />
                  {course.isFree 
                    ? 'Start Free' 
                    : hasActiveSubscription 
                      ? (canAccessAICourse && (course.category === 'AI/ML' || course.tags.includes('AI') || course.tags.includes('LLM'))
                          ? 'Access AI Course' 
                          : 'Access Course')
                      : 'Enroll Now'
                  }
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Course Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  {course.description}
                </p>
              </CardContent>
            </Card>

            {/* Course Videos */}
            {course.preview_video_url ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Play className="h-5 w-5" />
                    Course Preview
                  </CardTitle>
                  <CardDescription>
                    Watch this preview to get an overview of what you'll learn
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <VideoPlayer 
                    src={course.preview_video_url}
                    poster={course.thumbnail_url}
                    className="w-full"
                  />
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Play className="h-5 w-5" />
                    Course Preview
                  </CardTitle>
                  <CardDescription>
                    Course preview video will be available soon
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                    <div className="text-center">
                      <Play className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">Preview video coming soon</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Prerequisites */}
            {course.prerequisites.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Prerequisites
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {course.prerequisites.map((prereq, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 border rounded-lg">
                        <div className="text-2xl">{prereq.icon_id}</div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{prereq.title}</h4>
                          <p className="text-sm text-gray-600">{prereq.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Add-ons */}
            {course.addons.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    What's Included
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {course.addons.map((addon, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 border rounded-lg">
                        <div className="text-2xl">{addon.icon_id}</div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{addon.title}</h4>
                          <p className="text-sm text-gray-600">{addon.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Course Curriculum */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-2xl">
                      <Award className="h-6 w-6" />
                      Course Curriculum
                    </CardTitle>
                    <CardDescription>
                      Complete breakdown of what you'll learn in this course
                    </CardDescription>
                  </div>
                  <Button
                    onClick={downloadCurriculumPDF}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download PDF
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {(course.curriculum && course.curriculum.length > 0) || (course.course_curriculum && course.course_curriculum.length > 0) ? (
                  <div className="space-y-3">
                    {(course.curriculum || course.course_curriculum || []).map((module, index) => {
                      const isExpanded = expandedCurriculum[index];
                      const totalDuration = module.lessons?.reduce((sum, lesson) => sum + (lesson.duration_minutes || 0), 0) || 0;
                      const formatDuration = (minutes: number) => {
                        if (minutes < 60) return `${minutes}m`;
                        const hours = Math.floor(minutes / 60);
                        const mins = minutes % 60;
                        return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
                      };
                      
                      return (
                        <div key={index} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200">
                          {/* Module Header */}
                          <div 
                            className="flex items-center justify-between p-5 cursor-pointer bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-all duration-200"
                            onClick={() => toggleCurriculum(index)}
                          >
                            <div className="flex items-center gap-4">
                              <div className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full font-bold text-lg">
                                {index + 1}
                              </div>
                              <div>
                                <h4 className="text-xl font-bold text-gray-900 mb-1">{module.module_title}</h4>
                                {module.mini_project && (
                                  <p className="text-sm text-blue-600 font-medium">
                                    🎯 {module.mini_project}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="text-right">
                                <div className="flex items-center gap-1 text-sm text-gray-600 mb-1">
                                  <Clock className="h-4 w-4" />
                                  <span className="font-medium">{formatDuration(module.duration_minutes || totalDuration)}</span>
                                </div>
                                <div className="text-xs text-gray-500">
                                  {module.lessons?.length || 0} lessons
                                </div>
                              </div>
                              <div className="p-2 rounded-full bg-white shadow-sm">
                                {isExpanded ? (
                                  <ChevronUp className="h-5 w-5 text-gray-600" />
                                ) : (
                                  <ChevronDown className="h-5 w-5 text-gray-600" />
                                )}
                              </div>
                            </div>
                          </div>
                          
                          {/* Expandable Content */}
                          {isExpanded && module.lessons && module.lessons.length > 0 && (
                            <div className="p-6 bg-white border-t border-gray-200">
                              <div className="space-y-3">
                                {module.lessons.map((lesson, lessonIndex) => (
                                  <div key={lessonIndex} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group">
                                    <div className="flex items-center justify-center w-8 h-8 bg-green-100 text-green-600 rounded-full text-sm font-bold">
                                      {lessonIndex + 1}
                                    </div>
                                    <div className="flex-1">
                                      <h5 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                        {lesson.title}
                                      </h5>
                                      {lesson.video_url && (
                                        <div className="flex items-center gap-2 mt-1">
                                          <Play className="h-3 w-3 text-blue-500" />
                                          <span className="text-xs text-blue-600">Video Available</span>
                                        </div>
                                      )}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                      <Clock className="h-4 w-4" />
                                      <span className="font-medium">{formatDuration(lesson.duration_minutes || 0)}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                              
                              {/* Mini Project Highlight */}
                              {module.mini_project && (
                                <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg">
                                  <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center">
                                      <Award className="h-4 w-4" />
                                    </div>
                                    <div>
                                      <h6 className="font-semibold text-gray-900">Mini Project</h6>
                                      <p className="text-sm text-gray-700">{module.mini_project}</p>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">Curriculum Coming Soon</h3>
                    <p className="text-gray-500">Detailed course curriculum will be available soon.</p>
                    {/* Debug info - remove this later */}
                    <div className="mt-4 p-4 bg-gray-100 rounded text-left text-xs">
                      <p><strong>Debug Info:</strong></p>
                      <p>Curriculum length: {course.curriculum?.length || 0}</p>
                      <p>Course curriculum length: {course.course_curriculum?.length || 0}</p>
                      <p>Raw curriculum data: {JSON.stringify(course.curriculum || course.course_curriculum || [])}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Course Info Card */}
            <Card>
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {formatPrice()}
                  </div>
                  {!course.isFree && course.sale_price && course.price > course.sale_price && (
                    <div className="space-y-1">
                      <div className="text-sm text-gray-500 line-through">
                        ₹{course.price.toLocaleString()}
                      </div>
                      <div className="text-sm bg-red-100 text-red-600 px-3 py-1 rounded-full font-medium inline-block">
                        {Math.round(((course.price - course.sale_price) / course.price) * 100)}% OFF
                      </div>
                    </div>
                  )}
                </div>
                
                <Button 
                  className="w-full mb-4" 
                  size="lg"
                  onClick={handleEnrollClick}
                >
                  <Play className="h-5 w-5 mr-2" />
                  {course.isFree 
                    ? 'Start Free' 
                    : hasActiveSubscription 
                      ? (canAccessAICourse && (course.category === 'AI/ML' || course.tags.includes('AI') || course.tags.includes('LLM'))
                          ? 'Access AI Course' 
                          : 'Access Course')
                      : 'Enroll Now'
                  }
                </Button>
                
                <div className="text-center text-sm text-gray-600">
                  {course.isFree ? 'No payment required' : '30-day money-back guarantee'}
                </div>
              </CardContent>
            </Card>

            {/* Course Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Course Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-medium">{course.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Level</span>
                  <Badge className={getLevelColor(course.level)}>
                    {course.level}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Students</span>
                  <span className="font-medium">{course.enrollment_count.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="font-medium">{course.average_rating.toFixed(1)}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Language</span>
                  <span className="font-medium">{course.language.toUpperCase()}</span>
                </div>
              </CardContent>
            </Card>

            {/* Instructor */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Instructor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                    {course.instructor.img_url ? (
                      <img 
                        src={course.instructor.img_url}
                        alt={course.instructor.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img 
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(course.instructor.name)}&background=random&color=fff&size=48`}
                        alt={course.instructor.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{course.instructor.name}</h4>
                    <p className="text-sm text-gray-600">{course.category} Expert</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
      
      {/* UPI Payment Modal */}
      <UPIPayment
        selectedPlan={course ? {
          name: course.title,
          price: (course.sale_price || course.price).toString(),
          description: course.short_description,
          planCode: 'PREMIUM_GENAI_DEV_01',
          features: [
            "Full course access",
            "Downloadable resources", 
            "Priority support",
            "Progress tracking",
            "Certificate of completion"
          ]
        } : null}
        isOpen={isUPIOpen}
        onClose={() => setIsUPIOpen(false)}
      />
    </div>
  );
};

export default CourseDetail;
