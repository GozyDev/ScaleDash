import Image from "next/image";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Settings } from "lucide-react";

import DropDownContent from "./DropDownContent";
import DropDownContentP from "./DropDownContentP";
import User from "./User";

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
  project: Project;
}) {
  return (
    <header className="fixed top-0 left-0 w-full flex justify-between items-center  text-neutral-100 px-6 py-3 border-b border-cardCB/80 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Image
            src="/Logo.png"
            alt="Supabase Logo"
            width={35}
            height={35}
            className="text-white"
          />
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

          <DropDownContent orgs={orgs} />
        </div>
        <div className="flex items-center gap-3">
          <p className="font-medium text-sm text-gray-100">
            {/* show active org name if present */}
            {project?.title ?? "Organizations"}
          </p>

          <DropDownContentP project={project} />
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

        <User/>
      </div>
    </header>
  );
}
