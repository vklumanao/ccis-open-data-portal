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
    <div className="grid" style={{ gap: 18 }}>
      <section className="card">
        <h1 style={{ marginTop: 0 }}>Welcome</h1>
        <p style={{ opacity: 0.85 }}>
          This portal provides public datasets from the College of Computing in
          Information Science (CCIS).
        </p>

        <h3>Backend Status</h3>
        {statusQ.isLoading && <Loading text="Checking CKAN..." />}
        {statusQ.isError && <ErrorBox error={statusQ.error} />}
        {statusQ.data && <p>CKAN is reachable.</p>}
      </section>

      <AnalyticsCard />

      <section>
        <h2>Recently Updated</h2>
        {recentQ.isLoading && <Loading text="Loading datasets..." />}
        {recentQ.isError && <ErrorBox error={recentQ.error} />}
        <div className="grid grid-cards">
          {recentQ.data?.results?.map((ds) => (
            <DatasetCard key={ds.id} dataset={ds} />
          ))}
        </div>
      </section>
    </div>
  );
}
