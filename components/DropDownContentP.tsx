"use client";
import React, { useMemo, useState } from "react";
import { ChevronsUpDown, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
type ProjectSummary = { id: string; title: string };
type TenantWithProjects = {
  id: string;
  name: string;
  plan?: string;
  projects?: ProjectSummary[];
};
type Project = {
  id: string;
  title: string;
  tenant_id: TenantWithProjects;
};
const DropDownContentP = ({ project }: { project: Project }) => {
  const router = useRouter();

  const [pq, setPq] = useState("");

  // project list is either tenant projects or empty array
  const tenantProjects = project?.tenant_id?.projects ?? [];

  // project search
  const filteredProjects = useMemo(() => {
    const term = pq.trim().toLowerCase();
    if (!term) return tenantProjects;
    return tenantProjects.filter((p) => p.title.toLowerCase().includes(term));
  }, [tenantProjects, pq]);
  // helper navigation

  const goToProject = (id: string) => router.push(`/dashboard/project/${id}`);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-1 rounded-md">
          <ChevronsUpDown className="w-4 h-4 text-gray-400" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-cardC border-none text-textNa w-[22rem] min-w-[18rem] text-sm">
        {/* Search input */}
        <div className="px-2 py-2">
          <div className="flex items-center gap-2 bg-cardC rounded-md px-2 py-1">
            <svg
              className="w-4 h-4 text-textNd/60"
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
              value={pq}
              onChange={(e) => setPq(e.target.value)}
              placeholder="Find Project"
              className="bg-transparent outline-none px-2 text-sm w-full placeholder:text-textNd/50"
              aria-label="Search organizations"
            />
          </div>
        </div>

        <DropdownMenuSeparator className="my-2 bg-cardCB" />

        {/* List */}
        <div className="max-h-48 overflow-auto">
          {filteredProjects.length === 0 && (
            <div className="px-3 py-2 text-xs text-textNd">No Project</div>
          )}

          {filteredProjects.map((p) => (
            <DropdownMenuItem
              key={p.id}
              className="p-0"
              onSelect={(e) => {
                e.preventDefault();
                goToProject(p.id);
              }}
            >
              <button className="w-full text-left px-3 py-2 hover:bg-cardCB text-[13px]">
                {p.title}
              </button>
            </DropdownMenuItem>
          ))}
        </div>

        <DropdownMenuSeparator className="my-2 bg-cardCB" />

        <div className="px-1">
          <DropdownMenuItem className="p-0">
            <button
              onClick={() =>
                router.push(`/dashboard/new/${project?.tenant_id.id}`)
              }
              className="w-full text-left px-3 py-2 hover:bg-cardCB text-[13px] flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> New Project
            </button>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDownContentP;
