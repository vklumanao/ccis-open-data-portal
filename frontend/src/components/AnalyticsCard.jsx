import { useQuery } from "@tanstack/react-query";
import { searchDatasets, listOrgs, listGroups } from "../api/ckan";
import Loading from "./Loading";

export default function AnalyticsCard() {
  const datasetsQ = useQuery({
    queryKey: ["analytics", "datasetsCount"],
    queryFn: () => searchDatasets({ q: "*:*", rows: 0 }),
  });

  const orgsQ = useQuery({
    queryKey: ["analytics", "orgsCount"],
    queryFn: () => listOrgs(),
  });

  const groupsQ = useQuery({
    queryKey: ["analytics", "groupsCount"],
    queryFn: () => listGroups(),
  });

  if (datasetsQ.isLoading || orgsQ.isLoading || groupsQ.isLoading)
    return (
      <section className="card">
        <h3 style={{ marginTop: 0 }}>Analytics Overview</h3>
        <Loading text="Loading statistics..." />
      </section>
    );

  if (datasetsQ.isError || orgsQ.isError || groupsQ.isError)
    return (
      <section className="card">
        <h3 style={{ marginTop: 0 }}>Analytics Overview</h3>
        <p style={{ color: "var(--error)" }}>Unable to load analytics.</p>
      </section>
    );

  const datasetsCount =
    datasetsQ.data?.result?.count ?? datasetsQ.data?.count ?? 0;
  const orgsCount = Array.isArray(orgsQ.data) ? orgsQ.data.length : 0;
  const groupsCount = Array.isArray(groupsQ.data) ? groupsQ.data.length : 0;

  return (
    <section className="card">
      <h3
        style={{
          marginTop: 0,
          fontSize: "var(--font-size-xl)",
          fontWeight: "var(--font-weight-bold)",
          color: "var(--text-primary)",
          marginBottom: "var(--spacing-xl)",
        }}
      >
        Analytics Overview
      </h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: "var(--spacing-lg)",
        }}
      >
        <StatTile
          label="Datasets"
          value={datasetsCount}
          icon={<Icon name="datasets" />}
        />
        <StatTile
          label="Organizations"
          value={orgsCount}
          icon={<Icon name="organizations" />}
        />
        <StatTile
          label="Categories"
          value={groupsCount}
          icon={<Icon name="categories" />}
        />
      </div>
    </section>
  );
}

function StatTile({ label, value, icon }) {
  return (
    <div
      style={{
        background: "var(--background-alt)",
        border: "1px solid var(--border-light)",
        borderRadius: "var(--radius-lg)",
        padding: "var(--spacing-lg)",
        textAlign: "center",
        transition: "all 0.2s ease",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--primary)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(26, 95, 63, 0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border-light)";
        e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.08)";
      }}
    >
      <div
        style={{
          fontSize: "28px",
          marginBottom: "var(--spacing-md)",
        }}
      >
        {icon}
      </div>
      <div
        style={{
          fontSize: "var(--font-size-sm)",
          color: "var(--text-secondary)",
          fontWeight: "var(--font-weight-medium)",
          marginBottom: "var(--spacing-sm)",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: "32px",
          fontWeight: "var(--font-weight-bold)",
          color: "var(--primary)",
          lineHeight: 1,
        }}
      >
        {value}
      </div>
    </div>
  );
}

function Icon({ name, size = 80 }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
  };

  if (name === "datasets") {
    return (
      <svg {...common} aria-hidden>
        <rect x="3" y="4" width="18" height="4" rx="1" fill="var(--primary)" />
        <rect
          x="3"
          y="10"
          width="18"
          height="4"
          rx="1"
          fill="var(--primary-light)"
        />
        <rect
          x="3"
          y="16"
          width="18"
          height="4"
          rx="1"
          fill="var(--background-alt)"
        />
      </svg>
    );
  }

  if (name === "organizations") {
    return (
      <svg {...common} aria-hidden>
        <path
          d="M12 2C10.34 2 9 3.34 9 5s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm6 14v2H6v-2c0-2.21 3.58-4 6-4s6 1.79 6 4z"
          fill="var(--primary)"
        />
      </svg>
    );
  }

  if (name === "categories") {
    return (
      <svg {...common} aria-hidden>
        <path
          d="M3 6h18v2H3V6zm0 5h10v2H3v-2zm0 5h6v2H3v-2z"
          fill="var(--primary)"
        />
      </svg>
    );
  }

  return null;
}
