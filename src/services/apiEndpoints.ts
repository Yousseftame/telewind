export const baseURL: string = "https://telewind.org:9000/api"; // Updated base URL based on Postman

export const ADMIN_URL = {
  LOGIN: "/login",
  GET_CURRENT_USER: "/Users/currentUser", // Get current user
};

export const CATE_URLS = {
  GET_ALL_CATE: "/admin/categories",
  GET_CATE: (id: number) => `/admin/categories/${id}`,
  DELETE_CATE: (id: number) => `/admin/categories/${id}`,
  CREATE_CATE: "/admin/categories",
  UPDATE_CATE: (id: number) => `/admin/categories/${id}`,
};

export const EVENT_URLS = {
  GET_ALL_EVENT: "/admin/events",
  GET_EVENT: (id: number) => `/admin/events/${id}`,
  DELETE_EVENT: (id: number) => `/admin/events/${id}`,
  CREATE_EVENT: "/admin/events",
  UPDATE_EVENT: (id: number) => `/admin/events/${id}`,
};

export const CERT_URLS = {
  GET_ALL_CERT: "/admin/certificates",
  GET_CERT: (id: number) => `/admin/certificates/${id}`,
  DELETE_CERT: (id: number) => `/admin/certificates/${id}`,
  CREATE_CERT: "/admin/certificates",
  UPDATE_CERT: (id: number) => `/admin/certificates/${id}`,
};

export const ANNOUNCEMENT_URLS = {
  GET_ALL_ANNOUNCEMENT: "/admin/announcements",
  GET_ANNOUNCEMENT: (id: number) => `/admin/announcements/${id}`,
  DELETE_ANNOUNCEMENT: (id: number) => `/admin/announcements/${id}`,
  CREATE_ANNOUNCEMENT: "/admin/announcements",
  UPDATE_ANNOUNCEMENT: (id: number) => `/admin/announcements/${id}`,
};

export const PARTNER_URLS = {
  GET_ALL_PARTNER: "/admin/partners",
  GET_PARTNER: (id: number) => `/admin/partners/${id}`,
  DELETE_PARTNER: (id: number) => `/admin/partners/${id}`,
  CREATE_PARTNER: "/admin/partners",
  UPDATE_PARTNER: (id: number) => `/admin/partners/${id}`,
};

export const PRODUCT_URLS = {
  GET_ALL_PRODUCT: "/admin/products",
  GET_PRODUCT: (id: number) => `/admin/products/${id}`,
  DELETE_PRODUCT: (id: number) => `/admin/products/${id}`,
  CREATE_PRODUCT: "/admin/products",
  UPDATE_PRODUCT: (id: number) => `/admin/products/${id}`,
};

export const INDUSTRY_URLS = {
  GET_ALL_INDUSTRY: "/admin/industries",
  GET_INDUSTRY: (id: number) => `/admin/industries/${id}`,
  DELETE_INDUSTRY: (id: number) => `/admin/industries/${id}`,
  CREATE_INDUSTRY: "/admin/industries",
  UPDATE_INDUSTRY: (id: number) => `/admin/industries/${id}`,
};

export const SITE_URLS = {
  HOME_CATEGORIES: "/site/home/categories",
  HOME_INDUSTRIES: "/site/home/industries",
  HOME_CERTIFICATES: "/site/home/certificates",
  PRODUCTS: "/site/products",
  INDUSTRIES: "/site/industries",
  EVENTS: "/site/events",
  ANNOUNCEMENTS: "/site/announcements",
  PARTNERS: "/site/partners",
};

export const LOGO_URLS = {
  GET_ALL_LOGO: "/admin/partners-logos",
  GET_LOGO: (id: number) => `/admin/partners-logos/${id}`,
  DELETE_LOGO: (id: number) => `/admin/partners-logos/${id}`,
  CREATE_LOGO: "/admin/partners-logos",
  UPDATE_LOGO: (id: number) => `/admin/partners-logos/${id}`,
};

//contact
export const CONTACT_URLS = {
  CREATE_CONTACT: "/site/contact-us",

  GET_ALL_CONTACT: "/admin/contacts",
  GET_CONTACT: (id: number) => `/admin/contacts/${id}`,
  DELETE_CONTACT: (id: number) => `/admin/contacts/${id}`,
};