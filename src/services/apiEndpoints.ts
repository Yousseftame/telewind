export const baseURL: string = "http://192.168.8.33:8000/api"; // Updated base URL based on Postman

export const ADMIN_URL = {
  LOGIN: "/login",
  GET_CURRENT_USER: "/Users/currentUser", // Get current user
};

export const CATE_URLS = {
  GET_ALL_CATE: "/admin/categories",
  DELETE_CATE: (id: number) => `/admin/categories/${id}`,
  CREATE_CATE: "/admin/categories",
  UPDATE_CATE: (id: number) => `/admin/categories/${id}`,
};