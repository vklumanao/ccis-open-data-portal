import axios from "axios";

// Use Vite proxy
const BASE = import.meta.env.VITE_CKAN_PROXY_BASE || "/ckan-api";

export function getCkanApiKey() {
  return localStorage.getItem("ckanApiKey") || null;
}

export const ckan = axios.create({
  baseURL: BASE,
  timeout: 20000,
});

// Add API key to every request if present
ckan.interceptors.request.use((config) => {
  const apiKey = getCkanApiKey();
  if (apiKey) {
    config.headers["Authorization"] = apiKey;
  }
  return config;
});

export async function ckanAction(action, params = {}) {
  const res = await ckan.get(`/api/3/action/${action}`, { params });
  if (!res.data?.success) {
    throw new Error(res.data?.error?.message || "CKAN API error");
  }
  return res.data.result;
}
