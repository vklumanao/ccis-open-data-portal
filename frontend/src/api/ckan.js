import { ckanAction } from "./ckanClient";

export const statusShow = () => ckanAction("status_show");

export const searchDatasets = (params) => ckanAction("package_search", params);
export const getDataset = (id) => ckanAction("package_show", { id });

export const listOrgs = () =>
  ckanAction("organization_list", { all_fields: true });
export const getOrg = (id) =>
  ckanAction("organization_show", { id, include_datasets: true });

export const listGroups = () => ckanAction("group_list", { all_fields: true });
export const getGroup = (id) =>
  ckanAction("group_show", { id, include_datasets: true });
