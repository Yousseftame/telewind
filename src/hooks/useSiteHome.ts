// src/hooks/useSiteHome.ts - Custom hook for Site Home data

import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/services/axiosInstance";
import { SITE_URLS } from "@/services/apiEndpoints";
import { useTranslation } from "react-i18next";

// ✅ Map i18next language codes to API Accept-Language codes
const getApiLanguage = (i18nLang: string): string => {
  const langMap: Record<string, string> = {
    "en": "en",
    "ar": "ar",
    "zh-TW": "tw",  // Traditional Chinese → tw
    "zh-CN": "ch",  // Simplified Chinese → ch
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
      const response = await axiosInstance.get(SITE_URLS.HOME_INDUSTRIES, {
        headers: {
          "Accept-Language": apiLang,
        },
      });
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
      const response = await axiosInstance.get(SITE_URLS.HOME_CERTIFICATES, {
        headers: {
          "Accept-Language": apiLang,
        },
      });
      return response.data.data as HomeCertificateItem[];
    },
    staleTime: 5 * 60 * 1000,
  });
}