import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white">
      {/* Main Footer Content */}
      <div className="container py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Information */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-theme-primary mb-4">EduMentor</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Empowering professionals worldwide with the skills and knowledge needed to excel in their careers.
            </p>
            
            {/* Social Media Icons with Original Brand Colors */}
            <div className="flex justify-center md:justify-start space-x-4">
              {/* Facebook - Original Facebook Blue */}
              <a href="#" className="w-10 h-10 bg-[#1877F2] rounded-full flex items-center justify-center hover:bg-[#166FE5] transition-colors">
                <Facebook className="w-5 h-5 text-white" />
              </a>
              {/* Twitter - Original Twitter Blue */}
              <a href="#" className="w-10 h-10 bg-[#1DA1F2] rounded-full flex items-center justify-center hover:bg-[#1A91DA] transition-colors">
                <Twitter className="w-5 h-5 text-white" />
              </a>
              {/* LinkedIn - Original LinkedIn Blue */}
              <a href="#" className="w-10 h-10 bg-[#0A66C2] rounded-full flex items-center justify-center hover:bg-[#094EA3] transition-colors">
                <Linkedin className="w-5 h-5 text-white" />
              </a>
              {/* Instagram - Original Instagram Gradient */}
              <a href="#" className="w-10 h-10 bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] rounded-full flex items-center justify-center hover:opacity-90 transition-opacity">
                <Instagram className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/courses" className="text-gray-300 hover:text-white transition-colors">
                  Courses
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Mentors
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-bold mb-4">Contact & Support</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-center md:justify-start gap-2">
                                 <Mail className="w-4 h-4 text-theme-primary" />
                <span className="text-gray-300">support@edumentor.com</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                                 <Phone className="w-4 h-4 text-theme-primary" />
                <span className="text-gray-300">+91 (987) 654-3210</span>
              </div>
            </div>
          </div>

          {/* Registration Office */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-bold mb-4">Registration Office</h4>
            <div className="flex items-start justify-center md:justify-start gap-2">
              <MapPin className="w-4 h-4 text-theme-primary mt-1" />
              <div className="text-gray-300 text-sm">
                <div>EduMentor Education Center</div>
                <div>123 Learning Street, Tech City</div>
                <div>TC 12345, India</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Copyright and Legal */}
      <div className="border-t border-slate-700">
        <div className="container py-6 px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-300 text-sm">
              © 2024 EduMentor. All rights reserved.
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <span className="text-gray-600">|</span>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;