import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, ChevronDown, ChevronUp, Users, Briefcase, Code2, BookOpen, Calculator, Brain, Play } from "lucide-react";

interface CourseDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    course: {
        id: number;
        title: string;
        description: string;
        price: number;
        duration: string;
        level: string;
        students: number;
        rating: number;
        lessons: number;
        instructor: string;
    };
}

const CourseDetailsModal = ({ isOpen, onClose, course }: CourseDetailsModalProps) => {
    const [expandedSections, setExpandedSections] = useState<number[]>([0]); // First section expanded by default

    const toggleSection = (index: number) => {
        setExpandedSections(prev =>
            prev.includes(index)
                ? prev.filter(i => i !== index)
                : [...prev, index]
        );
    };

    if (!isOpen) return null;

    // Course-specific data based on course title
    const getCourseDetails = () => {
        switch (course.title) {
            case "Python Programming Mastery":
                return {
                    videos: [
                        {
                            id: "dQw4w9WgXcQ", // Replace with actual YouTube video ID
                            title: "Python Introduction - Getting Started",
                            description: "Learn the basics of Python programming language"
                        },
                        {
                            id: "dQw4w9WgXcQ", // Replace with actual YouTube video ID
                            title: "Variables and Data Types",
                            description: "Understanding Python variables and different data types"
                        }
                    ],
                    prerequisites: [
                        {
                            name: "Basic computer knowledge",
                            icon: BookOpen,
                            description: "Familiarity with computers and basic operations",
                            color: "bg-blue-100 text-blue-600"
                        },
                        {
                            name: "High school mathematics",
                            icon: Calculator,
                            description: "Basic math concepts and problem-solving",
                            color: "bg-green-100 text-green-600"
                        },
                        {
                            name: "Logical thinking skills",
                            icon: Brain,
                            description: "Ability to think step-by-step and solve problems",
                            color: "bg-purple-100 text-purple-600"
                        }
                    ],
                    curriculum: [
                        { week: "Week 1-3", title: "Fundamentals", topics: ["Variables, Data Types", "Control Structures", "Functions"] },
                        { week: "Week 4-6", title: "Intermediate Concepts", topics: ["OOP Concepts", "File Handling", "Error Handling"] },
                        { week: "Week 7-9", title: "Advanced Topics", topics: ["Libraries & Frameworks", "API Integration", "Database Connectivity"] },
                        { week: "Week 10-12", title: "Final Projects", topics: ["Real-world Projects", "Code Review", "Deployment"] }
                    ],
                };
            case "AI Fundamentals":
                return {
                    videos: [
                        {
                            id: "dQw4w9WgXcQ", // Replace with actual YouTube video ID
                            title: "Introduction to AI and Machine Learning",
                            description: "Understanding the fundamentals of Artificial Intelligence"
                        },
                        {
                            id: "dQw4w9WgXcQ", // Replace with actual YouTube video ID
                            title: "Neural Networks Deep Dive",
                            description: "Learn how neural networks work and their applications"
                        }
                    ],
                    prerequisites: [
                        {
                            name: "Basic Python knowledge",
                            icon: Code2,
                            description: "Understanding of Python programming basics",
                            color: "bg-blue-100 text-blue-600"
                        },
                        {
                            name: "High school mathematics",
                            icon: Calculator,
                            description: "Basic math concepts and problem-solving",
                            color: "bg-green-100 text-green-600"
                        },
                        {
                            name: "Logical thinking skills",
                            icon: Brain,
                            description: "Ability to think step-by-step and solve problems",
                            color: "bg-purple-100 text-purple-600"
                        }
                    ],
                    curriculum: [
                        {
                            week: "Week 1",
                            title: "Foundation & API Integration",
                            topics: ["LLM architecture, Embeddings, Transformer", "RLHF, Temperature etc…", "Open AI API, system/user prompts & basic context engineering."]
                        },
                        {
                            week: "Week 2",
                            title: "Advanced Prompting & Context",
                            topics: ["Prompt Engineering(In-depth), Memory and more around Context Engineering", "Intro to Tool-calling"]
                        },
                        {
                            week: "Week 3",
                            title: "Tool Integration & MCP",
                            topics: ["Projects involving tool calling, Model Context Protocol, MCP clients and servers"]
                        },
                        {
                            week: "Week 4",
                            title: "Vector Databases & RAG",
                            topics: ["Vector Databases deep-dive", " RAG, Agentic RAG, chunking strategies. HyDe, Re-ranking, TF-IDF and more on retrieval technique."]
                        },
                        {
                            week: "Week 5",
                            title: "AI Frameworks & Projects",
                            topics: ["Framework knowledge : Langchain, Langgraph, Langsmith & Crew AI and projects"]
                        },
                        {
                            week: "Week 6",
                            title: "Advanced AI Concepts",
                            topics: ["Think of and write robust Evals, Open AI Whisper, Voice AI and streaming, TTS, STT etc"]
                        },
                        {
                            week: "Week 7",
                            title: "Production Deployment",
                            topics: [" Stable Diffusion, Image Generation, Finetuning, Knowledge-distillation & Deployment"]
                        },
                        {
                            week: "Week 8",
                            title: "Capstone Project",
                            topics: ["Building together Capstone Project"]
                        }
                    ],
                    addOns: [
                        { 
                            name: "Mock Interviews",
                            icon: Users,
                            description: "Practice with industry experts",
                            color: "bg-blue-100 text-blue-600"
                        },
                        { 
                            name: "Placement Assistance",
                            icon: Briefcase,
                            description: "Career guidance and job support",
                            color: "bg-green-100 text-green-600"
                        },
                        { 
                            name: "Real-World Projects",
                            icon: Code2,
                            description: "Hands-on industry projects",
                            color: "bg-purple-100 text-purple-600"
                        }
                    ]
                };
            default:
                return {
                    videos: [
                        {
                            id: "dQw4w9WgXcQ", // Replace with actual YouTube video ID
                            title: "Course Introduction",
                            description: "Get started with this comprehensive course"
                        }
                    ],
                    prerequisites: [
                        {
                            name: "Basic computer knowledge",
                            icon: BookOpen,
                            description: "Familiarity with computers and basic operations",
                            color: "bg-blue-100 text-blue-600"
                        },
                        {
                            name: "Problem-solving skills",
                            icon: Brain,
                            description: "Ability to analyze and solve problems",
                            color: "bg-purple-100 text-purple-600"
                        }
                    ],
                    curriculum: [
                        { week: "Week 1-4", title: "Fundamentals", topics: ["Basic Concepts", "Core Principles"] },
                        { week: "Week 5-8", title: "Advanced Topics", topics: ["Advanced Concepts", "Practical Applications"] }
                    ]
                };
        }
    };

    const courseDetails = getCourseDetails();

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-end z-50">
            <div className="bg-white h-full w-full shadow-xl overflow-y-auto animate-in slide-in-from-right duration-300">
                {/* Header - Purple gradient like in image */}
                <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white p-4 md:p-6 relative">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClose}
                        className="absolute top-4 right-4 md:top-6 md:right-6 h-8 w-8 p-0 hover:bg-white/20 text-white rounded-full"
                    >
                        <X className="h-5 w-5" />
                    </Button>

                    <div className="pr-10 md:pr-12">
                        <h2 className="text-xl md:text-2xl font-bold mb-2 md:mb-3 leading-tight">{course.title}</h2>
                        <p className="text-white/90 text-sm md:text-base leading-relaxed mb-3 md:mb-4">
                            {course.description}
                        </p>

                        <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm mb-3 md:mb-4 flex-wrap">
                            <span className="bg-white/20 px-2 md:px-3 py-1 rounded-full font-semibold">
                                {course.price === 0 ? "Free" : `$${course.price}`}
                            </span>
                            <span className="bg-white/20 px-2 md:px-3 py-1 rounded-full">{course.duration}</span>
                            <span className="bg-white/20 px-2 md:px-3 py-1 rounded-full">{course.level}</span>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                    {/* Course Info */}
                    <div className="text-lg text-gray-600 mb-8">
                        {course.lessons} lessons • {course.level}
                    </div>

                    {/* Course Videos - Clean Section */}
                    {courseDetails.videos && courseDetails.videos.length > 0 && (
                        <div className="mb-8">
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <Play className="w-5 h-5 text-theme-primary" />
                                Course Videos
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {courseDetails.videos.map((video, index) => (
                                    <div key={index}>
                                        <div className="relative rounded-lg overflow-hidden">
                                            <div className="aspect-video bg-gray-900 relative" style={{ height: '180px' }}>
                                                <iframe
                                                    src={`https://www.youtube.com/embed/${video.id}`}
                                                    title={video.title}
                                                    className="w-full h-full"
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                ></iframe>
                                            </div>
                                        </div>
                                        <div className="mt-2">
                                            <h4 className="font-semibold text-gray-900 text-base mb-1">
                                                {video.title}
                                            </h4>
                                            <p className="text-gray-600 text-sm">
                                                {video.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Prerequisites */}
                    <div className="mb-8">
                        <h3 className="text-xl font-bold mb-4">Prerequisites</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {courseDetails.prerequisites.map((prereq, index) => {
                                const IconComponent = prereq.icon;
                                return (
                                    <div
                                        key={index}
                                        className="flex items-start gap-3 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${prereq.color} flex-shrink-0`}>
                                            <IconComponent className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 text-base mb-1">
                                                {prereq.name}
                                            </h4>
                                            <p className="text-gray-600 text-sm">
                                                {prereq.description}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Add Ons */}
                    {courseDetails.addOns && courseDetails.addOns.length > 0 && (
                        <div className="mb-8">
                            <h3 className="text-xl font-bold mb-4">Add Ons</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {courseDetails.addOns.map((addon, index) => {
                                    const IconComponent = addon.icon;
                                    return (
                                        <div
                                            key={index}
                                            className="flex items-start gap-3 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                                        >
                                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${addon.color} flex-shrink-0`}>
                                                <IconComponent className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-900 text-base mb-1">
                                                    {addon.name}
                                                </h4>
                                                <p className="text-gray-600 text-sm">
                                                    {addon.description}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Course Curriculum */}
                    <div className="mb-8">
                        <h3 className="text-xl font-bold mb-4">Course Curriculum</h3>
                        <div className="space-y-2">
                            {courseDetails.curriculum.map((module, index) => (
                                <div key={index} className="bg-gray-50 rounded-lg overflow-hidden hover:bg-gray-100 transition-colors">
                                    {/* Curriculum Header - Clickable */}
                                    <div
                                        className="flex items-center justify-between p-4 cursor-pointer"
                                        onClick={() => toggleSection(index)}
                                    >
                                        <div className="flex items-center justify-between w-full">
                                            <div className="flex items-center gap-3">
                                                <span className="font-bold text-gray-900 text-base">{module.week}</span>
                                                <span className="font-medium text-gray-700 text-sm">
                                                    {module.title}
                                                </span>
                                            </div>
                                            {expandedSections.includes(index) ? (
                                                <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                                            ) : (
                                                <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                                            )}
                                        </div>
                                    </div>

                                    {/* Curriculum Content - Expandable */}
                                    {expandedSections.includes(index) && (
                                        <div className="px-4 pb-4">
                                            <ul className="space-y-2 mt-2">
                                                {module.topics.map((topic, topicIndex) => (
                                                    <li key={topicIndex} className="text-gray-600 flex items-start gap-2">
                                                        <span className="text-theme-primary mt-1 flex-shrink-0">•</span>
                                                        <span className="text-sm">{topic}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetailsModal;