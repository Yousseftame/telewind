// src/utils/formDataHelpers.ts

/**
 * Helper to build FormData for multi-language entities with images
 */
export function buildMultiLangFormData(
  data: any,
  languages: string[] = ["en", "ar", "tw","ch"]
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
      formData.append(
        `translations[${index}][title]`,
        data.translations[lang].title || ""
      );
      formData.append(
        `translations[${index}][description]`,
        data.translations[lang].description || ""
      );
    }
  });

  return formData;
}

/**
 * Helper to build FormData for events with all fields
 */
export function buildEventFormData(
  data: any,
  languages: string[] = ["en", "ar", "tw" , "ch"]
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
      formData.append(
        `translations[${index}][title]`,
        data.translations[lang].title || ""
      );
      formData.append(
        `translations[${index}][description]`,
        data.translations[lang].description || ""
      );
      formData.append(
        `translations[${index}][location]`,
        data.translations[lang].location || ""
      );
      formData.append(
        `translations[${index}][details]`,
        data.translations[lang].details || ""
      );
    }
  });

  return formData;
}

/**
 * Helper to build FormData for certifications (image + title only)
 */
export function buildCertFormData(
  data: any,
  languages: string[] = ["en", "ar", "tw", "ch"]
): FormData {
  const formData = new FormData();

  // Handle image
  if (data.image) {
    formData.append("image", data.image);
  } else if (data.removeImage) {
    formData.append("remove_image", "1");
  }

  // Handle translations (only title)
  languages.forEach((lang, index) => {
    const translation = data.translations?.[lang] || {
      title: "",
      description: "",
    };
    formData.append(`translations[${index}][locale]`, lang);
    formData.append(`translations[${index}][title]`, translation.title);
    formData.append(
      `translations[${index}][description]`,
      translation.description
    );
  });

  return formData;
}

/**
 * Helper to build FormData for announcements (date, type, title, description)
 */
export function buildAnnouncementFormData(
  data: any,
  languages: string[] = ["en", "ar", "tw" , "ch"]
): FormData {
  const formData = new FormData();

  // Handle basic fields
  if (data.date) {
    formData.append("date", data.date);
  }
  if (data.type) {
    formData.append("type", data.type);
  }

  // Handle translations (title and description)
  languages.forEach((lang, index) => {
    if (data.translations?.[lang]) {
      formData.append(`translations[${index}][locale]`, lang);
      formData.append(
        `translations[${index}][title]`,
        data.translations[lang].title || ""
      );
      formData.append(
        `translations[${index}][description]`,
        data.translations[lang].description || ""
      );
    }
  });

  return formData;
}

/**
 * Helper to build FormData for partners
 * FIXED: Changed default languages from ["en", "ar", "tw"] to ["en", "ar", "fr"]
 */
export function buildPartnerFormData(
  data: any,
  languages: string[] = ["en", "ar", "fr"] // 👈 FIXED: "tw" → "fr"
): FormData {
  const formData = new FormData();

  // Handle basic fields (including region)
  if (data.email) {
    formData.append("email", data.email);
  }
  if (data.type) {
    formData.append("type", data.type);
  }
  if (data.region !== undefined && data.region !== null) {
    formData.append("region", data.region);
  }
  if (data.phone) {
    formData.append("phone", data.phone);
  }
  if (data.website) {
    formData.append("website", data.website);
  }

  // Handle translations (WITHOUT region)
  languages.forEach((lang, index) => {
    if (data.translations?.[lang]) {
      const trans = data.translations[lang];
      formData.append(`translations[${index}][locale]`, lang);
      formData.append(`translations[${index}][name]`, trans.name || "");
      formData.append(`translations[${index}][country]`, trans.country || "");
      formData.append(`translations[${index}][contact]`, trans.contact || "");

      // Handle focus array
      if (trans.focus && Array.isArray(trans.focus)) {
        trans.focus.forEach((focusItem: string, focusIndex: number) => {
          formData.append(
            `translations[${index}][focus][${focusIndex}]`,
            focusItem
          );
        });
      }
    }
  });

  return formData;
}

export function buildIndustryFormData(
  data: any,
  languages: string[] = ["en", "ar", "tw", "ch"]
): FormData {
  const formData = new FormData();

  // Handle icon image
  if (data.icon) {
    formData.append("icon", data.icon);
  } else if (data.removeIcon) {
    formData.append("remove_icon", "1");
  }

  // Handle translations
  languages.forEach((lang, index) => {
    if (data.translations?.[lang]) {
      const trans = data.translations[lang];
      formData.append(`translations[${index}][locale]`, lang);
      formData.append(`translations[${index}][title]`, trans.title || "");
      formData.append(
        `translations[${index}][description]`,
        trans.description || ""
      );

      // Handle applications array
      if (trans.applications && Array.isArray(trans.applications)) {
        trans.applications.forEach((app: string, appIndex: number) => {
          formData.append(
            `translations[${index}][applications][${appIndex}]`,
            app
          );
        });
      }
    }
  });

  return formData;
}

/**
 * Helper to build FormData for Product
 */
export function buildProductFormData(
  data: any,
  languages: string[] = ["en", "ar", "tw", "ch"]
): FormData {
  const formData = new FormData();

  // Handle category_id
  if (data.category_id) {
    formData.append("category_id", data.category_id.toString());
  }

  // Handle supported bands
  if (Array.isArray(data.supported_bands)) {
    data.supported_bands.forEach((band: string, index: number) => {
      formData.append(`supported_bands[${index}]`, band);
    });
  }

  // Handle translations
  languages.forEach((lang, index) => {
    const trans = data.translations?.[lang];
    if (trans) {
      formData.append(`translations[${index}][locale]`, lang);
      formData.append(`translations[${index}][title]`, trans.title || "");
      formData.append(
        `translations[${index}][description]`,
        trans.description || ""
      );

      // Handle key_features[]
      if (Array.isArray(trans.key_features)) {
        trans.key_features.forEach((feat: string, featIndex: number) => {
          formData.append(
            `translations[${index}][key_features][${featIndex}]`,
            feat
          );
        });
      }
    }
  });

  // Handle image (only if it's a File)
  if (data.image instanceof File) {
    formData.append("image", data.image);
  }

  return formData;
}

/**
 * Helper to extract translation for a specific language
 */
export function getTranslation<
  T extends { translations?: Array<{ locale: string; [key: string]: any }> }
>(item: T, locale: string) {
  if (!item.translations || item.translations.length === 0) {
    return {
      locale,
      title: "",
      description: "",
      location: "",
      details: "",
      name: "",
      country: "",
      contact: "",
      focus: [] as string[],
    };
  }
  return (
    item.translations.find((t) => t.locale === locale) || item.translations[0]
  );
}
