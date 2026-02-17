import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
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

  const featuredQ = useQuery({
    queryKey: ["featured"],
    queryFn: () =>
      searchDatasets({ q: "*:*", rows: 3, sort: "num_resources desc" }),
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-3xl)",
      }}
    >
      {/* Hero Section */}
      <section
        style={{
          background:
            "linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)",
          color: "white",
          padding: "var(--spacing-3xl) var(--spacing-lg)",
          borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-lg)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ maxWidth: "800px", position: "relative", zIndex: 2 }}>
          <h1
            style={{
              marginTop: 0,
              marginBottom: "var(--spacing-lg)",
              fontSize: "42px",
              fontWeight: "var(--font-weight-bold)",
              lineHeight: 1.2,
            }}
          >
            Discover CCIS Data
          </h1>

          <p
            style={{
              fontSize: "var(--font-size-lg)",
              lineHeight: 1.8,
              marginBottom: "var(--spacing-xl)",
              opacity: 0.95,
              color: "rgba(0, 0, 0, 0.9)",
            }}
          >
            Access publicly available research datasets and resources from the
            College of Computing in Information Sciences. Explore, analyze, and
            contribute to open science.
          </p>

          <div
            style={{
              display: "flex",
              gap: "var(--spacing-lg)",
              flexWrap: "wrap",
            }}
          >
            <Link
              to="/datasets"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "var(--spacing-md) var(--spacing-xl)",
                background: "white",
                color: "var(--primary)",
                textDecoration: "none",
                fontWeight: "var(--font-weight-bold)",
                borderRadius: "var(--radius-md)",
                transition: "all 0.2s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "var(--shadow-md)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "none";
              }}
            >
              Browse Datasets →
            </Link>
            <Link
              to="/orgs"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "var(--spacing-md) var(--spacing-xl)",
                background: "rgba(255, 255, 255, 0.2)",
                color: "white",
                textDecoration: "none",
                fontWeight: "var(--font-weight-bold)",
                borderRadius: "var(--radius-md)",
                border: "2px solid rgba(255, 255, 255, 0.4)",
                transition: "all 0.2s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "rgba(255, 255, 255, 0.3)";
                e.target.style.borderColor = "white";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "rgba(255, 255, 255, 0.2)";
                e.target.style.borderColor = "rgba(255, 255, 255, 0.4)";
              }}
            >
              Explore Organizations
            </Link>
          </div>
        </div>

        {/* Decorative background shape */}
        <div
          style={{
            position: "absolute",
            bottom: "-40px",
            right: "-60px",
            width: "300px",
            height: "300px",
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: "50%",
            zIndex: 1,
          }}
        />
      </section>

      {/* System Status & Analytics Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "var(--spacing-xl)",
        }}
      >
        {/* System Status Card */}
        <div
          className="card"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h3
              style={{
                marginTop: 0,
                marginBottom: "var(--spacing-md)",
                fontSize: "var(--font-size-base)",
                fontWeight: "var(--font-weight-bold)",
                color: "var(--text-light)",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
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
                  padding: "var(--spacing-lg)",
                  background: "rgba(39, 174, 96, 0.08)",
                  border: "1px solid rgba(39, 174, 96, 0.2)",
                  borderRadius: "var(--radius-md)",
                }}
              >
                <span
                  style={{
                    fontSize: "28px",
                    lineHeight: 1,
                  }}
                >
                  ✓
                </span>
                <div>
                  <div
                    style={{
                      color: "var(--success)",
                      fontWeight: "var(--font-weight-bold)",
                      fontSize: "var(--font-size-base)",
                    }}
                  >
                    All Systems
                  </div>
                  <div
                    style={{
                      color: "var(--text-secondary)",
                      fontSize: "var(--font-size-sm)",
                    }}
                  >
                    Operational
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Analytics Card */}
        <AnalyticsCard />
      </div>

      {/* Featured Datasets Section */}
      {featuredQ.data?.results && featuredQ.data.results.length > 0 && (
        <section>
          <div
            style={{
              marginBottom: "var(--spacing-lg)",
            }}
          >
            <h2
              style={{
                marginTop: 0,
                marginBottom: "var(--spacing-sm)",
                fontSize: "var(--font-size-2xl)",
                fontWeight: "var(--font-weight-bold)",
                color: "var(--text-primary)",
              }}
            >
              Featured Datasets
            </h2>
            <p
              style={{
                marginTop: 0,
                marginBottom: 0,
                fontSize: "var(--font-size-base)",
                color: "var(--text-secondary)",
              }}
            >
              Most comprehensive datasets with rich resources
            </p>
          </div>

          <div className="grid grid-cards">
            {featuredQ.data.results.slice(0, 3).map((ds) => (
              <DatasetCard key={ds.id} dataset={ds} />
            ))}
          </div>
        </section>
      )}

      {/* Recently Updated Section */}
      <section>
        <div
          style={{
            marginBottom: "var(--spacing-lg)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            flexWrap: "wrap",
            gap: "var(--spacing-md)",
          }}
        >
          <div>
            <h2
              style={{
                marginTop: 0,
                marginBottom: "var(--spacing-sm)",
                fontSize: "var(--font-size-2xl)",
                fontWeight: "var(--font-weight-bold)",
                color: "var(--text-primary)",
              }}
            >
              Recently Updated
            </h2>
            <p
              style={{
                marginTop: 0,
                marginBottom: 0,
                fontSize: "var(--font-size-base)",
                color: "var(--text-secondary)",
              }}
            >
              Latest changes and additions to our collection
            </p>
          </div>

          <Link
            to="/datasets"
            style={{
              fontSize: "var(--font-size-sm)",
              fontWeight: "var(--font-weight-semibold)",
              color: "var(--primary-light)",
              textDecoration: "none",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.color = "var(--accent)";
            }}
            onMouseLeave={(e) => {
              e.target.style.color = "var(--primary-light)";
            }}
          >
            View All →
          </Link>
        </div>

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

      {/* CTA Section */}
      <section
        style={{
          background: "var(--background-alt)",
          border: "2px solid var(--primary)",
          borderRadius: "var(--radius-lg)",
          padding: "var(--spacing-2xl) var(--spacing-lg)",
          textAlign: "center",
        }}
      >
        <h3
          style={{
            marginTop: 0,
            marginBottom: "var(--spacing-md)",
            fontSize: "var(--font-size-xl)",
            fontWeight: "var(--font-weight-bold)",
            color: "var(--text-primary)",
          }}
        >
          Ready to explore?
        </h3>
        <p
          style={{
            marginBottom: "var(--spacing-lg)",
            fontSize: "var(--font-size-base)",
            color: "var(--text-secondary)",
          }}
        >
          Browse our complete collection of datasets, organize by categories,
          organizations, and more.
        </p>
        <Link
          to="/datasets"
          style={{
            display: "inline-block",
            padding: "var(--spacing-md) var(--spacing-xl)",
            background: "var(--primary)",
            color: "white",
            textDecoration: "none",
            fontWeight: "var(--font-weight-bold)",
            borderRadius: "var(--radius-md)",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "var(--primary-light)";
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "var(--shadow-md)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "var(--primary)";
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "none";
          }}
        >
          Browse All Datasets
        </Link>
      </section>
    </div>
  );
}
