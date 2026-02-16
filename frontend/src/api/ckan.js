import { ckanAction } from "./ckanClient";

const CKAN_URL = import.meta.env.VITE_CKAN_URL;

export const statusShow = () => ckanAction("status_show");

export const searchDatasets = (params) => ckanAction("package_search", params);

export const getDataset = (id) => ckanAction("package_show", { id });

export async function listOrgs() {
  const res = await fetch(
    `${CKAN_URL}/api/3/action/organization_list?all_fields=true`,
  );
  const json = await res.json();

  if (!json.success) {
    throw new Error(json.error?.message || "Failed to load organizations");
  }

  return json.result;
}

export const getOrg = (id) =>
  ckanAction("organization_show", { id, include_datasets: true });

export const listGroups = () => ckanAction("group_list", { all_fields: true });

export const getGroup = (id) =>
  ckanAction("group_show", { id, include_datasets: true });
