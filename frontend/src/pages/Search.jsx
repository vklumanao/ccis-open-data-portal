import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { listOrgs, listGroups, searchDatasets } from "../api/ckan";
import DatasetCard from "../components/DatasetCard";
import Pagination from "../components/Pagination";
import Loading from "../components/Loading";
import ErrorBox from "../components/ErrorBox";

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
    if (org) filters.push(`organization:${org}`);
    if (group) filters.push(`groups:${group}`);
    if (tag) filters.push(`tags:${tag}`);
    if (format) filters.push(`res_format:${format}`);
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
    <div className="grid" style={{ gap: 14 }}>
      <h1 style={{ marginBottom: 0 }}>Datasets</h1>

      <div className="card grid grid-3">
        <div>
          <label style={{ fontSize: 12, opacity: 0.8 }}>Search</label>
          <input
            className="input"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onBlur={onApply}
            placeholder="Search title, description, tags..."
          />
        </div>

        <div>
          <label style={{ fontSize: 12, opacity: 0.8 }}>Organization</label>
          <select
            className="input"
            value={org}
            onChange={(e) => {
              setOrg(e.target.value);
              onApply();
            }}
          >
            <option value="">All</option>
            {orgsQ.data?.map((o) => (
              <option key={o.id} value={o.name}>
                {o.title || o.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ fontSize: 12, opacity: 0.8 }}>Category</label>
          <select
            className="input"
            value={group}
            onChange={(e) => {
              setGroup(e.target.value);
              onApply();
            }}
          >
            <option value="">All</option>
            {groupsQ.data?.map((g) => (
              <option key={g.id} value={g.name}>
                {g.title || g.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ fontSize: 12, opacity: 0.8 }}>Tag</label>
          <input
            className="input"
            value={tag}
            onChange={(e) => {
              setTag(e.target.value);
              onApply();
            }}
            placeholder="e.g. enrollment"
          />
        </div>

        <div>
          <label style={{ fontSize: 12, opacity: 0.8 }}>Resource Format</label>
          <input
            className="input"
            value={format}
            onChange={(e) => {
              setFormat(e.target.value);
              onApply();
            }}
            placeholder="e.g. CSV, PDF"
          />
        </div>

        <div>
          <label style={{ fontSize: 12, opacity: 0.8 }}>Sort</label>
          <select
            className="input"
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              onApply();
            }}
          >
            <option value="metadata_modified desc">Recently Updated</option>
            <option value="title_string asc">Title A-Z</option>
            <option value="title_string desc">Title Z-A</option>
          </select>
        </div>
      </div>

      {datasetsQ.isLoading && <Loading text="Loading datasets..." />}
      {datasetsQ.isError && <ErrorBox error={datasetsQ.error} />}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p style={{ opacity: 0.8, margin: 0 }}>
          Results: <b>{total}</b>
        </p>
        <Pagination
          page={page}
          pageSize={pageSize}
          total={total}
          onPageChange={setPage}
        />
      </div>

      <div className="grid grid-cards">
        {datasetsQ.data?.results?.map((ds) => (
          <DatasetCard key={ds.id} dataset={ds} />
        ))}
      </div>
    </div>
  );
}
