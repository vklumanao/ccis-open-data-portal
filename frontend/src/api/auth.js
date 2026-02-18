import axios from "axios";

const BASE = import.meta.env.VITE_CKAN_PROXY_BASE || "/ckan-api";

// Get current user using API key from localStorage
export async function getCurrentUser() {
  const apiKey = localStorage.getItem("ckanApiKey");
  if (!apiKey) return null;
  try {
    const res = await axios.get(`${BASE}/api/3/action/user_show`, {
      headers: { Authorization: apiKey },
    });
    if (
      res.data &&
      res.data.success &&
      res.data.result &&
      res.data.result.name
    ) {
      return res.data.result;
    }
    throw new Error("Invalid user data");
  } catch (err) {
    // Remove invalid API key if unauthorized
    if (
      err.response &&
      (err.response.status === 401 || err.response.status === 403)
    ) {
      localStorage.removeItem("ckanApiKey");
    }
    throw new Error("Invalid API key or not authorized");
  }
}
