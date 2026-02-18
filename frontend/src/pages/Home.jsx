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
          padding: "6rem var(--spacing-lg) 5rem",
          borderRadius: "1rem",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.12)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ maxWidth: "920px", position: "relative", zIndex: 2 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
            }}
          >
            <h1
              style={{
                marginTop: 0,
                marginBottom: 0,
                fontSize: "3.5rem",
                fontWeight: 700,
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                color: "white",
              }}
            >
              Open Data for Open Research
            </h1>

            <p
              style={{
                fontSize: "1.125rem",
                lineHeight: 1.7,
                marginTop: 0,
                marginBottom: 0,
                opacity: 0.95,
                color: "rgba(255, 255, 255, 0.9)",
                maxWidth: "650px",
                fontWeight: 400,
              }}
            >
              Access curated research datasets from CCIS. Explore comprehensive
              collections, collaborate with peers, and accelerate your research
              with freely available data.
            </p>

            <div
              style={{
                display: "flex",
                gap: "1rem",
                flexWrap: "wrap",
                marginTop: "1.5rem",
              }}
            >
              <Link
                to="/datasets"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0.875rem 2rem",
                  background: "white",
                  color: "var(--primary)",
                  textDecoration: "none",
                  fontWeight: 600,
                  borderRadius: "0.5rem",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  cursor: "pointer",
                  fontSize: "0.95rem",
                  border: "none",
                  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-4px)";
                  e.target.style.boxShadow = "0 16px 32px rgba(0, 0, 0, 0.15)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.1)";
                }}
              >
                Start Exploring →
              </Link>
              <Link
                to="/orgs"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0.875rem 2rem",
                  background: "rgba(255, 255, 255, 0.12)",
                  color: "white",
                  textDecoration: "none",
                  fontWeight: 600,
                  borderRadius: "0.5rem",
                  border: "1.5px solid rgba(255, 255, 255, 0.25)",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  cursor: "pointer",
                  fontSize: "0.95rem",
                  backdropFilter: "blur(12px)",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "rgba(255, 255, 255, 0.22)";
                  e.target.style.borderColor = "rgba(255, 255, 255, 0.4)";
                  e.target.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "rgba(255, 255, 255, 0.12)";
                  e.target.style.borderColor = "rgba(255, 255, 255, 0.25)";
                  e.target.style.transform = "translateY(0)";
                }}
              >
                Browse by Organization
              </Link>
            </div>
          </div>
        </div>

        {/* Modern Decorative background shapes */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "450px",
            height: "450px",
            background:
              "radial-gradient(circle, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 70%)",
            borderRadius: "50%",
            zIndex: 1,
            filter: "blur(50px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            left: "-80px",
            width: "380px",
            height: "380px",
            background:
              "radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 70%)",
            borderRadius: "50%",
            zIndex: 1,
            filter: "blur(50px)",
          }}
        />
      </section>

      {/* System Status & Analytics Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "1.5rem",
          marginTop: "1rem",
        }}
      >
        {/* System Status Card */}
        <div
          className="card"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            borderRadius: "0.75rem",
            border: "1px solid rgba(0, 0, 0, 0.05)",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.06)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 12px 24px rgba(0, 0, 0, 0.1)";
            e.currentTarget.style.transform = "translateY(-4px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.06)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <div>
            <h3
              style={{
                marginTop: 0,
                marginBottom: "1.25rem",
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "var(--text-light)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
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
                  gap: "1rem",
                  padding: "1rem",
                  background: "rgba(39, 174, 96, 0.05)",
                  border: "1px solid rgba(39, 174, 96, 0.15)",
                  borderRadius: "0.5rem",
                }}
              >
                <span
                  style={{
                    fontSize: "24px",
                    lineHeight: 1,
                  }}
                >
                  ✓
                </span>
                <div>
                  <div
                    style={{
                      color: "var(--success)",
                      fontWeight: 600,
                      fontSize: "0.95rem",
                    }}
                  >
                    All Systems
                  </div>
                  <div
                    style={{
                      color: "var(--text-secondary)",
                      fontSize: "0.85rem",
                      marginTop: "0.25rem",
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
              marginBottom: "2rem",
            }}
          >
            <h2
              style={{
                marginTop: 0,
                marginBottom: "0.5rem",
                fontSize: "2rem",
                fontWeight: 700,
                color: "var(--text-primary)",
                letterSpacing: "-0.01em",
              }}
            >
              Featured Collections
            </h2>
            <p
              style={{
                marginTop: 0,
                marginBottom: 0,
                fontSize: "1rem",
                color: "var(--text-secondary)",
                fontWeight: 400,
              }}
            >
              Handpicked datasets with comprehensive resources and detailed
              documentation
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
            marginBottom: "2rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div>
            <h2
              style={{
                marginTop: 0,
                marginBottom: "0.5rem",
                fontSize: "2rem",
                fontWeight: 700,
                color: "var(--text-primary)",
                letterSpacing: "-0.01em",
              }}
            >
              Recently Updated
            </h2>
            <p
              style={{
                marginTop: 0,
                marginBottom: 0,
                fontSize: "1rem",
                color: "var(--text-secondary)",
                fontWeight: 400,
              }}
            >
              Latest additions and updates to keep you informed of new research
              opportunities
            </p>
          </div>

          <Link
            to="/datasets"
            style={{
              fontSize: "0.9rem",
              fontWeight: 600,
              color: "var(--primary-light)",
              textDecoration: "none",
              transition: "all 0.2s ease",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              e.target.style.color = "var(--accent)";
              e.target.style.transform = "translateX(4px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.color = "var(--primary-light)";
              e.target.style.transform = "translateX(0)";
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
          background:
            "linear-gradient(135deg, rgba(0, 0, 0, 0.02) 0%, rgba(0, 0, 0, 0.04) 100%)",
          border: "1px solid rgba(0, 0, 0, 0.08)",
          borderRadius: "1rem",
          padding: "3rem 2rem",
          textAlign: "center",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = "0 12px 32px rgba(0, 0, 0, 0.08)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        <h3
          style={{
            marginTop: 0,
            marginBottom: "0.75rem",
            fontSize: "1.75rem",
            fontWeight: 700,
            color: "var(--text-primary)",
            letterSpacing: "-0.01em",
          }}
        >
          Ready to advance your research?
        </h3>
        <p
          style={{
            marginBottom: "1.75rem",
            fontSize: "1rem",
            color: "var(--text-secondary)",
            fontWeight: 400,
            maxWidth: "600px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Access our full catalog of research datasets, filtered by
          organization, tags, and topics to find exactly what you need.
        </p>
        <Link
          to="/datasets"
          style={{
            display: "inline-block",
            padding: "0.875rem 2rem",
            background: "var(--primary)",
            color: "white",
            textDecoration: "none",
            fontWeight: 600,
            borderRadius: "0.5rem",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "var(--primary-light)";
            e.target.style.transform = "translateY(-4px)";
            e.target.style.boxShadow = "0 16px 32px rgba(0, 0, 0, 0.15)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "var(--primary)";
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.1)";
          }}
        >
          Explore All Datasets
        </Link>
      </section>
    </div>
  );
}
