import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Shield, 
  Cpu, 
  Radio, 
  Radar,
  Zap,
  Target,
  Eye,
  Satellite,
  ArrowRight,
  Factory,
  Globe,
  Award,
  Users
} from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import radarSystems from "@/assets/radar-systems.jpg";
import electronicWarfare from "@/assets/electronic-warfare.jpg";
import tacticalComms from "@/assets/tactical-comms.jpg";
import rfAmplifiers from "@/assets/rf-amplifiers.jpg";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-center justify-center text-center overflow-hidden"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-primary/90"></div>
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-primary-foreground">
          <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            WE DEFEND WITH TECHNOLOGY
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-primary-foreground/90 leading-relaxed">
            TeleWind Electronics delivers radar, electronic warfare, tactical communications, and intelligent systems built on 45+ years of in-house engineering and manufacturing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="hero" size="lg" asChild>
              <Link to="/products">Explore Products & Solutions</Link>
            </Button>
            <Button variant="hero-outline" size="lg" asChild>
              <Link to="/contact">Contact Our Team</Link>
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary-foreground/50 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-primary-foreground/50 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Key Pillars */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-t-4 border-accent">
              <CardContent className="pt-8">
                <Award className="w-12 h-12 text-accent mb-4" />
                <h3 className="font-heading text-xl font-bold mb-2">45+ Years of Engineering Excellence</h3>
                <p className="text-muted-foreground text-sm">
                  Decades of proven expertise in defense-grade electronics and systems integration.
                </p>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-accent">
              <CardContent className="pt-8">
                <Factory className="w-12 h-12 text-accent mb-4" />
                <h3 className="font-heading text-xl font-bold mb-2">Full In-House Design & Manufacturing</h3>
                <p className="text-muted-foreground text-sm">
                  Complete control from concept to production with advanced SMT/DIP capabilities.
                </p>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-accent">
              <CardContent className="pt-8">
                <Shield className="w-12 h-12 text-accent mb-4" />
                <h3 className="font-heading text-xl font-bold mb-2">Defense-Grade RF, EW & Tactical Communications</h3>
                <p className="text-muted-foreground text-sm">
                  Military-spec systems for mission-critical operations and secure communications.
                </p>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-accent">
              <CardContent className="pt-8">
                <Cpu className="w-12 h-12 text-accent mb-4" />
                <h3 className="font-heading text-xl font-bold mb-2">AI, Robotics & Synthetic Intelligence</h3>
                <p className="text-muted-foreground text-sm">
                  Next-generation intelligent platforms and collaborative robotic systems.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Product Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">Product Categories</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Advanced electronics systems designed for the most demanding defense and industrial applications
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-xl transition-shadow overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img 
                  src={radarSystems} 
                  alt="Radar & Microwave Systems" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6">
                <Radar className="w-10 h-10 text-accent mb-3" />
                <h3 className="font-heading text-xl font-bold mb-2">Radar & Microwave Systems</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  High-performance radar solutions for surveillance, tracking, and detection applications.
                </p>
                <Button variant="link" className="p-0" asChild>
                  <Link to="/products?category=radar">
                    Learn More <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-shadow overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img 
                  src={electronicWarfare} 
                  alt="Electronic Warfare" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6">
                <Zap className="w-10 h-10 text-accent mb-3" />
                <h3 className="font-heading text-xl font-bold mb-2">Electronic Warfare & Jamming</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Advanced EW systems for signal intelligence and spectrum dominance operations.
                </p>
                <Button variant="link" className="p-0" asChild>
                  <Link to="/products?category=ew">
                    Learn More <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-shadow overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img 
                  src={tacticalComms} 
                  alt="Tactical Communications" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6">
                <Radio className="w-10 h-10 text-accent mb-3" />
                <h3 className="font-heading text-xl font-bold mb-2">Tactical Communication</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Secure HF, VHF, and UHF communication systems for mission-critical operations.
                </p>
                <Button variant="link" className="p-0" asChild>
                  <Link to="/products?category=comms">
                    Learn More <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-shadow overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img 
                  src={rfAmplifiers} 
                  alt="RF Power Amplifiers" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6">
                <Satellite className="w-10 h-10 text-accent mb-3" />
                <h3 className="font-heading text-xl font-bold mb-2">RF Power Amplifiers</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  High-power RF amplification systems for demanding transmission requirements.
                </p>
                <Button variant="link" className="p-0" asChild>
                  <Link to="/products?category=rf">
                    Learn More <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-shadow overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Eye className="w-24 h-24 text-primary-foreground opacity-50" />
              </div>
              <CardContent className="p-6">
                <Eye className="w-10 h-10 text-accent mb-3" />
                <h3 className="font-heading text-xl font-bold mb-2">Optical & High-Speed Shutter Systems</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Precision optical systems for high-speed imaging and sensing applications.
                </p>
                <Button variant="link" className="p-0" asChild>
                  <Link to="/products?category=optical">
                    Learn More <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-shadow overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-secondary to-accent/20 flex items-center justify-center">
                <Target className="w-24 h-24 text-primary opacity-50" />
              </div>
              <CardContent className="p-6">
                <Target className="w-10 h-10 text-accent mb-3" />
                <h3 className="font-heading text-xl font-bold mb-2">Direction Finding & Signal Intelligence</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Advanced DF systems for precise signal location and intelligence gathering.
                </p>
                <Button variant="link" className="p-0" asChild>
                  <Link to="/products?category=sigint">
                    Learn More <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button variant="default" size="lg" asChild>
              <Link to="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Industries & Applications Teaser */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">Industries We Serve</h2>
            <p className="text-primary-foreground/90 text-lg max-w-2xl mx-auto">
              Trusted by defense, security, and critical infrastructure organizations worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: "Defense & Security", desc: "Military-grade systems" },
              { icon: Radio, title: "Critical Communications", desc: "Secure tactical links" },
              { icon: Satellite, title: "Aerospace & Surveillance", desc: "Advanced detection" },
              { icon: Globe, title: "Industrial Systems", desc: "High-reliability solutions" }
            ].map((industry, idx) => (
              <Card key={idx} className="bg-primary-foreground/10 border-primary-foreground/20 hover:bg-primary-foreground/20 transition-colors">
                <CardContent className="p-6 text-center">
                  <industry.icon className="w-12 h-12 text-accent mx-auto mb-3" />
                  <h3 className="font-heading text-primary-foreground/80 text-lg font-bold mb-2">{industry.title}</h3>
                  <p className="text-sm text-primary-foreground/80">{industry.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="hero-outline" size="lg" asChild>
              <Link to="/industries">Explore All Industries</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Case Studies Highlight */}
      {/* <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">Proven Results</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Real-world deployments demonstrating reliability and performance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="bg-accent/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-heading text-xl font-bold mb-2">Secure Tactical Link Deployment</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Successfully deployed encrypted tactical communication systems across multiple theater operations with zero downtime.
                </p>
                <Button variant="link" className="p-0" asChild>
                  <Link to="/case-studies">
                    Read Case Study <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="bg-accent/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Radar className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-heading text-xl font-bold mb-2">Advanced EW Integration</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Integrated electronic warfare suite providing comprehensive spectrum dominance capabilities for critical operations.
                </p>
                <Button variant="link" className="p-0" asChild>
                  <Link to="/case-studies">
                    Read Case Study <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="bg-accent/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Satellite className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-heading text-xl font-bold mb-2">Radar System Modernization</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Upgraded legacy radar infrastructure with next-generation detection and tracking capabilities.
                </p>
                <Button variant="link" className="p-0" asChild>
                  <Link to="/case-studies">
                    Read Case Study <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button variant="default" size="lg" asChild>
              <Link to="/case-studies">View All Case Studies</Link>
            </Button>
          </div>
        </div>
      </section> */}

      {/* Global Trust / Certifications */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="font-heading text-3xl font-bold mb-2">Global Trust & Quality Assurance</h2>
            <p className="text-muted-foreground">Certified excellence in defense electronics manufacturing</p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6">
            {[
              "ISO 9001",
              "ISO 13485",
              "In-House EMS",
              "Advanced SMT/DIP",
              "MES/SECS/GEM",
              "Industry 4.0"
            ].map((cert, idx) => (
              <div key={idx} className="bg-background border-2 border-accent/20 px-6 py-3 rounded-sm">
                <span className="font-heading font-bold text-sm tracking-wider">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary via-secondary to-primary">
        <div className="container mx-auto px-4 text-center text-primary-foreground">
          <Users className="w-16 h-16 mx-auto mb-6 text-accent" />
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">Ready to Partner with TeleWind?</h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Let's discuss how our defense-grade electronics can meet your mission-critical requirements
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" asChild>
              <Link to="/contact">Contact Our Team</Link>
            </Button>
            <Button variant="hero-outline" size="lg" asChild>
              <Link to="/products">Browse Products</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
