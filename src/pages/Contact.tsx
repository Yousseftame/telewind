import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, MapPin, Clock, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import { Link, useSearchParams } from "react-router-dom";


export default function Contact() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    country: "",
    inquiryType: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: "Thank you for contacting TeleWind. Our team will respond within 24 hours.",
    });
    setFormData({
      name: "",
      company: "",
      email: "",
      phone: "",
      country: "",
      inquiryType: "",
      message: "",
    });
  };

  useEffect(() => {
    const inquiryFromUrl = searchParams.get("inquiry");
    if (inquiryFromUrl) {
      setFormData((prev) => ({
        ...prev,
        inquiryType: inquiryFromUrl,
      }));

      // scroll to the form
      const formSection = document.getElementById("contact-form");
      if (formSection) {
        setTimeout(() => {
          formSection.scrollIntoView({ behavior: "smooth" });
        }, 200);
      }
    }
  }, [searchParams]);

const handleQuickLinkSelect = (type: string) => {
  setFormData((prev) => ({
    ...prev,
    inquiryType: type,
  }));

  // smooth scroll to form
  const formSection = document.getElementById("contact-form");
  if (formSection) {
    setTimeout(() => {
      formSection.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }
};

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <h1 className="font-heading text-5xl font-bold mb-4 pt-5">{t(`contactUs.title`)}</h1>
          <p className="text-lg text-primary-foreground/90 max-w-2xl">
            {t(`contactUs.description`)}
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <Card className="mb-6">
                <CardContent className="p-6">
                  <h3 className="font-heading text-xl font-bold mb-6">{t(`contactUs.contactInformation`)}</h3>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-sm mb-1">{t(`contactUs.headquarters`)}</p>
                        <p className="text-sm text-muted-foreground">
                          {t(`contactUs.address`)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-sm mb-1">{t(`contactUs.email`)}</p>
                        <a href="mailto:info@telewind.org" className="text-sm text-accent hover:underline">
                          info@telewind.com.tw
                        </a>
                      </div>
                    </div>

                    {/* <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-sm mb-1">Phone</p>
                        <a href="tel:+1234567890" className="text-sm text-accent hover:underline">
                          +1 (XXX) XXX-XXXX
                        </a>
                      </div>
                    </div> */}

                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-sm mb-1">{t(`contactUs.businessHours`)}</p>
                        <p className="text-sm text-muted-foreground">
                          {t(`contactUs.mondayFriday`)}<br />
                          8:00 AM - 6:00 PM ({t(`contactUs.localTime`)})
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-accent/5 border-accent">
                <CardContent className="p-6">
                  <Shield className="w-10 h-10 text-accent mb-3" />
                  <h4 className="font-heading font-bold mb-2">{t(`contactUs.secureCommunications`)}</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    {t(`contactUs.secureDescription`)}
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    {t(`contactUs.requestSecureContact`)}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card id="contact-form">
                <CardContent className="p-8">
                  <h3 className="font-heading text-2xl font-bold mb-6">{t(`contactUs.sendUsMessage`)}</h3>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">{t(`contactUs.fullName`)}</Label>
                        <Input
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="John Smith"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="company">{t(`contactUs.company`)}</Label>
                        <Input
                          id="company"
                          required
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="Defense Organization"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="email">{t(`contactUs.emailAddress`)}</Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="john.smith@example.com"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">{t(`contactUs.phoneNumber`)}</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="country">{t(`contactUs.country`)}</Label>
                        <Input
                          id="country"
                          required
                          value={formData.country}
                          onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                          placeholder="United States"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="inquiryType">{t(`contactUs.inquiryType`)}</Label>
                        <Select
                          value={formData.inquiryType}
                          onValueChange={(value) => setFormData({ ...formData, inquiryType: value })}
                          required
                        >
                          <SelectTrigger id="inquiryType">
                            <SelectValue placeholder="Select inquiry type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="product">{t(`contactUs.productInformation`)}</SelectItem>
                            <SelectItem value="technical">{t(`contactUs.technicalSupport`)}</SelectItem>
                            <SelectItem value="sales">{t(`contactUs.salesInquiry`)}</SelectItem>
                            <SelectItem value="partnership">{t(`contactUs.partnershipOpportunity`)}</SelectItem>
                            <SelectItem value="other">{t(`contactUs.other`)}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">{t(`contactUs.message`)}</Label>
                      <Textarea
                        id="message"
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Please provide details about your inquiry..."
                        rows={6}
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full md:w-auto">
                      {t(`contactUs.sendMessage`)}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-center mb-8">{t(`contactUs.otherWays`)}</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <h4 className="font-heading font-bold mb-2">{t(`contactUs.findPartner`)}</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  {t(`contactUs.findPartnerDescription`)}
                </p>
                <Button variant="outline" size="sm">
                 <Link to="/partners">  {t(`contactUs.viewPartners`)}</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <h4 className="font-heading font-bold mb-2">{t(`contactUs.technicalSupport2`)}</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  {t(`contactUs.supportDescription`)}
                </p>
                <Button
  variant="outline"
  size="sm"
  onClick={() => handleQuickLinkSelect("technical")}
>
  {t(`contactUs.supportPortal`)}
</Button>

              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <h4 className="font-heading font-bold mb-2"> {t(`contactUs.careerOpportunities`)}</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  {t(`contactUs.careerDescription`)}
                </p>
                <Button
  variant="outline"
  size="sm"
  onClick={() => handleQuickLinkSelect("partnership")}
>
  {t(`contactUs.viewCareers`)}
</Button>


              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
