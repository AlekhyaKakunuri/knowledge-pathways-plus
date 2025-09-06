import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, ChevronDown, ChevronUp, Users, Briefcase, Code2, BookOpen, Calculator, Brain } from "lucide-react";

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
            <div className="bg-white h-full w-full max-w-[90%] sm:max-w-[70%] md:max-w-[60%] lg:max-w-[55%] xl:max-w-[50%] shadow-xl overflow-y-auto animate-in slide-in-from-right duration-300">
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
                <div className="p-4 md:p-6 space-y-4 md:space-y-6">
                    {/* Course Info */}
                    <div className="text-sm md:text-base text-gray-600">
                        {course.lessons} lessons • {course.level}
                    </div>

                    {/* Prerequisites */}
                    <div>
                        <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Prerequisites</h3>
                        <div className="grid grid-cols-1 gap-3">
                            {courseDetails.prerequisites.map((prereq, index) => {
                                const IconComponent = prereq.icon;
                                return (
                                    <div
                                        key={index}
                                        className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors bg-gray-50/50"
                                    >
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${prereq.color} flex-shrink-0`}>
                                            <IconComponent className="w-5 h-5" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-medium text-gray-900 text-sm md:text-base">
                                                {prereq.name}
                                            </h4>
                                            <p className="text-xs md:text-sm text-gray-600 mt-0.5">
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
                        <div>
                            <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Add Ons</h3>
                            <div className="grid grid-cols-1 gap-3">
                                {courseDetails.addOns.map((addon, index) => {
                                    const IconComponent = addon.icon;
                                    return (
                                        <div
                                            key={index}
                                            className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors bg-gray-50/50"
                                        >
                                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${addon.color} flex-shrink-0`}>
                                                <IconComponent className="w-5 h-5" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-medium text-gray-900 text-sm md:text-base">
                                                    {addon.name}
                                                </h4>
                                                <p className="text-xs md:text-sm text-gray-600 mt-0.5">
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
                    <div>
                        <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3">Course Curriculum</h3>
                        <div className="space-y-2">
                            {courseDetails.curriculum.map((module, index) => (
                                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                                    {/* Curriculum Header - Clickable */}
                                    <div
                                        className="flex items-center justify-between p-3 md:p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                                        onClick={() => toggleSection(index)}
                                    >
                                        <div className="flex items-center justify-between w-full">
                                            <div className="flex items-center gap-2 md:gap-3 flex-wrap">
                                                <span className="font-medium text-gray-900 text-sm md:text-base">{module.week}</span>
                                                <span className="font-medium text-gray-700 text-xs md:text-sm">
                                                    {module.title}
                                                </span>
                                            </div>
                                            {expandedSections.includes(index) ? (
                                                <ChevronUp className="h-4 w-4 text-gray-500 flex-shrink-0" />
                                            ) : (
                                                <ChevronDown className="h-4 w-4 text-gray-500 flex-shrink-0" />
                                            )}
                                        </div>
                                    </div>

                                    {/* Curriculum Content - Expandable */}
                                    {expandedSections.includes(index) && (
                                        <div className="px-3 md:px-4 pb-3 md:pb-4 border-t border-gray-100">
                                            <ul className="space-y-1.5 mt-2 md:mt-3">
                                                {module.topics.map((topic, topicIndex) => (
                                                    <li key={topicIndex} className="text-xs md:text-sm text-gray-600 flex items-start gap-2">
                                                        <span className="text-theme-primary mt-0.5 flex-shrink-0">•</span>
                                                        <span>{topic}</span>
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