// src/pages/Industries.tsx - UPDATED with Dynamic API Data

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSiteIndustries } from "@/hooks/useSiteData";

export default function Industries() {
  const { t } = useTranslation();
  const { data: industries = [], isLoading } = useSiteIndustries();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <h1 className="font-heading text-5xl font-bold mb-4 pt-5">
            {t("industriesApplications.title")}
          </h1>
          <p className="text-lg text-primary-foreground/90 max-w-2xl">
            {t("industriesApplications.description")}
          </p>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-12 h-12 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {industries.map((industry) => {
                const hasApiIcon = industry.icon && industry.icon.trim() !== "";
                
                return (
                  <Card
                    key={industry.id}
                    className="hover:shadow-xl transition-shadow border-l-4 border-accent"
                  >
                    <CardContent className="p-8">
                      <div className="flex items-start gap-4 mb-6">
                        <div className="bg-accent/10 p-3 rounded-sm">
                          {hasApiIcon ? (
                            <img
                              src={industry.icon}
                              alt={`${industry.title} icon`}
                              className="w-8 h-8 object-contain"
                            />
                          ) : (
                            <Shield className="w-8 h-8 text-accent" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-heading text-2xl font-bold mb-2">
                            {industry.title}
                          </h3>
                          <p className="text-muted-foreground">
                            {industry.description}
                          </p>
                        </div>
                      </div>

                      {industry.applications && industry.applications.length > 0 && (
                        <div className="mb-6">
                          <p className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                            {t("industriesApplications.keyApplications")}
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
                      )}

                      <Button variant="link" className="p-0" asChild>
                        <Link to="/products">
                          {t("industriesApplications.viewProducts")} →
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          {!isLoading && industries.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No industries available at the moment
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-heading font-bold text-accent mb-2">
                45+
              </div>
              <p className="text-muted-foreground">
                {t("industriesApplications.yearsExperience")}
              </p>
            </div>
            <div>
              <div className="text-4xl font-heading font-bold text-accent mb-2">
                1000+
              </div>
              <p className="text-muted-foreground">
                {t("industriesApplications.systemsDeployed")}
              </p>
            </div>
            <div>
              <div className="text-4xl font-heading font-bold text-accent mb-2">
                50+
              </div>
              <p className="text-muted-foreground">
                {t("industriesApplications.countriesServed")}
              </p>
            </div>
            <div>
              <div className="text-4xl font-heading font-bold text-accent mb-2">
                99.9%
              </div>
              <p className="text-muted-foreground">
                {t("industriesApplications.systemReliability")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-4xl font-bold mb-4">
            {t("industryConsultation.title")}
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            {t("industryConsultation.description")}
          </p>
          <Button variant="hero" size="lg" asChild>
            <Link to="/contact">
              {t("industryConsultation.scheduleButton")}
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}