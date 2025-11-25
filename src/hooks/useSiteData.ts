// src/hooks/useSiteData.ts - Custom hooks for all Site pages

import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/services/axiosInstance";
import { SITE_URLS } from "@/services/apiEndpoints";
import { useTranslation } from "react-i18next";

// ✅ Map i18next language codes to API Accept-Language codes
const getApiLanguage = (i18nLang: string): string => {
  const langMap: Record<string, string> = {
    "en": "en",
    "ar": "ar",
    "zh-TW": "tw",
    "zh-CN": "ch",
  };
  return langMap[i18nLang] || "en";
};

// ========== PRODUCTS ==========
export interface SiteProduct {
  id: number;
  title: string;
  description: string;
  image: string;
  category_id: number;
  category_name?: string;
  key_features: string[];
  supported_bands: string[];
}

export function useSiteProducts(categoryId?: number, searchQuery?: string) {
  const { i18n } = useTranslation();
  const apiLang = getApiLanguage(i18n.language);
  
  return useQuery({
    queryKey: ["site-products", apiLang, categoryId, searchQuery],
    queryFn: async () => {
      const params = new URLSearchParams();
      
      // Only add category parameter if it's not 0 (0 means "all categories")
      if (categoryId && categoryId !== 0) {
        params.append("category", categoryId.toString());
      }
      
      // Add search parameter if provided
      if (searchQuery && searchQuery.trim()) {
        params.append("search", searchQuery.trim());
      }
      
      const response = await axiosInstance.get(
        `${SITE_URLS.PRODUCTS}?${params.toString()}`,
        {
          headers: { "Accept-Language": apiLang },
        }
      );
      return response.data.data as SiteProduct[];
    },
  });
}

// ========== INDUSTRIES ==========
export interface SiteIndustry {
  id: number;
  title: string;
  description: string;
  icon: string;
  slug: string;
  applications: string[];
}

export function useSiteIndustries() {
  const { i18n } = useTranslation();
  const apiLang = getApiLanguage(i18n.language);
  
  return useQuery({
    queryKey: ["site-industries", apiLang],
    queryFn: async () => {
      const response = await axiosInstance.get(SITE_URLS.INDUSTRIES, {
        headers: { "Accept-Language": apiLang },
      });
      return response.data.data as SiteIndustry[];
    },
  });
}

// ========== EVENTS ==========
export interface SiteEvent {
  id: number;
  title: string;
  description: string;
  location: string;
  details: string;
  date: string;
  type: string;
}

export function useSiteEvents() {
  const { i18n } = useTranslation();
  const apiLang = getApiLanguage(i18n.language);
  
  return useQuery({
    queryKey: ["site-events", apiLang],
    queryFn: async () => {
      const response = await axiosInstance.get(SITE_URLS.EVENTS, {
        headers: { "Accept-Language": apiLang },
      });
      return response.data.data as SiteEvent[];
    },
  });
}

// ========== ANNOUNCEMENTS ==========
export interface SiteAnnouncement {
  id: number;
  title: string;
  description: string;
  date: string;
  type: string;
}

export function useSiteAnnouncements() {
  const { i18n } = useTranslation();
  const apiLang = getApiLanguage(i18n.language);
  
  return useQuery({
    queryKey: ["site-announcements", apiLang],
    queryFn: async () => {
      const response = await axiosInstance.get(SITE_URLS.ANNOUNCEMENTS, {
        headers: { "Accept-Language": apiLang },
      });
      return response.data.data as SiteAnnouncement[];
    },
  });
}

// ========== PRODUCT DETAILS ==========
export interface SiteProductDetail {
  id: number;
  title: string;
  description: string;
  image: string;
  category_id: number;
  category_name?: string;
  key_features: string[];
  supported_bands: string[];
}

export function useSiteProductDetail(productId: string | undefined) {
  const { i18n } = useTranslation();
  const apiLang = getApiLanguage(i18n.language);
  
  return useQuery({
    queryKey: ["site-product-detail", apiLang, productId],
    queryFn: async () => {
      if (!productId) throw new Error("Product ID is required");
      
      const response = await axiosInstance.get(
        `${SITE_URLS.PRODUCTS}/${productId}`,
        {
          headers: { "Accept-Language": apiLang },
        }
      );
      return response.data.data as SiteProductDetail;
    },
    enabled: !!productId,
  });
}

// ========== PARTNERS ==========
export interface SitePartner {
  id: number;
  name: string;
  type: string;
  region: string;
  country: string;
  contact: string;
  email: string;
  phone: string;
  website: string;
  focus: string[];
}

export function useSitePartners(region?: string) {
  const { i18n } = useTranslation();
  const apiLang = getApiLanguage(i18n.language);
  
  return useQuery({
    queryKey: ["site-partners", apiLang, region],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (region && region !== "All Regions") {
        params.append("region", region);
      } else {
        params.append("region", "all");
      }
      
      const response = await axiosInstance.get(
        `${SITE_URLS.PARTNERS}?${params.toString()}`,
        {
          headers: { "Accept-Language": apiLang },
        }
      );
      return response.data.data as SitePartner[];
    },
  });
}