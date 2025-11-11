import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="font-heading text-lg font-bold mb-4 tracking-wide">TELEWIND ELECTRONICS</h3>
            <p className="text-sm text-primary-foreground/80 mb-4">
              45+ years of defense-grade engineering excellence in radar, electronic warfare, and tactical communications.
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <span>info@telewind.org</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <span>+1 (XXX) XXX-XXXX</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>Headquarters Location</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-lg font-bold mb-4 tracking-wide">QUICK LINKS</h3>
            <ul className="flex flex-col gap-2 text-sm">
              <li><Link to="/products" className="hover:text-accent transition-colors">Products & Solutions</Link></li>
              <li><Link to="/industries" className="hover:text-accent transition-colors">Industries</Link></li>
              <li><Link to="/case-studies" className="hover:text-accent transition-colors">Case Studies</Link></li>
              <li><Link to="/events" className="hover:text-accent transition-colors">Events & Media</Link></li>
              <li><Link to="/partners" className="hover:text-accent transition-colors">Partners</Link></li>
              <li><Link to="/contact" className="hover:text-accent transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="font-heading text-lg font-bold mb-4 tracking-wide">CERTIFICATIONS</h3>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="bg-primary-foreground/10 border border-primary-foreground/20 px-3 py-1 rounded-sm">ISO 9001</span>
              <span className="bg-primary-foreground/10 border border-primary-foreground/20 px-3 py-1 rounded-sm">ISO 13485</span>
              <span className="bg-primary-foreground/10 border border-primary-foreground/20 px-3 py-1 rounded-sm">Industry 4.0</span>
              <span className="bg-primary-foreground/10 border border-primary-foreground/20 px-3 py-1 rounded-sm">MES/SECS/GEM</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/80">
          <p>&copy; {new Date().getFullYear()} TeleWind Electronics. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-accent transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
