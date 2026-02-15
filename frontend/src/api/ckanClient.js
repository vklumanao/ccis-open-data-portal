import axios from "axios";

// Use Vite proxy
const BASE = import.meta.env.VITE_CKAN_PROXY_BASE || "/ckan-api";

export const ckan = axios.create({
  baseURL: BASE,
  timeout: 20000,
});

export async function ckanAction(action, params = {}) {
  const res = await ckan.get(`/api/3/action/${action}`, { params });
  if (!res.data?.success) {
    throw new Error(res.data?.error?.message || "CKAN API error");
  }
  return res.data.result;
}
