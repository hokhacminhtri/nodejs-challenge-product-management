import axios from "axios";

const API_URL = "http://localhost:3000";

export const fetchProducts = (page, limit) =>
  axios.get(`${API_URL}/products?page=${page}&limit=${limit}`);
export const addProduct = (product, token) =>
  axios.post(`${API_URL}/products`, product, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const searchProducts = (query) =>
  axios.get(`${API_URL}/products/search?q=${query}`);
export const likeProduct = (id, token) =>
  axios.post(
    `${API_URL}/products/${id}/like`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
export const unlikeProduct = (id, token) =>
  axios.post(
    `${API_URL}/products/${id}/unlike`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
export const login = (credentials) =>
  axios.post(`${API_URL}/auth/login`, credentials);
