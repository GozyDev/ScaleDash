"use client";
import NewHeader from "@/components/NewHeader";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const NewOrgpage = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("Personal");
  const [plan, setPlan] = useState("Free Plan");
  const [error, setError] = useState("");
  const router = useRouter();
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
      if (!res.ok) {
        throw new Error("Create failed");
      } else {
        setName("");
        router.push("/dashboard/organizations");
      }
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Error");
    }
  }
  return (
    <div>
      <div className="flex  justify-center h-screen bg-neutral-900  py-[120px]">
        <NewHeader/>
        <div className="bg-cardC/50 text-neutral-100 rounded-lg w-full max-w-3xl shadow-lg border border-neutral-800 h-max">
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
                    What's the name of your company or team? You can change this
                    later.
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
                  onClick={() => router.back()}
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
    </div>
  );
};

export default NewOrgpage;
