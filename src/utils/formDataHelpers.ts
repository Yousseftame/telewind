/**
 * Helper to build FormData for multi-language entities with images
 */
export function buildMultiLangFormData(
  data: any,
  languages: string[] = ["en", "ar", "tw"]
): FormData {
  const formData = new FormData();

  // Handle image
  if (data.image) {
    formData.append("image", data.image);
  } else if (data.removeImage) {
    formData.append("remove_image", "1");
  }

  // Handle icon (if exists)
  if (data.icon) {
    formData.append("icon", data.icon);
  } else if (data.removeIcon) {
    formData.append("remove_icon", "1");
  }

  // Handle translations
  languages.forEach((lang, index) => {
    if (data.translations?.[lang]) {
      formData.append(`translations[${index}][locale]`, lang);
      formData.append(`translations[${index}][title]`, data.translations[lang].title || "");
      formData.append(`translations[${index}][description]`, data.translations[lang].description || "");
    }
  });

  return formData;
}

/**
 * Helper to build FormData for events with all fields
 */
export function buildEventFormData(
  data: any,
  languages: string[] = ["en", "ar", "tw"]
): FormData {
  const formData = new FormData();

  // Handle basic fields
  if (data.date) {
    formData.append("date", data.date);
  }
  if (data.type) {
    formData.append("type", data.type);
  }

  // Handle translations with all fields
  languages.forEach((lang, index) => {
    if (data.translations?.[lang]) {
      formData.append(`translations[${index}][locale]`, lang);
      formData.append(`translations[${index}][title]`, data.translations[lang].title || "");
      formData.append(`translations[${index}][description]`, data.translations[lang].description || "");
      formData.append(`translations[${index}][location]`, data.translations[lang].location || "");
      formData.append(`translations[${index}][details]`, data.translations[lang].details || "");
    }
  });

  return formData;
}

/**
 * Helper to extract translation for a specific language
 */
export function getTranslation<T extends { translations?: Array<{ locale: string; [key: string]: any }> }>(
  item: T,
  locale: string
) {
  if (!item.translations || item.translations.length === 0) {
    return { locale, title: "", description: "", location: "", details: "" };
  }
  return item.translations.find((t) => t.locale === locale) || item.translations[0];
}
