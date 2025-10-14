"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Project = {
  id: string;
  title: string;
  project_type?: string;
  status?: string;
  created_at?: string;
};

export default function OrgProjectsPage() {
  const params = useParams() as { orgId?: string };
  const orgId = params?.orgId ?? "";
  const router = useRouter();

  const [orgName, setOrgName] = useState("Organization");
  const [projects, setProjects] = useState<Project[]>([]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "archived">("all");
  const [loading, setLoading] = useState(false);

  // modal state
  const [showCreate, setShowCreate] = useState(false);
  const [title, setTitle] = useState("");
  const [ptype, setPtype] = useState("Feature");
  const [status, setStatus] = useState("active");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!orgId) return;
    loadOrg();
    loadProjects();
  }, [orgId]);

  async function loadOrg() {
    // optional: fetch org details if you have an endpoint, or embed server-rendered org name
    try {
      const res = await fetch(`/api/organizations?orgId=${orgId}`);
      if (!res.ok) return;
      const json = await res.json();
      const org = (json.organizations ?? [])[0];
      if (org) setOrgName(org.name);
    } catch (e) {}
  }

  async function loadProjects() {
    setLoading(true);
    try {
      const res = await fetch(`/api/projects?orgId=${orgId}`);
      const json = await res.json();
      setProjects(json.projects ?? []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function createProject(e?: React.FormEvent) {
    e?.preventDefault();
    if (!title.trim()) return setError("Project title required");
    setError("");
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, type: ptype, status, orgId }),
      });
      if (!res.ok) throw new Error("Create failed");
      setTitle("");
      setShowCreate(false);
      await loadProjects();
    } catch (err: any) {
      setError(err?.message || "Error");
    }
  }

  const filtered = projects.filter((p) => {
    if (filter === "active" && p.status !== "active") return false;
    if (filter === "archived" && p.status === "active") return false;
    if (!query) return true;
    return p.title.toLowerCase().includes(query.trim().toLowerCase());
  });

  return (
    <div className="min-h-screen p-12 bg-neutral-900 text-textNa">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl">Projects</h1>
        </div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 ">
            <div className="flex items-center gap-2 bg-cardC rounded-md px-3 py-2 w-96">
              <svg
                className="w-5 h-5 text-textNd"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M21 21l-4.35-4.35"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="11"
                  cy="11"
                  r="6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects"
                className="bg-transparent outline-none px-2 text-textNb"
              />
            </div>

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="bg-cardC px-2 py-1 rounded-md"
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowCreate(true)}
              className="bg-primaryC px-4 py-2 rounded-md text-white"
            >
              + New project
            </button>
          </div>
        </div>

        <div>
          {loading && <div className="text-neutral-400">Loading...</div>}
          {!loading && filtered.length === 0 && (
            <div className="text-neutral-500">No projects</div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((p) => (
              <div
                key={p.id}
                className="bg-cardC p-4 rounded-lg border border-neutral-700"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-medium">{p.title}</div>
                    <div className="text-sm text-neutral-400">
                      {p.project_type ?? "General"} • {p.status}
                    </div>
                  </div>
                  <div>
                    <a
                      href={`/dashboard/org/${orgId}/project/${p.id}`}
                      className="text-primaryC"
                    >
                      Open
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Create modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-neutral-900 p-6 rounded-lg w-full max-w-lg">
            <h3 className="text-lg font-semibold mb-2">Create project</h3>
            <form onSubmit={createProject} className="space-y-3">
              <input
                className="w-full px-3 py-2 bg-cardC rounded-md"
                placeholder="Project title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <select
                value={ptype}
                onChange={(e) => setPtype(e.target.value)}
                className="w-full px-3 py-2 bg-cardC rounded-md"
              >
                <option>Feature</option>
                <option>Bugfix</option>
                <option>Research</option>
                <option>Chore</option>
              </select>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2 bg-cardC rounded-md"
              >
                <option value="active">Active</option>
                <option value="archived">Archived</option>
              </select>

              {error && <div className="text-red-400">{error}</div>}

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreate(false)}
                  className="px-3 py-2 bg-neutral-800 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primaryC text-white rounded-md"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
