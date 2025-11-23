export const baseURL: string = "http://172.104.234.172/api"; // Updated base URL based on Postman

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