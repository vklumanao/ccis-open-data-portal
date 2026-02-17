import { useQuery } from "@tanstack/react-query";
import { statusShow, searchDatasets } from "../api/ckan";
import DatasetCard from "../components/DatasetCard";
import Loading from "../components/Loading";
import ErrorBox from "../components/ErrorBox";
import AnalyticsCard from "../components/AnalyticsCard";

export default function Home() {
  const statusQ = useQuery({ queryKey: ["status"], queryFn: statusShow });

  const recentQ = useQuery({
    queryKey: ["recent"],
    queryFn: () =>
      searchDatasets({ q: "*:*", rows: 6, sort: "metadata_modified desc" }),
  });

  return (
    <div className="page-grid">
      <section className="card">
        <h1 style={{ marginTop: 0, marginBottom: "var(--spacing-md)" }}>
          Welcome to CCIS Open Data Portal
        </h1>
        <p
          style={{
            fontSize: "var(--font-size-base)",
            color: "var(--text-secondary)",
            lineHeight: 1.8,
            marginBottom: "var(--spacing-lg)",
          }}
        >
          Explore public datasets and resources from the College of Computing in
          Information Sciences. Discover valuable research data, contribute to
          open science, and leverage data-driven insights.
        </p>

        <h3
          style={{
            fontSize: "var(--font-size-lg)",
            fontWeight: "var(--font-weight-semibold)",
            marginTop: "var(--spacing-lg)",
            marginBottom: "var(--spacing-md)",
          }}
        >
          System Status
        </h3>
        {statusQ.isLoading && <Loading text="Checking backend..." />}
        {statusQ.isError && <ErrorBox error={statusQ.error} />}
        {statusQ.data && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--spacing-md)",
              padding: "var(--spacing-md)",
              background: "rgba(39, 174, 96, 0.08)",
              border: "1px solid rgba(39, 174, 96, 0.2)",
              borderRadius: "var(--radius-md)",
            }}
          >
            <span style={{ fontSize: "20px" }}>✓</span>
            <span
              style={{
                color: "var(--success)",
                fontWeight: "var(--font-weight-semibold)",
              }}
            >
              System is operational
            </span>
          </div>
        )}
      </section>

      <AnalyticsCard />

      <section className="card">
        <h2
          style={{
            marginTop: 0,
            marginBottom: "var(--spacing-lg)",
            fontSize: "var(--font-size-2xl)",
            fontWeight: "var(--font-weight-bold)",
          }}
        >
          Recently Updated
        </h2>

        {recentQ.isLoading && <Loading text="Loading datasets..." />}

        {recentQ.isError && <ErrorBox error={recentQ.error} />}

        {recentQ.data && (
          <div className="grid grid-cards">
            {recentQ.data.results?.map((ds) => (
              <DatasetCard key={ds.id} dataset={ds} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
