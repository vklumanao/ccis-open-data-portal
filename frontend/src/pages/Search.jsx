import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { listOrgs, listGroups, searchDatasets } from "../api/ckan";
import DatasetCard from "../components/DatasetCard";
import Pagination from "../components/Pagination";
import Loading from "../components/Loading";
import ErrorBox from "../components/ErrorBox";

function normalizeList(data) {
  // Handles:
  // 1) [ ... ]
  // 2) { result: [ ... ] }
  // 3) { success: true, result: [ ... ] }
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.result)) return data.result;
  return [];
}

export default function Search() {
  const [q, setQ] = useState("");
  const [org, setOrg] = useState("");
  const [group, setGroup] = useState("");
  const [tag, setTag] = useState("");
  const [format, setFormat] = useState("");
  const [sort, setSort] = useState("metadata_modified desc");

  const [page, setPage] = useState(1);
  const pageSize = 20;

  const orgsQ = useQuery({ queryKey: ["orgs"], queryFn: listOrgs });
  const groupsQ = useQuery({ queryKey: ["groups"], queryFn: listGroups });

  const fq = useMemo(() => {
    const filters = [];
    if (org) filters.push(`organization:"${org}"`);
    if (group) filters.push(`groups:"${group}"`);
    if (tag) filters.push(`tags:"${tag}"`);
    if (format) filters.push(`res_format:"${format}"`);
    return filters.length ? filters.join(" ") : undefined;
  }, [org, group, tag, format]);

  const datasetsQ = useQuery({
    queryKey: ["datasets", q, fq, sort, page],
    queryFn: () =>
      searchDatasets({
        q: q.trim() ? q.trim() : "*:*",
        fq,
        sort,
        rows: pageSize,
        start: (page - 1) * pageSize,
      }),
    keepPreviousData: true,
  });

  const total = datasetsQ.data?.count ?? 0;

  // Reset to page 1 when filters/search change
  function onApply() {
    setPage(1);
  }

  return (
    <div className="page-grid">
      <div>
        <h1
          style={{
            marginTop: 0,
            marginBottom: "var(--spacing-lg)",
            fontSize: "var(--font-size-3xl)",
            color: "var(--text-primary)",
          }}
        >
          Browse Datasets
        </h1>

        <div className="card" style={{ marginBottom: "var(--spacing-lg)" }}>
          <h3
            style={{
              marginTop: 0,
              marginBottom: "var(--spacing-lg)",
              fontSize: "var(--font-size-lg)",
              fontWeight: "var(--font-weight-bold)",
              color: "var(--text-primary)",
            }}
          >
            Search & Filter
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "var(--spacing-lg)",
              marginBottom: "var(--spacing-lg)",
            }}
          >
            <div>
              <label
                style={{
                  fontSize: "var(--font-size-xs)",
                  fontWeight: "var(--font-weight-semibold)",
                  color: "var(--text-light)",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  display: "block",
                  marginBottom: "var(--spacing-sm)",
                }}
              >
                Search
              </label>
              <input
                className="input"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onBlur={onApply}
                placeholder="Search title, description..."
                style={{
                  width: "100%",
                  padding: "var(--spacing-md) var(--spacing-lg)",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border)",
                  fontSize: "var(--font-size-base)",
                }}
              />
            </div>

            <div>
              <label
                style={{
                  fontSize: "var(--font-size-xs)",
                  fontWeight: "var(--font-weight-semibold)",
                  color: "var(--text-light)",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  display: "block",
                  marginBottom: "var(--spacing-sm)",
                }}
              >
                Organization
              </label>
              <select
                className="input"
                value={org}
                onChange={(e) => {
                  setOrg(e.target.value);
                  onApply();
                }}
                style={{
                  width: "100%",
                  padding: "var(--spacing-md) var(--spacing-lg)",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border)",
                  fontSize: "var(--font-size-base)",
                }}
              >
                <option value="">All Organizations</option>
                {normalizeList(orgsQ.data).map((o) => (
                  <option key={o.id} value={o.name}>
                    {o.title || o.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                style={{
                  fontSize: "var(--font-size-xs)",
                  fontWeight: "var(--font-weight-semibold)",
                  color: "var(--text-light)",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  display: "block",
                  marginBottom: "var(--spacing-sm)",
                }}
              >
                Category
              </label>
              <select
                className="input"
                value={group}
                onChange={(e) => {
                  setGroup(e.target.value);
                  onApply();
                }}
                style={{
                  width: "100%",
                  padding: "var(--spacing-md) var(--spacing-lg)",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border)",
                  fontSize: "var(--font-size-base)",
                }}
              >
                <option value="">All Categories</option>
                {normalizeList(groupsQ.data).map((g) => (
                  <option key={g.id} value={g.name}>
                    {g.title || g.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                style={{
                  fontSize: "var(--font-size-xs)",
                  fontWeight: "var(--font-weight-semibold)",
                  color: "var(--text-light)",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  display: "block",
                  marginBottom: "var(--spacing-sm)",
                }}
              >
                Sort By
              </label>
              <select
                className="input"
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                  onApply();
                }}
                style={{
                  width: "100%",
                  padding: "var(--spacing-md) var(--spacing-lg)",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border)",
                  fontSize: "var(--font-size-base)",
                }}
              >
                <option value="metadata_modified desc">
                  Most Recently Updated
                </option>
                <option value="metadata_created desc">
                  Most Recently Created
                </option>
                <option value="title asc">Title (A-Z)</option>
              </select>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: "var(--spacing-md)",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                fontSize: "var(--font-size-base)",
                color: "var(--text-secondary)",
                fontWeight: "var(--font-weight-medium)",
              }}
            >
              {total} dataset{total !== 1 ? "s" : ""} found
            </div>
            <button
              onClick={onApply}
              style={{
                padding: "var(--spacing-md) var(--spacing-lg)",
                background: "var(--primary)",
                color: "white",
                border: "none",
                borderRadius: "var(--radius-md)",
                fontWeight: "var(--font-weight-semibold)",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "var(--primary-light)";
                e.target.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "var(--primary)";
                e.target.style.transform = "translateY(0)";
              }}
            >
              Apply Filters
            </button>
          </div>
        </div>

        {/* Results */}
        {datasetsQ.isLoading && <Loading text="Searching datasets..." />}

        {datasetsQ.isError && <ErrorBox error={datasetsQ.error} />}

        {datasetsQ.data && (
          <div>
            <div
              className="grid grid-cards"
              style={{ marginBottom: "var(--spacing-2xl)" }}
            >
              {datasetsQ.data.results?.map((ds) => (
                <DatasetCard key={ds.id} dataset={ds} />
              ))}
            </div>

            {total > pageSize && (
              <Pagination
                page={page}
                pageSize={pageSize}
                total={total}
                onPageChange={setPage}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
