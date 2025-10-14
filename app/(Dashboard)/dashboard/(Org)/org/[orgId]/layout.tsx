// app/dashboard/organization/[orgId]/layout.tsx
import type { ReactNode } from "react";
import OrgHeader from "@/components/OrgHeader";
import { createClient } from "@/lib/superbase/superbase-server";

export default async function OrgLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { orgId: string };
}) {
  const {orgId} = params
  console.log('ID',orgId)
  const supabase = await createClient();
  const { data: org, error } = await supabase
    .from("tenants")
    .select("id, name, plan")
    .eq("id", orgId)
    .single();

    if(error){
        console.log('Error',error.message)
    }

  // handle if org not found: redirect or show fallback
  if (!org) {
    // optional: throw or show fallback UI
  }

  return (
    <>
      {/* OrgHeader can be a server component that accepts org */}
      <OrgHeader org={org} />
      <main>{children}</main>
    </>
  );
}
