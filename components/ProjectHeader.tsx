"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronsUpDown, Plus, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

type Org = { id: string; name: string; plan?: string };
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

export default function ProjectHeader({
  orgs = [],
  project,
}: {
  orgs?: Org[];
  project?: Project;
}) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [pq, setPq] = useState("");

  // org search
  const filteredOrgs = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return orgs;
    return orgs.filter((o) => o.name.toLowerCase().includes(term));
  }, [orgs, q]);

  // project list is either tenant projects or empty array
  const tenantProjects = project?.tenant_id?.projects ?? [];

  // project search
  const filteredProjects = useMemo(() => {
    const term = pq.trim().toLowerCase();
    if (!term) return tenantProjects;
    return tenantProjects.filter((p) => p.title.toLowerCase().includes(term));
  }, [tenantProjects, pq]);
  // helper navigation
  const goToOrg = (id: string) => router.push(`/dashboard/org/${id}`);
  const goToAll = () => router.push("/dashboard/organizations");
  const goToProject = (id: string) => router.push(`/dashboard/project/${id}`);
  console.log(project);
  return (
    <header className="fixed top-0 left-0 w-full flex justify-between items-center bg-neutral-900 text-neutral-100 px-6 py-3 border-b border-gray-800/70 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Image src="/supabase-logo.svg" alt="Logo" width={20} height={20} />
          <span className="font-light text-gray-700/50 text-lg">/</span>
        </div>

        <div className="flex items-center gap-3">
          <p className="font-medium text-sm text-gray-100">
            {/* show active org name if present */}
            {project?.tenant_id.name ?? "Organizations"}
          </p>

          <button className="px-2 text-sm font-light border border-gray-800 rounded-xl transition-colors  capitalize">
            {project?.tenant_id.plan ?? "Free Plan"}
          </button>

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
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Find organization"
                    className="bg-transparent outline-none px-2 text-sm w-full placeholder:text-textNd/50"
                    aria-label="Search organizations"
                  />
                </div>
              </div>

              <DropdownMenuSeparator className="my-2 bg-cardCB" />

              {/* List */}
              <div className="max-h-48 overflow-auto">
                {filteredOrgs.length === 0 && (
                  <div className="px-3 py-2 text-xs text-textNd">
                    No organizations
                  </div>
                )}

                {filteredOrgs.map((org: Org) => (
                  <DropdownMenuItem
                    key={org.id}
                    className="p-0"
                    onSelect={(e) => {
                      e.preventDefault();
                      goToOrg(org.id);
                    }}
                  >
                    <button className="w-full text-left px-3 py-2 hover:bg-cardCB text-[13px]">
                      {org.name}
                    </button>
                  </DropdownMenuItem>
                ))}
              </div>

              <DropdownMenuSeparator className="my-2 bg-cardCB" />

              <div className="px-1">
                <DropdownMenuItem className="p-0">
                  <button
                    onClick={() => goToAll()}
                    className="w-full text-left px-3 py-2 hover:bg-cardCB text-[13px]"
                  >
                    All Organizations
                  </button>
                </DropdownMenuItem>

                <DropdownMenuItem className="p-0">
                  <button
                    onClick={() => router.push("/dashboard/new")}
                    className="w-full text-left px-3 py-2 hover:bg-cardCB text-[13px] flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" /> New organization
                  </button>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center gap-3">
          <p className="font-medium text-sm text-gray-100">
            {/* show active org name if present */}
            {project?.title ?? "Organizations"}
          </p>

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
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
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
                  <div className="px-3 py-2 text-xs text-textNd">
                    No Project
                  </div>
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
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 mr-2">
          <button className="p-2 text-sm font-light border border-gray-800 rounded-lg hover:bg-gray-800">
            Feedback
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-800">
            <Settings className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="flex items-center gap-3 pl-3 border-l border-gray-700/50">
          <div className="relative group cursor-pointer">
            <Avatar className="w-9 h-9 border-2 border-transparent group-hover:border-blue-500">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="User Avatar"
              />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                JD
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-neutral-900" />
          </div>
        </div>
      </div>
    </header>
  );
}
