"use client";

import OrganizationHeader from "@/components/OrganizationHeader";
import { useEffect, useState } from "react";

type Org = {
  id: string;
  name: string;
  plan?: string;
  projects_count?: number;
  created_at?: string;
};

export default function OrganizationsPage() {
  const [orgs, setOrgs] = useState<Org[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState("Personal");
  const [plan, setPlan] = useState("Free Plan");
  const [error, setError] = useState("");

  async function loadOrgs() {
    setLoading(true);
    try {
      const res = await fetch("/api/organizations");
      const json = await res.json();
      setOrgs(json.organizations ?? []);
    } catch (err) {
      console.error("Error", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOrgs();
  }, []);

  async function handleCreate(e?: React.FormEvent) {
    e?.preventDefault();
    if (!name.trim()) return setError("Name required");
    setError("");
    try {
      const res = await fetch("/api/organizations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, type, plan }),
      });
      if (!res.ok) throw new Error("Create failed");
      setName("");
      setShowCreate(false);
      await loadOrgs();
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Error");
    }
  }

  const filtered = orgs.filter((o) =>
    o.name.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <div className="min-h-screen p-12 bg-neutral-900 text-textNa">
      
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-semibold">Your Organizations</h1>

          <button
            onClick={() => setShowCreate(true)}
            className="inline-flex items-center gap-2 bg-primaryC hover:bg-emerald-700 text-textNa px-4 py-2 rounded-md"
          >
            <span className="text-2xl leading-none">+</span>
            <span>New organization</span>
          </button>
        </div>


        {/* Search */}
        <div className="flex items-center gap-6 mb-6">
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
              placeholder="Search for an organization"
              className="bg-transparent placeholder-neutral-500 outline-none w-full text-textNb"
            />
          </div>
        </div>

        <div>
          {loading && <div className="text-neutral-400">Loading...</div>}
          {!loading && filtered.length === 0 && (
            <div className="text-textNe">No organizations found.</div>
          )}

          <div className="grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-3  gap-4">
            {filtered.map((org) => (
              <div
                key={org.id}
                className="flex  gap-4 bg-cardC border border-neutral-700 rounded-lg p-4  relative h-[176]"
              >
                <div className="w-12 h-12 rounded-full bg-neutral-700 flex items-center justify-center text-textNb">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 2v6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5 12h14"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7 20h10"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <div className="flex-1">
                  <div className="text-sm font-medium">{org.name}</div>
                  <div className="text-sm text-textNd">
                    {org.plan ?? "Free Plan"} • {org.projects_count ?? 0}{" "}
                    projects
                  </div>
                </div>

                <div className="absolute  right-5">
                  <a
                    href={`/dashboard/org/${org.id}`}
                    className="text-sm text-primaryC hover:underline"
                  >
                    Open
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Create modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-neutral-900 text-neutral-100 rounded-lg w-full max-w-xl shadow-lg border border-neutral-800">
            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-xl font-semibold">
                  Create a new organization
                </h3>
                <p className="text-sm text-neutral-400 mt-1">
                  Organizations are a way to group your projects. Each
                  organization can be configured with different team members and
                  billing settings.
                </p>
              </div>

              <form onSubmit={handleCreate} className="grid gap-4">
                <div className="grid sm:grid-cols-3 gap-3 items-start">
                  <label className="text-sm text-neutral-300 pt-2">Name</label>
                  <div className="sm:col-span-2">
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Organization name"
                      className="w-full px-3 py-2 bg-cardC border border-cardCB rounded-md outline-none placeholder-neutral-500 text-neutral-100"
                    />
                    <p className="text-xs text-neutral-500 mt-2">
                      What's the name of your company or team? You can change
                      this later.
                    </p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-3 items-start">
                  <label className="text-sm text-neutral-300 pt-2">Type</label>
                  <div className="sm:col-span-2">
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className="w-full px-3 py-2 bg-cardC border border-cardCB rounded-md outline-none text-neutral-100"
                    >
                      <option>Personal</option>
                      <option>Educational</option>
                      <option>Startup</option>
                      <option>Agency</option>
                      <option>Company</option>
                      <option>N/A</option>
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-3 items-start">
                  <label className="text-sm text-neutral-300 pt-2">Plan</label>
                  <div className="sm:col-span-2">
                    <select
                      value={plan}
                      onChange={(e) => setPlan(e.target.value)}
                      className="w-full px-3 py-2 bg-cardC border border-cardCB rounded-md outline-none text-neutral-100"
                    >
                      <option>Free Plan</option>
                      <option>Pro</option>
                      <option>Enterprise</option>
                    </select>
                  </div>
                </div>

                {error && <div className="text-sm text-red-400">{error}</div>}

                <div className="flex justify-between items-center pt-2 border-t border-neutral-800">
                  <button
                    type="button"
                    onClick={() => setShowCreate(false)}
                    className="px-3 py-2 rounded-md bg-neutral-800 text-textNc border border-cardCB hover:bg-cardCB"
                  >
                    Cancel
                  </button>

                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-md bg-primaryC hover:bg-emerald-700 text-white"
                    >
                      Create organization
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
