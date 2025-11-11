import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Radar, Radio, CheckCircle, TrendingUp, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const caseStudies = [
  {
    id: 1,
    icon: Shield,
    title: "Secure Tactical Link Deployment",
    sector: "Defense Operations",
    region: "EMEA",
    challenge: "A defense organization required encrypted tactical communication systems that could operate reliably in contested electromagnetic environments with zero downtime.",
    solution: "TeleWind deployed our TC-4000 Secure Tactical Radio series with advanced frequency hopping and AES-256 encryption, integrated with redundant backup systems and automated failover capabilities.",
    outcome: {
      reliability: "100% uptime",
      range: "Extended 40% beyond requirements",
      security: "Zero security breaches",
      deployment: "Completed 2 weeks ahead of schedule",
    },
    products: ["TC-4000", "RFA-2000"],
    tags: ["Tactical Communications", "Military", "Encryption"],
  },
  {
    id: 2,
    icon: Radar,
    title: "Advanced EW Integration",
    sector: "Electronic Warfare",
    region: "Asia-Pacific",
    challenge: "A military organization needed an integrated electronic warfare suite providing comprehensive spectrum dominance capabilities across multiple frequency bands.",
    solution: "TeleWind integrated our EW-300 Electronic Warfare Suite with custom signal intelligence modules, direction finding systems, and coordinated jamming capabilities.",
    outcome: {
      coverage: "Full spectrum coverage HF-UHF",
      detection: "Enhanced detection sensitivity by 25dB",
      integration: "Seamless integration with existing C4I",
      training: "Full operator training completed",
    },
    products: ["EW-300", "DF-1000"],
    tags: ["Electronic Warfare", "Signal Intelligence", "Integration"],
  },
  {
    id: 3,
    icon: Radar,
    title: "Radar System Modernization",
    sector: "Air Surveillance",
    region: "Americas",
    challenge: "Legacy radar infrastructure needed modernization to detect modern threats including low-observable targets and provide enhanced tracking capabilities.",
    solution: "TeleWind upgraded the existing radar infrastructure with our TR-5000 Tactical Radar System featuring phased-array technology, advanced signal processing, and multi-target tracking.",
    outcome: {
      detection: "Improved detection range by 60%",
      tracking: "Simultaneous tracking of 200+ targets",
      accuracy: "Enhanced position accuracy by 75%",
      integration: "Full network integration achieved",
    },
    products: ["TR-5000", "Signal Processing Suite"],
    tags: ["Radar", "Modernization", "Air Defense"],
  },
  {
    id: 4,
    icon: Radio,
    title: "Critical Infrastructure Communications",
    sector: "Public Safety",
    region: "Europe",
    challenge: "A national critical infrastructure organization required a resilient communication network for emergency response and continuous operations monitoring.",
    solution: "TeleWind deployed a distributed communication network using our TC-4000 series radios with mesh networking capabilities and redundant backbone links.",
    outcome: {
      coverage: "98% geographic coverage",
      reliability: "99.95% network uptime",
      response: "Emergency response time reduced 35%",
      scalability: "System supports 500+ simultaneous users",
    },
    products: ["TC-4000", "Network Management System"],
    tags: ["Critical Communications", "Public Safety", "Infrastructure"],
  },
];

export default function CaseStudies() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <h1 className="font-heading text-5xl font-bold mb-4">Case Studies</h1>
          <p className="text-lg text-primary-foreground/90 max-w-2xl">
            Real-world deployments demonstrating the reliability and performance of TeleWind solutions
          </p>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="space-y-8">
            {caseStudies.map((study, idx) => (
              <Card key={study.id} className="hover:shadow-xl transition-shadow overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 lg:grid-cols-3">
                    {/* Icon & Meta */}
                    <div className="bg-accent/5 p-8 border-r border-border">
                      <div className="bg-accent/10 w-16 h-16 rounded-sm flex items-center justify-center mb-6">
                        <study.icon className="w-8 h-8 text-accent" />
                      </div>
                      <h3 className="font-heading text-2xl font-bold mb-4">{study.title}</h3>
                      
                      <div className="space-y-3 mb-6">
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Sector</p>
                          <p className="text-sm font-medium">{study.sector}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Region</p>
                          <p className="text-sm font-medium">{study.region}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Products Used</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {study.products.map((product, pIdx) => (
                              <Badge key={pIdx} variant="outline" className="text-xs">
                                {product}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {study.tags.map((tag, tIdx) => (
                          <Badge key={tIdx} className="text-xs bg-primary text-primary-foreground">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="lg:col-span-2 p-8">
                      {/* Challenge */}
                      <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="bg-destructive/10 p-2 rounded-sm">
                            <Clock className="w-4 h-4 text-destructive" />
                          </div>
                          <h4 className="font-heading text-lg font-bold">Challenge</h4>
                        </div>
                        <p className="text-muted-foreground">{study.challenge}</p>
                      </div>

                      {/* Solution */}
                      <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="bg-accent/10 p-2 rounded-sm">
                            <CheckCircle className="w-4 h-4 text-accent" />
                          </div>
                          <h4 className="font-heading text-lg font-bold">Solution</h4>
                        </div>
                        <p className="text-muted-foreground">{study.solution}</p>
                      </div>

                      {/* Outcome */}
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <div className="bg-green-500/10 p-2 rounded-sm">
                            <TrendingUp className="w-4 h-4 text-green-600" />
                          </div>
                          <h4 className="font-heading text-lg font-bold">Outcome & Results</h4>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {Object.entries(study.outcome).map(([key, value], oIdx) => (
                            <div key={oIdx} className="bg-muted/50 p-4 rounded-sm border border-border">
                              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                                {key}
                              </p>
                              <p className="text-sm font-bold text-accent">{value}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-4xl font-bold mb-4">Ready to Achieve Similar Results?</h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Let's discuss how TeleWind can help solve your mission-critical challenges
          </p>
          <Button variant="hero" size="lg" asChild>
            <Link to="/contact">Start Your Project</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
