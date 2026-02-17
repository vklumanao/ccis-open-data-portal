import { useLocation, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getDataset, getOrg, getGroup } from "../api/ckan";
import "../styles/breadcrumbs.css";

export default function Breadcrumbs() {
  const location = useLocation();
  const pathname = location.pathname;

  // Extract dynamic IDs from path
  const datasetIdMatch = pathname.match(/\/dataset\/([^/]+)/);
  const orgIdMatch = pathname.match(/\/orgs\/([^/]+)/);
  const groupIdMatch = pathname.match(/\/groups\/([^/]+)/);

  // Fetch details for dynamic breadcrumbs
  const datasetQuery = useQuery({
    queryKey: ["dataset", datasetIdMatch?.[1]],
    queryFn: () => getDataset(datasetIdMatch?.[1]),
    enabled: !!datasetIdMatch,
  });

  const orgQuery = useQuery({
    queryKey: ["org", orgIdMatch?.[1]],
    queryFn: () => getOrg(orgIdMatch?.[1]),
    enabled: !!orgIdMatch,
  });

  const groupQuery = useQuery({
    queryKey: ["group", groupIdMatch?.[1]],
    queryFn: () => getGroup(groupIdMatch?.[1]),
    enabled: !!groupIdMatch,
  });

  // Build breadcrumbs array
  const getBreadcrumbs = () => {
    const crumbs = [{ label: "Home", path: "/" }];

    if (pathname === "/") {
      return [{ label: "Home", path: "/" }];
    }

    if (pathname === "/datasets" || pathname.includes("/dataset/")) {
      crumbs.push({ label: "Datasets", path: "/datasets" });

      if (pathname.includes("/dataset/")) {
        const name =
          datasetQuery.data?.title || datasetQuery.data?.name || "Loading...";
        crumbs.push({ label: name, path: null });
      }
      return crumbs;
    }

    if (pathname === "/orgs" || pathname.includes("/orgs/")) {
      crumbs.push({ label: "Organizations", path: "/orgs" });

      if (pathname.includes("/orgs/")) {
        const name =
          orgQuery.data?.title || orgQuery.data?.name || "Loading...";
        crumbs.push({ label: name, path: null });
      }
      return crumbs;
    }

    if (pathname === "/groups" || pathname.includes("/groups/")) {
      crumbs.push({ label: "Categories", path: "/groups" });

      if (pathname.includes("/groups/")) {
        const name =
          groupQuery.data?.title || groupQuery.data?.name || "Loading...";
        crumbs.push({ label: name, path: null });
      }
      return crumbs;
    }

    return crumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  if (breadcrumbs.length === 1 && breadcrumbs[0].path === "/") {
    return null; // Don't show breadcrumbs on home page
  }

  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <div className="breadcrumbs-container">
        <ol className="breadcrumbs-list">
          {breadcrumbs.map((crumb, index) => (
            <li key={index} className="breadcrumb-item">
              {crumb.path ? (
                <>
                  <Link to={crumb.path} className="breadcrumb-link">
                    {crumb.label}
                  </Link>
                  {index < breadcrumbs.length - 1 && (
                    <span className="breadcrumb-separator">/</span>
                  )}
                </>
              ) : (
                <>
                  <span className="breadcrumb-current">{crumb.label}</span>
                </>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
