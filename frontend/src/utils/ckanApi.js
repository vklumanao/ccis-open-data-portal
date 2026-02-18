export async function ckanRequest(action, data = {}, token) {
  const base = import.meta.env.VITE_CKAN_BASE_URL || "/ckan-api";
  const url = `${base}/api/3/action/${action}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token.startsWith("Bearer ") ? token : `Bearer ${token}`,
      Accept: "application/json, text/plain, */*",
    },
    body: JSON.stringify(data),
  });
  // Defensive: check for empty response
  const text = await res.text();
  if (!text) {
    // Try to provide more info
    throw new Error(
      `Empty response from CKAN API. Status: ${res.status} ${res.statusText}`,
    );
  }
  let json;
  try {
    json = JSON.parse(text);
  } catch (e) {
    throw new Error(
      `Invalid JSON response from CKAN API. Status: ${res.status} ${res.statusText}`,
    );
  }
  if (!json.success) {
    throw new Error(json.error?.message || "CKAN API error");
  }
  return json.result;
}
