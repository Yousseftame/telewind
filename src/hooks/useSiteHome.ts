// src/hooks/useSiteHome.ts - Custom hook for Site Home data

import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/services/axiosInstance";
import { SITE_URLS } from "@/services/apiEndpoints";
import { useTranslation } from "react-i18next";

// ✅ FIXED: Map i18next language codes to API Accept-Language codes
const getApiLanguage = (i18nLang: string): string => {
  const langMap: Record<string, string> = {
    "en": "en",
    "ar": "ar",
    "fr-FR": "fr",  // ✅ Changed from zh-TW → tw to fr-FR → fr
    "de-DE": "de",  // ✅ Changed from zh-CN → ch to de-DE → de
  };
  return langMap[i18nLang] || "en"; // Default to English
};

// ✅ Type definitions based on ACTUAL API structure
// API Response: { id, slug, image, icon, name, description }
export interface HomeCategoryItem {
  id: number;
  name: string;        // ⚠️ API returns "name", not "title"
  description: string;
  image: string;
  icon: string;
  slug: string;
  title: string;
}

export interface HomeIndustryItem {
  id: number;
  title: string;
  description: string;
  icon: string;
  slug: string;
}

export interface HomeCertificateItem {
  id: number;
  title: string;
  image: string;
}

/**
 * Hook to fetch home categories with language support
 */
export function useHomeCategories() {
  const { i18n } = useTranslation();
  const apiLang = getApiLanguage(i18n.language);
  
  return useQuery({
    queryKey: ["home-categories", apiLang],
    queryFn: async () => {
      console.log('Fetching categories with language:', apiLang);
      const response = await axiosInstance.get(SITE_URLS.HOME_CATEGORIES, {
        headers: {
          "Accept-Language": apiLang,
        },
      });
      console.log('Categories response:', response.data);
      return response.data.data as HomeCategoryItem[];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook to fetch home industries with language support
 */
export function useHomeIndustries() {
  const { i18n } = useTranslation();
  const apiLang = getApiLanguage(i18n.language);
  
  return useQuery({
    queryKey: ["home-industries", apiLang],
    queryFn: async () => {
      console.log('Fetching industries with language:', apiLang);
      const response = await axiosInstance.get(SITE_URLS.HOME_INDUSTRIES, {
        headers: {
          "Accept-Language": apiLang,
        },
      });
      console.log('Industries response:', response.data);
      return response.data.data as HomeIndustryItem[];
    },
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook to fetch home certificates with language support
 */
export function useHomeCertificates() {
  const { i18n } = useTranslation();
  const apiLang = getApiLanguage(i18n.language);
  
  return useQuery({
    queryKey: ["home-certificates", apiLang],
    queryFn: async () => {
      console.log('Fetching certificates with language:', apiLang);
      const response = await axiosInstance.get(SITE_URLS.HOME_CERTIFICATES, {
        headers: {
          "Accept-Language": apiLang,
        },
      });
      console.log('Certificates response:', response.data);
      return response.data.data as HomeCertificateItem[];
    },
    staleTime: 5 * 60 * 1000,
  });
}

// -------------------------------------------------------------
// HOME PARTNER LOGOS
// GET /site/partners-logos
// -------------------------------------------------------------
export interface HomePartnerLogoItem {
  id: number;
  logoUrl: string;
  status: number;
  displayOrder: number;
}

/**
 * Hook to fetch partner logos with language support
 */
export function useHomePartnerLogos() {
  const { i18n } = useTranslation();
  const apiLang = getApiLanguage(i18n.language);

  return useQuery({
    queryKey: ["home-partner-logos", apiLang],
    queryFn: async () => {
      console.log('Fetching partner logos with language:', apiLang);
      const response = await axiosInstance.get("/site/partners-logos", {
        headers: {
          "Accept-Language": apiLang,
        },
      });

      let data = response.data.data || [];

      // ✓ only active logos
      data = data.filter((item: any) => item.status === 1);

      // ✓ sort by display order
      data.sort((a: any, b: any) => a.displayOrder - b.displayOrder);

      // ✓ map into typed structure
      return data.map((item: any) => ({
        id: item.id,
        logoUrl: item.logoUrl,
        status: item.status,
        displayOrder: item.displayOrder,
      })) as HomePartnerLogoItem[];
    },
    staleTime: 5 * 60 * 1000,
  });
}