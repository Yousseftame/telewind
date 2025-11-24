import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Radio, Satellite, Globe, Radar, Zap, Building2, Factory } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";


const industries = [
  {
    icon: Shield,
    title: "Defense & Military Communications",
    description: "Mission-critical systems for defense operations requiring the highest levels of reliability and security.",
    applications: [
      "Tactical battlefield communications",
      "Command and control systems",
      "Electronic warfare capabilities",
      "Secure data transmission",
    ],
    color: "text-accent",
  },
  {
    icon: Zap,
    title: "Electronic Warfare & Countermeasures",
    description: "Advanced EW systems providing spectrum dominance and protection against electronic threats.",
    applications: [
      "Signal intelligence gathering",
      "Communications jamming",
      "Radar jamming systems",
      "Direction finding solutions",
    ],
    color: "text-accent",
  },
  {
    icon: Radar,
    title: "Radar & Surveillance Systems",
    description: "High-performance radar solutions for detection, tracking, and identification of targets.",
    applications: [
      "Air traffic control",
      "Border surveillance",
      "Maritime monitoring",
      "Ground-based air defense",
    ],
    color: "text-accent",
  },
  {
    icon: Satellite,
    title: "Aerospace & UAV Integration",
    description: "Lightweight, reliable electronics designed for airborne and space applications.",
    applications: [
      "UAV communication links",
      "Satellite ground stations",
      "Airborne surveillance",
      "Space-qualified components",
    ],
    color: "text-accent",
  },
  {
    icon: Building2,
    title: "Critical Infrastructure & Security",
    description: "Protecting vital infrastructure with advanced communication and surveillance capabilities.",
    applications: [
      "Perimeter security systems",
      "Emergency response networks",
      "Infrastructure monitoring",
      "Secure facility communications",
    ],
    color: "text-accent",
  },
  {
    icon: Factory,
    title: "Industrial & High-Reliability Systems",
    description: "Robust electronics for demanding industrial environments requiring continuous operation.",
    applications: [
      "Industrial automation",
      "Remote monitoring",
      "Process control systems",
      "Heavy industry communications",
    ],
    color: "text-accent",
  },
  {
    icon: Globe,
    title: "Government & Public Safety",
    description: "Reliable communication systems for government agencies and first responders.",
    applications: [
      "Emergency services communications",
      "Law enforcement systems",
      "Disaster response networks",
      "Public safety infrastructure",
    ],
    color: "text-accent",
  },
  {
    icon: Radio,
    title: "Maritime & Naval Operations",
    description: "Marine-grade electronics designed for harsh maritime environments.",
    applications: [
      "Naval communications",
      "Vessel tracking systems",
      "Port security",
      "Coast guard operations",
    ],
    color: "text-accent",
  },
];

export default function Industries() {
         const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <h1 className="font-heading text-5xl font-bold mb-4 pt-5">{t(`industriesApplications.title`)}</h1>
          <p className="text-lg text-primary-foreground/90 max-w-2xl">
           {t(`industriesApplications.description`)}
          </p>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {industries.map((industry, idx) => (
              <Card key={idx} className="hover:shadow-xl transition-shadow border-l-4 border-accent">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="bg-accent/10 p-3 rounded-sm">
                      <industry.icon className={`w-8 h-8 ${industry.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading text-2xl font-bold mb-2">{industry.title}</h3>
                      <p className="text-muted-foreground">{industry.description}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                      {t(`industriesApplications.keyApplications`)}
                    </p>
                    <ul className="space-y-2">
                      {industry.applications.map((app, appIdx) => (
                        <li key={appIdx} className="flex items-start text-sm">
                          <span className="text-accent mr-2 font-bold">•</span>
                          <span>{app}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button variant="link" className="p-0" asChild>
                    <Link to="/products">{t(`industriesApplications.viewProducts`)} →</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-heading font-bold text-accent mb-2">45+</div>
              <p className="text-muted-foreground">{t(`industriesApplications.yearsExperience`)}</p>
            </div>
            <div>
              <div className="text-4xl font-heading font-bold text-accent mb-2">1000+</div>
              <p className="text-muted-foreground">{t(`industriesApplications.systemsDeployed`)}</p>
            </div>
            <div>
              <div className="text-4xl font-heading font-bold text-accent mb-2">50+</div>
              <p className="text-muted-foreground">{t(`industriesApplications.countriesServed`)}</p>
            </div>
            <div>
              <div className="text-4xl font-heading font-bold text-accent mb-2">99.9%</div>
              <p className="text-muted-foreground">{t(`industriesApplications.systemReliability`)}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-4xl font-bold mb-4">{t(`industryConsultation.title`)}</h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
           {t(`industryConsultation.description`)}
          </p>
          <Button variant="hero" size="lg" asChild>
            <Link to="/contact">{t(`industryConsultation.scheduleButton`)}</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
