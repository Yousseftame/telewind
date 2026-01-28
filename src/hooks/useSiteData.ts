// src/hooks/useSiteData.ts - Custom hooks for all Site pages with improved error handling

import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/services/axiosInstance";
import { SITE_URLS } from "@/services/apiEndpoints";
import { useTranslation } from "react-i18next";

// ✅ Map i18next language codes to API Accept-Language codes
const getApiLanguage = (i18nLang: string): string => {
  const langMap: Record<string, string> = {
    "en": "en",
    "ar": "ar",
    "fr-FR": "fr",
    "de-DE": "de",
  };
  return langMap[i18nLang] || "en";
};

// ========== PRODUCTS ==========
export interface SiteProduct {
  id: number;
  title: string;
  description: string;
  image: string;
  specification_pdf:string;
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
      
      const url = `${SITE_URLS.PRODUCTS}${params.toString() ? `?${params.toString()}` : ''}`;
      console.log('Fetching products from:', url, 'with language:', apiLang);
      
      const response = await axiosInstance.get(url, {
        headers: { "Accept-Language": apiLang },
      });
      
      console.log('Products response:', response.data);
      return response.data.data as SiteProduct[];
    },
    retry: 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
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
      console.log('Fetching industries with language:', apiLang);
      const response = await axiosInstance.get(SITE_URLS.INDUSTRIES, {
        headers: { "Accept-Language": apiLang },
      });
      console.log('Industries response:', response.data);
      return response.data.data as SiteIndustry[];
    },
    staleTime: 5 * 60 * 1000,
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
  video?: string; // ✅ NEW: Added optional video field
}

export function useSiteEvents() {
  const { i18n } = useTranslation();
  const apiLang = getApiLanguage(i18n.language);
  
  return useQuery({
    queryKey: ["site-events", apiLang],
    queryFn: async () => {
      console.log('Fetching events with language:', apiLang);
      const response = await axiosInstance.get(SITE_URLS.EVENTS, {
        headers: { "Accept-Language": apiLang },
      });
      console.log('Events response:', response.data);
      return response.data.data as SiteEvent[];
    },
    staleTime: 5 * 60 * 1000,
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
      console.log('Fetching announcements with language:', apiLang);
      const response = await axiosInstance.get(SITE_URLS.ANNOUNCEMENTS, {
        headers: { "Accept-Language": apiLang },
      });
      console.log('Announcements response:', response.data);
      return response.data.data as SiteAnnouncement[];
    },
    staleTime: 5 * 60 * 1000,
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
      if (!productId) {
        throw new Error("Product ID is required");
      }
      
      const url = `${SITE_URLS.PRODUCTS}/${productId}`;
      console.log('Fetching product detail from:', url);
      console.log('With language:', apiLang);
      
      try {
        const response = await axiosInstance.get(url, {
          headers: { "Accept-Language": apiLang },
        });
        
        console.log('Product detail response:', response.data);
        
        // Check if response has the expected structure
        if (!response.data || !response.data.data) {
          throw new Error("Invalid response structure");
        }
        
        return response.data.data as SiteProductDetail;
      } catch (error: any) {
        console.error('Error fetching product detail:', error);
        
        // Provide more specific error messages
        if (error.response?.status === 404) {
          throw new Error("Product not found");
        } else if (error.response?.status === 500) {
          throw new Error("Server error. Please try again later");
        } else if (!error.response) {
          throw new Error("Network error. Please check your connection");
        }
        
        throw error;
      }
    },
    enabled: !!productId, // Only run query if productId exists
    retry: 1, // Only retry once for product details
    staleTime: 5 * 60 * 1000, // 5 minutes
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
      
      console.log('Fetching partners with language:', apiLang, 'and region:', region);
      const response = await axiosInstance.get(
        `${SITE_URLS.PARTNERS}?${params.toString()}`,
        {
          headers: { "Accept-Language": apiLang },
        }
      );
      console.log('Partners response:', response.data);
      return response.data.data as SitePartner[];
    },
    staleTime: 5 * 60 * 1000,
  });
}