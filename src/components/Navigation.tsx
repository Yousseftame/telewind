import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import telewindLogo from "@/assets/telewind-logo.png";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Industries & Applications", path: "/industries" },
  // { name: "Case Studies", path: "/case-studies" },
  { name: "Events & Media", path: "/events" },
  { name: "Partners & Distributors", path: "/partners" },
  { name: "Contact", path: "/contact" },
];

const productCategories = [
  { name: "All Products", category: "All" },
  { name: "Radar & Microwave", category: "Radar & Microwave" },
  { name: "Electronic Warfare", category: "Electronic Warfare" },
  { name: "Tactical Communications", category: "Tactical Communications" },
  { name: "RF Power Amplifiers", category: "RF Power Amplifiers" },
];

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      setScrolled(window.scrollY > 50);
    });
  }

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-md shadow-md py-3" : "bg-background py-5"
      }`}
    >
      <nav className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={telewindLogo} alt="TeleWind Electronics" className="h-10 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/" className="px-4 py-2 text-sm font-medium tracking-wide transition-colors relative group">
                <span className={`${isActive("/") ? "text-primary" : "text-muted-foreground group-hover:text-primary"}`}>
                  Home
                </span>
                {isActive("/") && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"></span>}
                {!isActive("/") && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>}
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className={`px-4 py-2 text-sm font-medium tracking-wide transition-colors bg-transparent hover:bg-transparent data-[state=open]:bg-transparent focus:bg-transparent data-[active]:bg-transparent ${
                isActive("/products") ? "text-primary" : "text-muted-foreground hover:text-primary"
              }`}>
                Products & Solutions
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 bg-background border border-border shadow-lg">
                  {productCategories.map((cat) => (
                    <li key={cat.category}>
                      <NavigationMenuLink asChild>
                        <Link
                          to={`/products?category=${encodeURIComponent(cat.category)}`}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">{cat.name}</div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {navLinks.filter(link => link.path !== "/").map((link) => (
              <NavigationMenuItem key={link.path}>
                <Link
                  to={link.path}
className="px-4 py-2 text-sm font-medium tracking-wide transition-colors relative group/item"
                >
                  <span className={`${isActive(link.path) ? "text-primary" : "text-muted-foreground group-hover:text-primary"}`}>
                    {link.name}
                  </span>
                  {isActive(link.path) && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"></span>}
                  {!isActive(link.path) && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent scale-x-0 group-hover/item:scale-x-100 transition-transform duration-300 origin-left"></span>}
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-foreground p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-background border-t border-border">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-4 py-3 text-sm font-medium tracking-wide transition-colors rounded-sm ${
                isActive("/") ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-primary"
              }`}
            >
              Home
            </Link>

            <div className="border-l-2 border-accent pl-2">
              <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Products & Solutions
              </div>
              {productCategories.map((cat) => (
                <Link
                  key={cat.category}
                  to={`/products?category=${encodeURIComponent(cat.category)}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-primary transition-colors rounded-sm"
                >
                  {cat.name}
                </Link>
              ))}
            </div>

            {navLinks.filter(link => link.path !== "/").map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 text-sm font-medium tracking-wide transition-colors rounded-sm ${
                  isActive(link.path)
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-primary"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
