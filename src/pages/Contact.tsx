// import { useEffect, useState } from "react";
import { isAxiosError } from "axios";
import { toast } from "@/components/ui/sonner";
import { Link, useSearchParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, MapPin, Clock, Shield } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";

import { axiosInstance } from "@/services/axiosInstance";
import { CONTACT_URLS } from "@/services/apiEndpoints";
import validation from "@/services/validation";
import { FormContactProps } from "@/services/types";
import { useEffect, useState } from "react";

export default function Contact() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const [isOther, setIsOther] = useState(false);

  const {
    register,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm<FormContactProps>({
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      country: "",
      message: "",
      inquiry_type: "",
      inquiry_type_text: "",
    },
  });

  const inquiryType = watch("inquiry_type");

  useEffect(() => {
    setIsOther(inquiryType === "other");
    // Clear inquiry_type_text when switching away from "other"
    if (inquiryType !== "other") {
      setValue("inquiry_type_text", "");
    }
  }, [inquiryType, setValue]);

  // -----------------------------
  // SUBMIT
  // -----------------------------
  const onSubmit = async (data: FormContactProps) => {
    try {
      // Prepare the payload
      const payload = {
        name: data.name,
        email: data.email,
        company: data.company,
        phone: data.phone,
        country: data.country,
        message: data.message,
        inquiry_type: data.inquiry_type,
        inquiry_type_text:
          data.inquiry_type === "other"
            ? data.inquiry_type_text
            : data.inquiry_type,
      };

      await axiosInstance.post(CONTACT_URLS.CREATE_CONTACT, payload);

      toast("Message Sent", {
        description:
          "Thank you for contacting TeleWind. Our team will respond within 24 hours.",
      });

      // Reset form after successful submission
      reset();
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Something went wrong");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  // -----------------------------
  // Scroll to form + pre-fill inquiry from URL
  // -----------------------------
  useEffect(() => {
    const inquiryFromUrl = searchParams.get("inquiry");
    if (inquiryFromUrl) {
      setValue("inquiry_type", inquiryFromUrl);
    }

    const formSection = document.getElementById("contact-form");
    if (formSection) {
      setTimeout(() => formSection.scrollIntoView({ behavior: "smooth" }), 200);
    }
  }, [searchParams, setValue]);

  // -----------------------------
  // Quick Links handler
  // -----------------------------
  const handleQuickLinkSelect = (type: string) => {
    setValue("inquiry_type", type);
    const formSection = document.getElementById("contact-form");
    if (formSection) {
      setTimeout(() => formSection.scrollIntoView({ behavior: "smooth" }), 150);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <h1 className="font-heading text-5xl font-bold mb-4 pt-5">
            {t(`contactUs.title`)}
          </h1>
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
                  <h3 className="font-heading text-xl font-bold mb-6">
                    {t(`contactUs.contactInformation`)}
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-accent mt-1" />
                      <div>
                        <p className="font-semibold text-sm mb-1">
                          {t(`contactUs.headquarters`)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {t(`contactUs.address`)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-accent mt-1" />
                      <div>
                        <p className="font-semibold text-sm mb-1">
                          {t(`contactUs.email`)}
                        </p>
                        <a
                          href="mailto:info@telewind.com.tw"
                          className="text-sm text-accent hover:underline"
                        >
                          info@telewind.com.tw
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-accent mt-1" />
                      <div>
                        <p className="font-semibold text-sm mb-1">
                          {t(`contactUs.businessHours`)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {t(`contactUs.mondayFriday`)} <br />
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
                  <h4 className="font-heading font-bold mb-2">
                    {t(`contactUs.secureCommunications`)}
                  </h4>
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
                  <h3 className="font-heading text-2xl font-bold mb-6">
                    {t(`contactUs.sendUsMessage`)}
                  </h3>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Name */}
                      <div className="space-y-2">
                        <Label htmlFor="name">{t(`contactUs.fullName`)}</Label>
                        <Input
                          id="name"
                          placeholder="John Smith"
                          {...register("name", validation.NAME_VALIDATION)}
                        />
                        {errors.name && (
                          <p className="text-red-500 pt-2 text-xs font-medium">
                            {errors.name.message}
                          </p>
                        )}
                      </div>

                      {/* Company */}
                      <div className="space-y-2">
                        <Label htmlFor="company">
                          {t(`contactUs.company`)}
                        </Label>
                        <Input
                          id="company"
                          placeholder="Defense Organization"
                          {...register("company", {
                            required: "Company is required",
                            minLength: {
                              value: 2,
                              message: "Company must be at least 2 characters",
                            },
                          })}
                        />
                        {errors.company && (
                          <p className="text-red-500 pt-2 text-xs font-medium">
                            {errors.company.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Email */}
                      <div className="space-y-2">
                        <Label htmlFor="email">
                          {t(`contactUs.emailAddress`)}
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@example.com"
                          {...register("email", validation.EMAIL_VALIDATION)}
                        />
                        {errors.email && (
                          <p className="text-red-500 pt-2 text-xs font-medium">
                            {errors.email.message}
                          </p>
                        )}
                      </div>

                      {/* Phone */}
                      <div className="space-y-2">
                        <Label htmlFor="phone">
                          {t(`contactUs.phoneNumber`)}
                        </Label>
                        <Input
                          id="phone"
                          placeholder="+1 555 123 4567"
                          {...register("phone", {
                            required: "Phone number is required",
                            pattern: {
                              value: /^\+?[0-9\s\-()]{7,20}$/,
                              message: "Enter a valid phone number",
                            },
                          })}
                        />
                        {errors.phone && (
                          <p className="text-red-500 pt-2 text-xs font-medium">
                            {errors.phone.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Country */}
                      <div className="space-y-2">
                        <Label htmlFor="country">
                          {t(`contactUs.country`)}
                        </Label>
                        <Input
                          id="country"
                          placeholder="United States"
                          {...register("country", {
                            required: "Country is required",
                          })}
                        />
                        {errors.country && (
                          <p className="text-red-500 pt-2 text-xs font-medium">
                            {errors.country.message}
                          </p>
                        )}
                      </div>

                      {/* Inquiry Type */}
                      <div className="space-y-2">
                        <Label htmlFor="inquiryType">
                          {t(`contactUs.inquiryType`)}
                        </Label>
                        <Select
                          value={watch("inquiry_type")}
                          onValueChange={(v) => setValue("inquiry_type", v)}
                        >
                          <SelectTrigger id="inquiryType">
                            <SelectValue placeholder={t(`contactUs.select`)} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="product">
                              {t(`contactUs.productInformation`)}
                            </SelectItem>
                            <SelectItem value="technical">
                              {t(`contactUs.technicalSupport`)}
                            </SelectItem>
                            <SelectItem value="sales">
                              {t(`contactUs.salesInquiry`)}
                            </SelectItem>
                            <SelectItem value="partnership">
                              {t(`contactUs.partnershipOpportunity`)}
                            </SelectItem>
                            <SelectItem value="other">
                              {t(`contactUs.other`)}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <input
                          type="hidden"
                          {...register("inquiry_type", {
                            required: "Inquiry type is required",
                          })}
                        />
                        {errors.inquiry_type && (
                          <p className="text-red-500 pt-2 text-xs font-medium">
                            {errors.inquiry_type.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Conditional "Other" input */}
                    {isOther && (
                      <div className="space-y-2">
                        <Label htmlFor="inquiry_type_text">
                          {t(`contactUs.specifyOther`)}
                        </Label>
                        <Input
                          id="inquiry_type_text"
                          placeholder="Please specify your inquiry type"
                          {...register("inquiry_type_text", {
                            required: isOther
                              ? "Please specify your inquiry"
                              : false,
                            minLength: isOther
                              ? {
                                  value: 3,
                                  message:
                                    "Please provide more details (at least 3 characters)",
                                }
                              : undefined,
                          })}
                        />
                        {errors.inquiry_type_text && (
                          <p className="text-red-500 pt-2 text-xs font-medium">
                            {errors.inquiry_type_text.message}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Message */}
                    <div className="space-y-2">
                      <Label htmlFor="message">{t(`contactUs.message`)}</Label>
                      <Textarea
                        id="message"
                        rows={6}
                        placeholder="Please provide details..."
                        {...register("message", {
                          required: "Message is required",
                          minLength: {
                            value: 10,
                            message: "Message must be at least 10 characters",
                          },
                        })}
                      />
                      {errors.message && (
                        <p className="text-red-500 pt-2 text-xs font-medium">
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full md:w-auto"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : t(`contactUs.sendMessage`)}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK LINKS */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-center mb-8">
            {t(`contactUs.otherWays`)}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <h4 className="font-heading font-bold mb-2">
                  {t(`contactUs.findPartner`)}
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  {t(`contactUs.findPartnerDescription`)}
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/partners">{t(`contactUs.viewPartners`)}</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <h4 className="font-heading font-bold mb-2">
                  {t(`contactUs.technicalSupport2`)}
                </h4>
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
                <h4 className="font-heading font-bold mb-2">
                  {t(`contactUs.careerOpportunities`)}
                </h4>
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
