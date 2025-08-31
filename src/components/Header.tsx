import { Button } from "@/components/ui/button";
import { BookOpen, Menu, User, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const location = useLocation();
  const { currentUser, logout } = useAuth();

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const getNavLinkClass = (path: string) => {
    const baseClass = "text-sm font-medium transition-colors";
    if (isActive(path)) {
      return `${baseClass} text-theme-primary font-semibold`;
    }
    return `${baseClass} text-muted-foreground hover:text-theme-primary`;
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-theme-primary">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-theme-primary">EduMentor</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className={getNavLinkClass("/")}>
              Home
            </Link>
            <Link to="/courses" className={getNavLinkClass("/courses")}>
              Courses
            </Link>
            <Link to="/blogs" className={getNavLinkClass("/blogs")}>
              Blog
            </Link>
            <Link to="/pricing" className={getNavLinkClass("/pricing")}>
              Pricing
            </Link>
            <Link to="/contact" className={getNavLinkClass("/contact")}>
              Contact
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {currentUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden md:inline">
                    {currentUser.displayName || currentUser.email}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => window.location.href = '/profile'}>
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/signin">
              <Button variant="hero" size="sm">
                Sign In
              </Button>
            </Link>
          )}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;