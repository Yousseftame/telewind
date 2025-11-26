// src/pages/Home.tsx - UPDATED with Dynamic API Data

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
  Users,
  MapPin,
  Building2,
  Loader2,
} from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  useHomeCategories,
  useHomeIndustries,
  useHomeCertificates,
  useHomePartnerLogos,
} from "@/hooks/useSiteHome";

// Icon mapping for categories (fallback if API doesn't provide icon component)
const categoryIconMap: Record<string, any> = {
  radar: Radar,
  ew: Zap,
  comms: Radio,
  rf: Satellite,
  optical: Eye,
  sigint: Target,
};

// Icon mapping for industries
const industryIconMap: Record<string, any> = {
  defense: Shield,
  communications: Radio,
  aerospace: Satellite,
  industrial: Globe,
};

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { t } = useTranslation();

  // ✅ Fetch dynamic data with language support
  const { data: categories = [], isLoading: categoriesLoading } =
    useHomeCategories();
  const { data: industries = [], isLoading: industriesLoading } =
    useHomeIndustries();
  const { data: certificates = [], isLoading: certificatesLoading } =
    useHomeCertificates();
  const { data: partnerLogos = [], isLoading: logosLoading } =
    useHomePartnerLogos();

  return (
    <div className="min-h-screen">
      {/* Hero Section - UNCHANGED */}
      <section
        className="relative h-screen flex items-center justify-center text-center overflow-hidden"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-primary/90"></div>

        <div className="relative z-10 container mx-auto px-4 text-primary-foreground">
          <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            {t("hero.title")}
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-primary-foreground/90 leading-relaxed">
            {t("hero.description")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="hero" size="lg" asChild>
              <Link to="/products">{t("hero.exploreButton")}</Link>
            </Button>
            <Button variant="hero-outline" size="lg" asChild>
              <Link to="/contact">{t("hero.contactButton")}</Link>
            </Button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary-foreground/50 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-primary-foreground/50 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Key Pillars - UNCHANGED */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-t-4 border-accent">
              <CardContent className="pt-8">
                <Award className="w-12 h-12 text-accent mb-4" />
                <h3 className="font-heading text-xl font-bold mb-2">
                  {t("keyPillars.pillar1Title")}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {t("keyPillars.pillar1Description")}
                </p>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-accent">
              <CardContent className="pt-8">
                <Factory className="w-12 h-12 text-accent mb-4" />
                <h3 className="font-heading text-xl font-bold mb-2">
                  {t("keyPillars.pillar2Title")}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {t("keyPillars.pillar2Description")}
                </p>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-accent">
              <CardContent className="pt-8">
                <Shield className="w-12 h-12 text-accent mb-4" />
                <h3 className="font-heading text-xl font-bold mb-2">
                  {t("keyPillars.pillar3Title")}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {t("keyPillars.pillar3Description")}
                </p>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-accent">
              <CardContent className="pt-8">
                <Cpu className="w-12 h-12 text-accent mb-4" />
                <h3 className="font-heading text-xl font-bold mb-2">
                  {t("keyPillars.pillar4Title")}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {t("keyPillars.pillar4Description")}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ✅ UPDATED: Featured Product Categories - NOW DYNAMIC */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              {t("featuredProducts.title")}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t("featuredProducts.description")}
            </p>
          </div>

          {categoriesLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-12 h-12 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category) => {
                // Use category.icon from API if available, otherwise use default icon
                const hasApiIcon = category.icon && category.icon.trim() !== "";

                return (
                  <Card
                    key={category.id}
                    className="group hover:shadow-xl transition-shadow overflow-hidden"
                  >
                    <div className="h-48 overflow-hidden">
                      <img
                        src={category.image || "/placeholder.svg"}
                        alt={category.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-6">
                      {/* Display icon from API or fallback to Radar */}

                      <div className="flex items-center gap-2">
                        {hasApiIcon ? (
                          <img
                            src={category.icon}
                            alt={`${category.title} icon`}
                            className="w-10 h-10 text-accent mb-3 object-contain"
                          />
                        ) : (
                          <Radar className="w-10 h-10 text-accent mb-3" />
                        )}
                        <h3 className="font-heading text-xl font-bold mb-2">
                          {category.name}
                        </h3>
                      </div>

                      <p className="text-muted-foreground text-sm mb-4">
                        {category.description}
                      </p>
                      <Button variant="link" className="p-0" asChild>
                        <Link to={`/products?category=${category.id}`}>
                          {t("featuredProducts.learnMore")}{" "}
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          <div className="text-center mt-12">
            <Button variant="default" size="lg" asChild>
              <Link to="/products">{t("featuredProducts.viewAll")}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ✅ UPDATED: Industries & Applications - NOW DYNAMIC */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              {t("industries.title")}
            </h2>
            <p className="text-primary-foreground/90 text-lg max-w-2xl mx-auto">
              {t("industries.description")}
            </p>
          </div>

          {industriesLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-12 h-12 animate-spin text-primary-foreground" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6   text-yellow-300">
              {industries.slice(0, 4).map((industry) => {
                // Use industry.icon from API if available
                const hasApiIcon = industry.icon && industry.icon.trim() !== "";
                const IconComponent = industryIconMap[industry.slug] || Shield;

                return (
                  <Card
                    key={industry.id}
                    className="bg-primary-foreground/10 border-primary-foreground/20 hover:bg-primary-foreground/20 transition-colors"
                  >
                    <CardContent className="p-6 text-center">
                      {/* Display icon from API or fallback to component icon */}
                      {hasApiIcon ? (
                        <img
                          src={industry.icon}
                          alt={`${industry.title} icon`}
                          className="w-12 h-12 mx-auto mb-3 object-contain "
                        />
                      ) : (
                        <IconComponent className="w-12 h-12 text-yellow-300 mx-auto mb-3" />
                      )}

                      <h3 className="font-heading text-primary-foreground/80 text-lg font-bold mb-2">
                        {industry.title}
                      </h3>
                      <p className="text-sm text-primary-foreground/80">
                        {industry.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          <div className="text-center mt-12">
            <Button variant="hero-outline" size="lg" asChild>
              <Link to="/industries">{t("industries.explore")}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ✅ UPDATED: Global Trust / Certifications - NOW DYNAMIC */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold mb-2">
              {t("globalTrust.title")}
            </h2>
            <p className="text-muted-foreground">
              {t("globalTrust.description")}
            </p>
          </div>

          {certificatesLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-12 h-12 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="bg-background rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer hover:scale-105 transition-transform duration-300"
                  onClick={() => setSelectedImage(cert.image)}
                >
                  <img
                    src={cert.image || "/placeholder.svg"}
                    alt={cert.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4 text-center">
                    <h3 className="font-heading font-bold text-sm tracking-wide">
                      {cert.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Partners & Distributors - UNCHANGED */}
      <section className="py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <p className="text-accent font-semibold mb-2">
                {t("network.ourNetwork")}
              </p>
              <h2 className="font-heading text-4xl md:text-5xl font-bold">
                {t("network.title")}
              </h2>
            </div>
            <div className="flex items-center gap-8 text-muted-foreground">
              <div className="text-center">
                <p className="text-3xl font-bold text-foreground">50+</p>
                <p className="text-sm">{t("network.partners")}</p>
              </div>
              <div className="h-10 w-px bg-border" />
              <div className="text-center">
                <p className="text-3xl font-bold text-foreground">30+</p>
                <p className="text-sm">{t("network.countries")}</p>
              </div>
              <div className="h-10 w-px bg-border" />
              <div className="text-center">
                <p className="text-3xl font-bold text-foreground">100%</p>
                <p className="text-sm">{t("network.satisfaction")}</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-accent via-accent/50 to-transparent rounded-full" />

            <div className="pl-8 md:pl-12">
              {logosLoading ? (
                <div className="flex justify-center py-20">
                  <Loader2 className="w-10 h-10 animate-spin text-primary" />
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                  {partnerLogos.map((logo) => (
                    <div
                      key={logo.id}
                      className="group relative bg-muted/50 hover:bg-background rounded-xl aspect-[2/1] flex items-center justify-center p-6 transition-all duration-300 hover:shadow-lg cursor-pointer"
                    >
                      <img
                        src={logo.logoUrl}
                        alt={`Partner Logo ${logo.id}`}
                        className="max-w-[80%] max-h-[60%] object-contain filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                      />
                      <div className="absolute inset-x-0 bottom-0 h-1 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-xl" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Image Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
              aria-label="Close lightbox"
            >
              <svg
                className="w-10 h-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <img
              src={selectedImage || "/placeholder.svg"}
              alt="Certification fullscreen"
              className="w-full h-auto max-h-[85vh] object-contain rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}

      {/* CTA Section - UNCHANGED */}
      <section className="py-20 bg-gradient-to-br from-primary via-secondary to-primary">
        <div className="container mx-auto px-4 text-center text-primary-foreground">
          <Users className="w-16 h-16 mx-auto mb-6 text-accent" />
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            {t("ctaSection.title")}
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            {t("ctaSection.description")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" asChild>
              <Link to="/contact">{t("ctaSection.contact")}</Link>
            </Button>
            <Button variant="hero-outline" size="lg" asChild>
              <Link to="/products">{t("ctaSection.browse")}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
