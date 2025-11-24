import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Globe, Mail, Phone, ExternalLink, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const regions = ["All Regions", "Americas", "Europe", "Middle East", "Asia-Pacific", "Africa"];

const partners = [
  {
    id: 1,
    name: "Advanced Defense Solutions Inc.",
    type: "Authorized Distributor",
    region: "Americas",
    country: "United States",
    contact: "John Smith",
    email: "jsmith@advdefense.com",
    phone: "+1 (555) 123-4567",
    website: "https://www.advanceddefensesolutionsllc.com/index.html",
    focus: ["Radar Systems", "Electronic Warfare", "RF Amplifiers"],
  },
  {
    id: 2,
    name: "EuroTech Defense GmbH",
    type: "Distributor",
    region: "Europe",
    country: "Germany",
    contact: "Hans Mueller",
    email: "h.mueller@eurotech-defense.de",
    phone: "+49 30 12345678",
    website: "https://www.eurotech.com/",
    focus: ["Tactical Communications", "Radar Systems"],
  },
  {
    id: 3,
    name: "Middle East Defense Technologies",
    type: "System Integrator",
    region: "Middle East",
    country: "United Arab Emirates",
    contact: "Ahmed Al-Rashid",
    email: "a.alrashid@medt.ae",
    phone: "+971 2 123 4567",
    website: "www.medt.ae",
    focus: ["Electronic Warfare", "Defense Systems Integration"],
  },
  {
    id: 4,
    name: "Asia Pacific Electronics Co.",
    type: "Authorized Distributor",
    region: "Asia-Pacific",
    country: "Singapore",
    contact: "Li Wei Chen",
    email: "l.chen@apelectronics.sg",
    phone: "+65 6123 4567",
    website: "https://pacific-electronics.com/",
    focus: ["RF Amplifiers", "Tactical Communications", "Optical Systems"],
  },
  {
    id: 5,
    name: "Nordic Defense Systems AB",
    type: "Technology Partner",
    region: "Europe",
    country: "Sweden",
    contact: "Erik Svensson",
    email: "e.svensson@nordicdefense.se",
    phone: "+46 8 123 4567",
    website: "www.nordicdefense.se",
    focus: ["Radar Systems", "Signal Intelligence"],
  },
  {
    id: 6,
    name: "Latin America Security Solutions",
    type: "Distributor",
    region: "Americas",
    country: "Brazil",
    contact: "Carlos Rodriguez",
    email: "c.rodriguez@lass.br",
    phone: "+55 11 1234-5678",
    website: "www.lass.br",
    focus: ["Tactical Communications", "Security Systems"],
  },
];

export default function Partners() {
  const [selectedRegion, setSelectedRegion] = useState("All Regions");
         const { t } = useTranslation();
  

  const filteredPartners = partners.filter((partner) =>
    selectedRegion === "All Regions" || partner.region === selectedRegion
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <h1 className="font-heading text-5xl font-bold mb-4 pt-5">{t(`partnersDistributors.title`)}</h1>
          <p className="text-lg text-primary-foreground/90 max-w-2xl">
           {t(`partnersDistributors.description`)}
          </p>
        </div>
      </section>

      {/* Region Filter */}
      <section className="border-b border-border bg-muted/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap items-center gap-2">
            <MapPin className="w-4 h-4 text-muted-foreground mr-2" />
            {regions.map((region) => (
              <Button
                key={region}
                variant={selectedRegion === region ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedRegion(region)}
              >
                {region}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <p className="text-muted-foreground">
              Showing {filteredPartners.length} partner{filteredPartners.length !== 1 ? 's' : ''}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPartners.map((partner) => (
              <Card key={partner.id} className="hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <Badge className="mb-3 bg-accent text-accent-foreground btnHover">{partner.type}</Badge>
                    <h3 className="font-heading text-xl font-bold mb-2">{partner.name}</h3>
                    <p className="text-sm text-muted-foreground">{partner.country}, {partner.region}</p>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-3 mb-4 pb-4 border-b border-border">
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                        {t(`partnersDistributors.contactPerson`)}
                      </p>
                      <p className="text-sm font-medium">{partner.contact}</p>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-accent flex-shrink-0" />
                      <a href={`mailto:${partner.email}`} className="hover:text-accent transition-colors truncate">
                        {partner.email}
                      </a>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-accent flex-shrink-0" />
                      <a href={`tel:${partner.phone}`} className="hover:text-accent transition-colors">
                        {partner.phone}
                      </a>
                    </div>

                    {/* <div className="flex items-center gap-2 text-sm">
                      <Globe className="w-4 h-4 text-accent flex-shrink-0" />
                      <a 
                        href={`https://${partner.website}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-accent transition-colors truncate"
                      >
                        {partner.website}
                      </a>
                    </div> */}
                  </div>

                  {/* Product Focus */}
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                     {t(`partnersDistributors.productFocus`)}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {partner.focus.map((item, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button variant="outline" size="sm" className="w-full mt-4" onClick={() => window.open(partner.website, "_blank")}>
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {t(`partnersDistributors.visitWebsite`)}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPartners.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No partners found in this region</p>
            </div>
          )}
        </div>
      </section>

      {/* Become a Partner */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl font-bold mb-4">{t(`partnersDistributors.becomePartner`)}</h2>
            <p className="text-muted-foreground mb-8">
               {t(`partnersDistributors.becomePartnerDescription`)}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <h4 className="font-heading font-bold mb-2">{t(`partnersDistributors.marketAccess`)}</h4>
                  <p className="text-sm text-muted-foreground">{t(`partnersDistributors.exclusiveRights`)}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <h4 className="font-heading font-bold mb-2">{t(`partnersDistributors.technicalSupport`)}</h4>
                  <p className="text-sm text-muted-foreground">{t(`partnersDistributors.trainingResources`)}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <h4 className="font-heading font-bold mb-2">{t(`partnersDistributors.salesSupport`)}</h4>
                  <p className="text-sm text-muted-foreground">{t(`partnersDistributors.coMarketing`)}</p>
                </CardContent>
              </Card>
            </div>

            <Button variant="default" size="lg">
              
               <Link to="/contact"> {t(`partnersDistributors.partnerForm`)}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-4xl font-bold mb-4">{t(`partnersDistributors.connectLocalPartner`)}</h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            {t(`partnersDistributors.localSupportDescription`)}
          </p>
          <Button variant="hero" size="lg">
             <Link to="/contact"> {t(`partnersDistributors.contactReferral`)}</Link>
            
          </Button>
        </div>
      </section>
    </div>
  );
}
