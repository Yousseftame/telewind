// src/components/LanguageSwitcher.tsx - UPDATED with query invalidation

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "@tanstack/react-query";
import { Globe, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// ✅ Map i18next language codes to API Accept-Language codes
const languages = [
  { code: "en", name: "English", flag: "🇬🇧", apiCode: "en" },
  { code: "fr-FR", name: "Français", flag: "🇫🇷", apiCode: "fr" },
  { code: "de-DE", name: "Deutsch", flag: "🇩🇪", apiCode: "de" },
  { code: "ar", name: "العربية", flag: "🇸🇦", dir: "rtl", apiCode: "ar" },

  // { code: "zh-TW", name: "繁體中文", flag: "🇹🇼", apiCode: "tw" },
  // { code: "zh-CN", name: "简体中文", flag: "🇨🇳", apiCode: "ch" },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const currentLanguage = languages.find((lang) => lang.code === i18n.language) || languages[0];

  const changeLanguage = (langCode: string) => {
    // Change i18next language
    i18n.changeLanguage(langCode);
    
    // Update document direction for RTL languages
    const selectedLang = languages.find((lang) => lang.code === langCode);
    document.documentElement.dir = selectedLang?.dir || "ltr";
    document.documentElement.lang = langCode;
    
    // ✅ CRITICAL: Invalidate all queries that depend on language
    // This will trigger re-fetch with new Accept-Language header
    queryClient.invalidateQueries({ queryKey: ["home-categories"] });
    queryClient.invalidateQueries({ queryKey: ["home-industries"] });
    queryClient.invalidateQueries({ queryKey: ["home-certificates"] });
    
    setOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-1.5"
        >
          <Globe size={18} className="text-slate-600" />
          <span className="hidden md:inline font-medium">
            {currentLanguage.flag} {currentLanguage.name}
          </span>
          <span className="md:hidden text-lg">{currentLanguage.flag}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-52">
        {languages.map((language) => {
          const isActive = i18n.language === language.code;
          
          return (
            <DropdownMenuItem
              key={language.code}
              onClick={() => changeLanguage(language.code)}
              className={cn(
                "flex items-center justify-between cursor-pointer px-3 py-2.5",
                isActive && "bg-slate-50"
              )}
            >
              <span className="flex items-center gap-2.5">
                <span className="text-lg">{language.flag}</span>
                <span className={cn(
                  "font-medium",
                  isActive && "text-slate-900"
                )}>
                  {language.name}
                </span>
              </span>
              
              {isActive && (
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#192B5E]  flex items-center justify-center">
                  <Check size={12} className="text-white " />
                </div>
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}