import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    courseInterest: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ 
      firstName: '', 
      lastName: '', 
      email: '', 
      phone: '', 
      courseInterest: '', 
      message: '' 
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      courseInterest: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        {/* Header Section */}
        <section className="py-8 md:py-12 lg:py-16">
          <div className="container text-center">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
              Get in Touch
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-gray-600 max-w-xl md:max-w-2xl mx-auto">
              Have questions about our programs? Our team is here to help you choose the right path for your career goals.
            </p>
          </div>
        </section>

        <div className="container pb-8 md:pb-12 lg:pb-16">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
            {/* Contact Information Section - Left Panel */}
            <div>
              <Card className="bg-gray-100 border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-900">
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-theme-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Phone</h3>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-theme-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Email</h3>
                      <p className="text-gray-600">hello@careerpath.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-theme-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Address</h3>
                      <p className="text-gray-600">123 Tech Street, Silicon Valley, CA 94000</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-theme-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Business Hours</h3>
                      <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM PST</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Send us a Message Section - Right Panel */}
            <div>
              <Card className="bg-white border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-900">
                    Send us a Message
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="text-sm font-medium text-gray-700 mb-2 block">
                          First Name
                        </label>
                                                 <Input
                           id="firstName"
                           name="firstName"
                           value={formData.firstName}
                           onChange={handleChange}
                           placeholder="John"
                           className="border-gray-300 focus:border-theme-border-focus focus:ring-theme-ring"
                           required
                         />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="text-sm font-medium text-gray-700 mb-2 block">
                          Last Name
                        </label>
                                                 <Input
                           id="lastName"
                           name="lastName"
                           value={formData.lastName}
                           onChange={handleChange}
                           placeholder="Doe"
                           className="border-gray-300 focus:border-theme-border-focus focus:ring-theme-ring"
                           required
                         />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-2 block">
                        Email
                      </label>
                                             <Input
                         id="email"
                         name="email"
                         type="email"
                         value={formData.email}
                         onChange={handleChange}
                         placeholder="john@example.com"
                         className="border-gray-300 focus:border-theme-border-focus focus:ring-theme-ring"
                         required
                       />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="text-sm font-medium text-gray-700 mb-2 block">
                        Phone
                      </label>
                                             <Input
                         id="phone"
                         name="phone"
                         value={formData.phone}
                         onChange={handleChange}
                         placeholder="+1 (555) 123-4567"
                         className="border-gray-300 focus:border-theme-border-focus focus:ring-theme-ring"
                         required
                       />
                    </div>
                    
                    <div>
                      <label htmlFor="courseInterest" className="text-sm font-medium text-gray-700 mb-2 block">
                        Course Interest
                      </label>
                      <Select value={formData.courseInterest} onValueChange={handleSelectChange}>
                                                 <SelectTrigger className="border-gray-300 focus:border-theme-border-focus focus:ring-theme-ring">
                          <SelectValue placeholder="Select a course" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="react-development">React Development</SelectItem>
                          <SelectItem value="typescript-advanced">Advanced TypeScript</SelectItem>
                          <SelectItem value="nodejs-api">Node.js API Development</SelectItem>
                          <SelectItem value="python-data-science">Python for Data Science</SelectItem>
                          <SelectItem value="docker-devops">Docker & DevOps</SelectItem>
                          <SelectItem value="css-grid">CSS Grid Layout</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="text-sm font-medium text-gray-700 mb-2 block">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your career goals and how we can help..."
                        rows={5}
                                                 className="border-gray-300 focus:border-theme-border-focus focus:ring-theme-ring resize-none"
                        required
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                                             className="w-full bg-theme-primary hover:bg-theme-primary-hover text-white font-medium py-3"
                    >
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;

