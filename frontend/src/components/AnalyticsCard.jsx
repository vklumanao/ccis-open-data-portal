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
        <h3 style={{ marginTop: 0 }}>Analytics</h3>
        <Loading text="Loading analytics..." />
      </section>
    );

  if (datasetsQ.isError || orgsQ.isError || groupsQ.isError)
    return (
      <section className="card">
        <h3 style={{ marginTop: 0 }}>Analytics</h3>
        <p style={{ color: "#ffa0a0" }}>Failed to load analytics.</p>
      </section>
    );

  const datasetsCount =
    datasetsQ.data?.result?.count ?? datasetsQ.data?.count ?? 0;
  const orgsCount = Array.isArray(orgsQ.data) ? orgsQ.data.length : 0;
  const groupsCount = Array.isArray(groupsQ.data) ? groupsQ.data.length : 0;

  return (
    <section className="card">
      <h3 style={{ marginTop: 0 }}>Analytics</h3>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 160px", minWidth: 140 }}>
          <div style={{ fontSize: 14, opacity: 0.85 }}>Datasets</div>
          <div style={{ fontSize: 24, fontWeight: 700 }}>{datasetsCount}</div>
        </div>

        <div style={{ flex: "1 1 160px", minWidth: 140 }}>
          <div style={{ fontSize: 14, opacity: 0.85 }}>Organizations</div>
          <div style={{ fontSize: 24, fontWeight: 700 }}>{orgsCount}</div>
        </div>

        <div style={{ flex: "1 1 160px", minWidth: 140 }}>
          <div style={{ fontSize: 14, opacity: 0.85 }}>Categories</div>
          <div style={{ fontSize: 24, fontWeight: 700 }}>{groupsCount}</div>
        </div>
      </div>
    </section>
  );
}
