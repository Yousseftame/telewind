import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import telewindLogo from "@/assets/telewind-logo.png";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useHomeCategories } from "@/hooks/useSiteHome";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const { t } = useTranslation();
  const { data: categories = [], isLoading: categoriesLoading } = useHomeCategories();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t("nav.home"), path: "/" },
    { name: t("nav.industries"), path: "/industries" },
    { name: t("nav.events"), path: "/events" },
    { name: t("nav.partners"), path: "/partners" },
    { name: t("nav.contact"), path: "/contact" },
  ];

  const productCategories = [
    { name: t("productCategories.all"), categoryId: 0, path: "/products" },
    ...categories.map(cat => ({
      name: cat.name,
      categoryId: cat.id,
      path: `/products?category=${cat.id}`
    }))
  ];

  const isActive = (path: string) => location.pathname === path;
  const isProductsActive = location.pathname === "/products" || location.pathname.startsWith("/products/");

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-md shadow-md py-3" : "bg-background py-5"
      }`}
    >
      <nav className="container h-10 mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={telewindLogo} alt="TeleWind Electronics" className="h-16 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>

            {/* HOME */}
            <NavigationMenuItem>
              <Link to="/" className="px-4 py-2 text-sm font-medium tracking-wide transition-colors relative group/item">
                <span className={`${isActive("/") ? "text-primary" : "text-muted-foreground group-hover/item:text-primary"}`}>
                  {t("nav.home")}
                </span>

                {/* Underline */}
               <span className="absolute bottom-0 left-0 right-0 h-1.5 flex flex-col">

  {/* BLUE LINE */}
  <span
    className={`h-0.5 bg-[#000d63] transition-transform duration-300 origin-left
      ${isActive("/") ? "scale-x-100" : "scale-x-0 group-hover/item:scale-x-100"}
    `}
  ></span>

  {/* YELLOW LINE */}
  {!isActive("/") ? (
    <span className="h-0.5 bg-accent scale-x-0 group-hover/item:scale-x-100 transition-transform duration-300 origin-left"></span>
  ) : (
    <span className="h-0.5 bg-accent"></span>
  )}

</span>

              </Link>
            </NavigationMenuItem>

            {/* PRODUCTS DROPDOWN */}
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={`px-4 py-2 text-sm font-medium tracking-wide transition-colors bg-transparent hover:bg-transparent 
                data-[state=open]:bg-transparent focus:bg-transparent data-[active]:bg-transparent ${
                  isProductsActive ? "text-primary" : "text-muted-foreground hover:text-primary"
                }`}
              >
                {t("nav.products")}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 bg-background border border-border shadow-lg rounded-md">
                  {categoriesLoading ? (
                    <li className="p-3 text-sm text-muted-foreground">Loading categories...</li>
                  ) : productCategories.length === 0 ? (
                    <li className="p-3 text-sm text-muted-foreground">{t("productDetails.noCategories")}</li>
                  ) : (
                    productCategories.map((cat) => (
                      <li key={cat.categoryId}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={cat.path}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">{cat.name}</div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))
                  )}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* OTHER LINKS */}
            {navLinks.filter(link => link.path !== "/").map((link) => (
              <NavigationMenuItem key={link.path}>
                <Link
                  to={link.path}
                  className="px-4 py-2 text-sm font-medium tracking-wide transition-colors relative group/item"
                >
                  <span className={`${isActive(link.path) ? "text-primary" : "text-muted-foreground group-hover/item:text-primary"}`}>
                    {link.name}
                  </span>

                  {/* Underline */}
                 <span className="absolute bottom-0 left-0 right-0 h-1.5 flex flex-col">

  {/* BLUE LINE */}
  <span
    className={`h-0.5 bg-[#000d63] transition-transform duration-300 origin-left
      ${isActive(link.path) ? "scale-x-100" : "scale-x-0 group-hover/item:scale-x-100"}
    `}
  ></span>

  {/* YELLOW LINE */}
  {isActive(link.path) ? (
    <span className="h-0.5 bg-accent scale-x-100"></span>
  ) : (
    <span className="h-0.5 bg-accent scale-x-0 group-hover/item:scale-x-100 transition-transform duration-300 origin-left"></span>
  )}

</span>


                </Link>
              </NavigationMenuItem>
            ))}

          </NavigationMenuList>
        </NavigationMenu>

        {/* Language Switcher & Mobile Menu Button */}
        <div className="flex items-center gap-2">
          <LanguageSwitcher />

          <button
            className="lg:hidden text-foreground p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
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
              {t("nav.home")}
            </Link>

            <div className="border-l-2 border-accent pl-2">
              <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                {t("nav.products")}
              </div>
              {categoriesLoading ? (
                <div className="px-4 py-2 text-sm text-muted-foreground">Loading...</div>
              ) : productCategories.length === 0 ? (
                <div className="px-4 py-2 text-sm text-muted-foreground">No categories</div>
              ) : (
                productCategories.map((cat) => (
                  <Link
                    key={cat.categoryId}
                    to={cat.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-primary transition-colors rounded-sm"
                  >
                    {cat.name}
                  </Link>
                ))
              )}
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
