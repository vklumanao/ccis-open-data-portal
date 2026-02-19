import { useState, useEffect } from "react";
import axios from "axios";

const DEFAULT_SCHEMA = {
  title: "",
  name: "",
  notes: "",
  tags: [],
  license_id: "",
  owner_org: "",
  private: false,
  url: "",
  version: "",
  author: "",
  author_email: "",
  maintainer: "",
  maintainer_email: "",
  extras: [{ key: "", value: "" }],
};

export default function AddDatasetForm({ onSuccess }) {
  const [form, setForm] = useState(DEFAULT_SCHEMA);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [orgs, setOrgs] = useState([]);
  const [licenses, setLicenses] = useState([]);

  useEffect(() => {
    async function fetchOrgsAndLicenses() {
      try {
        const apiKey = localStorage.getItem("ckanApiKey");
        const [orgRes, licRes] = await Promise.all([
          axios.get("/ckan-api/api/3/action/organization_list", {
            headers: { Authorization: apiKey },
            params: { all_fields: true },
          }),
          axios.get("/ckan-api/api/3/action/license_list", {
            headers: { Authorization: apiKey },
          }),
        ]);
        if (orgRes.data.success) setOrgs(orgRes.data.result);
        if (licRes.data.success) setLicenses(licRes.data.result);
      } catch (err) {
        setOrgs([]);
        setLicenses([]);
      }
    }
    fetchOrgsAndLicenses();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const handleTags = (e) => {
    setForm((f) => ({
      ...f,
      tags: e.target.value
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    }));
  };

  const handleExtras = (idx, field, value) => {
    setForm((f) => {
      const extras = [...f.extras];
      extras[idx][field] = value;
      return { ...f, extras };
    });
  };

  const addExtra = () => {
    setForm((f) => ({ ...f, extras: [...f.extras, { key: "", value: "" }] }));
  };

  const removeExtra = (idx) => {
    setForm((f) => ({ ...f, extras: f.extras.filter((_, i) => i !== idx) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPending(true);
    setError("");
    setSuccess("");
    try {
      const apiKey = localStorage.getItem("ckanApiKey");
      const payload = {
        ...form,
        tags: form.tags.map((t) => ({ name: t })),
        extras: form.extras.filter((ex) => ex.key && ex.value),
      };
      const res = await axios.post(
        "/ckan-api/api/3/action/package_create",
        payload,
        {
          headers: { Authorization: apiKey },
        },
      );
      if (res.data && res.data.success) {
        setSuccess("Dataset created successfully!");
        setForm(DEFAULT_SCHEMA);
        // Delay closing the form so user sees the notification
        if (onSuccess) {
          setTimeout(() => {
            onSuccess(res.data.result);
          }, 2000);
        }
      } else {
        setError(res.data?.error?.message || "Failed to create dataset");
      }
    } catch (err) {
      setError(
        err.response?.data?.error?.message ||
          err.message ||
          "Failed to create dataset",
      );
    } finally {
      setPending(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: 800,
        maxHeight: "80vh",
        overflowY: "auto",
        margin: "0 auto",
        background: "var(--background-alt)",
        border: "1px solid var(--border)",
        borderRadius: 10,
        padding: 32,
        boxShadow: "var(--shadow-md)",
      }}
    >
      <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>
        Add New Dataset
      </h2>
      <div
        className="dataset-form-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: 16,
          alignItems: "start",
          marginBottom: 24,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={{ fontWeight: 500 }}>Title *</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="input"
              required
              placeholder="Dataset title"
              style={{ width: "100%" }}
            />
          </div>
          <div>
            <label style={{ fontWeight: 500 }}>Name (URL slug, unique) *</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="input"
              required
              pattern="^[a-zA-Z0-9-_]+$"
              placeholder="Unique dataset name (e.g. my-dataset)"
              style={{ width: "100%" }}
            />
            <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
              URL: localhost:8443/dataset/&lt;dataset&gt;
            </div>
          </div>
          <div>
            <label style={{ fontWeight: 500 }}>Tags</label>
            <input
              name="tags"
              value={form.tags.join(", ")}
              onChange={handleTags}
              className="input"
              placeholder="Comma-separated tags (e.g. health, education)"
              style={{ width: "100%" }}
            />
            <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
              eg. economy, mental health, government
            </div>
          </div>
          <div>
            <label style={{ fontWeight: 500 }}>License</label>
            <select
              name="license_id"
              value={form.license_id}
              onChange={handleChange}
              className="input"
              required
              style={{ width: "100%" }}
            >
              <option value="">Select license</option>
              {licenses.map((lic) => (
                <option key={lic.id} value={lic.id}>
                  {lic.title || lic.id}
                </option>
              ))}
            </select>
            <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
              License definitions and additional information can be found at
              opendefinition.org
            </div>
          </div>
          <div>
            <label style={{ fontWeight: 500 }}>Organization</label>
            <select
              name="owner_org"
              value={form.owner_org}
              onChange={handleChange}
              className="input"
              required
              style={{ width: "100%" }}
            >
              <option value="">Select organization</option>
              {orgs.map((org) => (
                <option key={org.id} value={org.id}>
                  {org.display_name || org.title || org.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ fontWeight: 500 }}>Visibility</label>
            <div style={{ display: "flex", gap: 16 }}>
              <label>
                <input
                  type="radio"
                  name="private"
                  value={false}
                  checked={!form.private}
                  onChange={() => setForm((f) => ({ ...f, private: false }))}
                />{" "}
                Public
              </label>
              <label>
                <input
                  type="radio"
                  name="private"
                  value={true}
                  checked={form.private}
                  onChange={() => setForm((f) => ({ ...f, private: true }))}
                />{" "}
                Private
              </label>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={{ fontWeight: 500 }}>Description</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              className="input"
              rows={6}
              placeholder="Describe the dataset, its contents, and purpose"
              style={{ width: "100%" }}
            />
            <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
              You can use Markdown formatting here
            </div>
          </div>
          <div>
            <label style={{ fontWeight: 500 }}>Source</label>
            <input
              name="url"
              value={form.url}
              onChange={handleChange}
              className="input"
              placeholder="Source URL (optional)"
              style={{ width: "100%" }}
            />
          </div>
          <div>
            <label style={{ fontWeight: 500 }}>Version</label>
            <input
              name="version"
              value={form.version}
              onChange={handleChange}
              className="input"
              placeholder="Version (e.g. 1.0)"
              style={{ width: "100%" }}
            />
          </div>
          <div>
            <label style={{ fontWeight: 500 }}>Author</label>
            <input
              name="author"
              value={form.author}
              onChange={handleChange}
              className="input"
              placeholder="Author name (optional)"
              style={{ width: "100%" }}
            />
          </div>
          <div>
            <label style={{ fontWeight: 500 }}>Author Email</label>
            <input
              name="author_email"
              value={form.author_email}
              onChange={handleChange}
              className="input"
              placeholder="Author email (optional)"
              style={{ width: "100%" }}
            />
          </div>
          <div>
            <label style={{ fontWeight: 500 }}>Maintainer</label>
            <input
              name="maintainer"
              value={form.maintainer}
              onChange={handleChange}
              className="input"
              placeholder="Maintainer name (optional)"
              style={{ width: "100%" }}
            />
          </div>
          <div>
            <label style={{ fontWeight: 500 }}>Maintainer Email</label>
            <input
              name="maintainer_email"
              value={form.maintainer_email}
              onChange={handleChange}
              className="input"
              placeholder="Maintainer email (optional)"
              style={{ width: "100%" }}
            />
          </div>
        </div>
      </div>
      <div style={{ marginBottom: 24 }}>
        <label style={{ fontWeight: 500 }}>Custom Fields</label>
        {form.extras.map((ex, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              gap: 8,
              marginBottom: 6,
              flexWrap: "wrap",
            }}
          >
            <input
              type="text"
              placeholder="Key (e.g. source, language)"
              value={ex.key}
              onChange={(e) => handleExtras(idx, "key", e.target.value)}
              className="input"
              style={{ flex: 1, minWidth: 120 }}
            />
            <input
              type="text"
              placeholder="Value (e.g. World Bank, English)"
              value={ex.value}
              onChange={(e) => handleExtras(idx, "value", e.target.value)}
              className="input"
              style={{ flex: 2, minWidth: 180 }}
            />
            <button
              type="button"
              className="btn secondary"
              onClick={() => removeExtra(idx)}
              style={{ padding: "0 8px" }}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          className="btn"
          onClick={addExtra}
          style={{ marginTop: 6 }}
        >
          Add Custom Field
        </button>
      </div>
      {error && (
        <div
          className="caption"
          style={{ color: "var(--error)", marginBottom: 10 }}
        >
          {error}
        </div>
      )}
      {success && (
        <div
          className="caption"
          style={{ color: "var(--success)", marginBottom: 10 }}
        >
          {success}
        </div>
      )}
      <button
        className="btn"
        type="submit"
        disabled={pending}
        style={{
          width: "100%",
          fontSize: 16,
          borderRadius: 6,
          padding: "12px 0",
          marginTop: 4,
        }}
      >
        {pending ? "Creating..." : "Add Dataset"}
      </button>
    </form>
  );
}
