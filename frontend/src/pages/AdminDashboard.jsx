import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { ckanRequest } from "../utils/ckanApi";

export default function AdminDashboard() {
  const { token, user, logout } = useAuth();
  const [orgName, setOrgName] = useState("");
  const [orgTitle, setOrgTitle] = useState("");
  const [orgDesc, setOrgDesc] = useState("");
  const [orgMsg, setOrgMsg] = useState("");

  const handleCreateOrg = async (e) => {
    e.preventDefault();
    setOrgMsg("");
    try {
      await ckanRequest(
        "organization_create",
        {
          name: orgName,
          title: orgTitle,
          description: orgDesc,
        },
        token,
      );
      setOrgMsg("Organization created!");
      setOrgName("");
      setOrgTitle("");
      setOrgDesc("");
    } catch (err) {
      setOrgMsg("Error: " + err.message);
    }
  };

  // Similar forms can be made for dataset/group creation

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto" }}>
      <h1>Admin Dashboard</h1>
      <div style={{ marginBottom: 24 }}>
        <b>Logged in as:</b> {user?.name} ({user?.email})<br />
        <button onClick={logout} style={{ marginTop: 8 }}>
          Logout
        </button>
      </div>
      <form onSubmit={handleCreateOrg} style={{ marginBottom: 24 }}>
        <h3>Create Organization</h3>
        <input
          placeholder="Name (unique, no spaces)"
          value={orgName}
          onChange={(e) => setOrgName(e.target.value)}
          required
          style={{ width: "100%", marginBottom: 8 }}
        />
        <input
          placeholder="Title"
          value={orgTitle}
          onChange={(e) => setOrgTitle(e.target.value)}
          required
          style={{ width: "100%", marginBottom: 8 }}
        />
        <textarea
          placeholder="Description"
          value={orgDesc}
          onChange={(e) => setOrgDesc(e.target.value)}
          style={{ width: "100%", marginBottom: 8 }}
        />
        <button type="submit">Create Organization</button>
        {orgMsg && <div style={{ marginTop: 8 }}>{orgMsg}</div>}
      </form>
      {/* Add similar forms for createDataset and createGroup */}
    </div>
  );
}
