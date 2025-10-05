import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-50 text-gray-800 border-t border-gray-200">
      {/* Mobile: Clean minimal design */}
      <div className="md:hidden">
        <div className="px-4 py-6">
          {/* Brand and Social */}
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">AICareerX</h3>
            <div className="flex justify-center space-x-4">
              <a href="https://www.linkedin.com/company/aicareerx/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-[#0A66C2] rounded-full flex items-center justify-center hover:bg-[#094EA3] transition-colors">
                <Linkedin className="w-4 h-4 text-white" />
              </a>
              <a href="https://www.youtube.com/@AICareerX" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-[#FF0000] rounded-full flex items-center justify-center hover:bg-[#CC0000] transition-colors">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <Link to="/courses" className="w-8 h-8 bg-gradient-to-br from-[#E4405F] via-[#C13584] to-[#833AB4] rounded-full flex items-center justify-center hover:opacity-90 transition-opacity">
                <Instagram className="w-4 h-4 text-white" />
              </Link>
              <Link to="/courses" className="w-8 h-8 bg-[#000000] rounded-full flex items-center justify-center hover:bg-[#333333] transition-colors">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </Link>
            </div>
          </div>

          {/* Quick Links - Horizontal scroll */}
          <div className="mb-6">
            <div className="flex space-x-6 overflow-x-auto pb-2 scrollbar-hide">
              <Link to="/" className="text-gray-600 hover:text-theme-primary transition-colors text-sm whitespace-nowrap">
                Home
              </Link>
              <Link to="/courses" className="text-gray-600 hover:text-theme-primary transition-colors text-sm whitespace-nowrap">
                Courses
              </Link>
              <Link to="/blogs" className="text-gray-600 hover:text-theme-primary transition-colors text-sm whitespace-nowrap">
                Blog
              </Link>
              <Link to="/pricing" className="text-gray-600 hover:text-theme-primary transition-colors text-sm whitespace-nowrap">
                Pricing
              </Link>
              <Link to="/contact" className="text-gray-600 hover:text-theme-primary transition-colors text-sm whitespace-nowrap">
                Contact
              </Link>
            </div>
          </div>

          {/* Contact Info - Compact */}
          <div className="text-center mb-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Mail className="w-4 h-4 text-theme-primary" />
              <span className="text-gray-600 text-sm">contact.aicareerx@gmail.com</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Phone className="w-4 h-4 text-theme-primary" />
              <span className="text-gray-600 text-sm">+91 94827 25438</span>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center pt-4 border-t border-gray-300">
            <p className="text-gray-500 text-xs">© 2025 AICareerX. All rights reserved.</p>
          </div>
        </div>
      </div>

      {/* Desktop: Full layout */}
      <div className="hidden md:block">
        <div className="container py-12 px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Company Information */}
            <div className="text-left">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">AICareerX</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Empowering developers to build cutting-edge AI and LLM applications through practical learning, mentorship, and career support.
              </p>
              
              {/* Social Media Icons */}
              <div className="flex space-x-4">
                <a href="https://www.linkedin.com/company/aicareerx/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#0A66C2] rounded-full flex items-center justify-center hover:bg-[#094EA3] transition-colors">
                  <Linkedin className="w-5 h-5 text-white" />
                </a>
                <a href="https://www.youtube.com/@AICareerX" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#FF0000] rounded-full flex items-center justify-center hover:bg-[#CC0000] transition-colors">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                <Link to="/courses" className="w-10 h-10 bg-gradient-to-br from-[#E4405F] via-[#C13584] to-[#833AB4] rounded-full flex items-center justify-center hover:opacity-90 transition-opacity">
                  <Instagram className="w-5 h-5 text-white" />
                </Link>
                <Link to="/courses" className="w-10 h-10 bg-[#000000] rounded-full flex items-center justify-center hover:bg-[#333333] transition-colors">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </Link>
              </div>
            </div>

            {/* Quick Links */}
            <div className="text-left">
              <h4 className="text-lg font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-gray-600 hover:text-theme-primary transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/courses" className="text-gray-600 hover:text-theme-primary transition-colors">
                    Courses
                  </Link>
                </li>
                <li>
                  <Link to="/blogs" className="text-gray-600 hover:text-theme-primary transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/pricing" className="text-gray-600 hover:text-theme-primary transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-600 hover:text-theme-primary transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact & Support */}
            <div className="text-left">
              <h4 className="text-lg font-bold mb-4">Contact & Support</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-theme-primary flex-shrink-0" />
                  <span className="text-gray-600 break-all">contact.aicareerx@gmail.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-theme-primary flex-shrink-0" />
                  <span className="text-gray-600">+91 94827 25438</span>
                </div>
              </div>
            </div>

            {/* Registered Address */}
            <div className="text-left">
              <h4 className="text-lg font-bold mb-4">Registered Address</h4>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-theme-primary mt-1 flex-shrink-0" />
                <div className="text-gray-600 text-sm">
                  <div>Sourcestack IT Services,</div>
                  <div>L-148, 5th Main Road, Sector 6,</div>
                  <div>Hsr Layout, Bangalore-560102,</div>
                  <div>Karnataka, India,</div>
                  <div className="mt-2 font-medium">CIN: U62099KA2023PTC171028</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Copyright and Legal */}
        <div className="border-t border-gray-300">
          <div className="container py-6 px-4">
            <div className="flex flex-row justify-between items-center">
              <div className="text-gray-500 text-sm">
                © 2025 AICareerX. All rights reserved.
              </div>
              <div className="flex items-center space-x-4 text-sm">
                <a href="#" className="text-gray-500 hover:text-theme-primary transition-colors">
                  Privacy Policy
                </a>
                <span className="text-gray-400">|</span>
                <a href="#" className="text-gray-500 hover:text-theme-primary transition-colors">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;