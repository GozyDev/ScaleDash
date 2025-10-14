import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const svc = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  // return organizations visible to the requesting user
  // In a simple MVP we return all tenants for now, but ideally filter by user's tenant(s).
  const { data, error } = await svc
    .from("tenants")
    .select("id, name, plan, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.log("Error", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ organizations: data ?? [] });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = body.name;
    const plan = body.plan;
    const type = body.type;
    if (!name)
      return NextResponse.json({ error: "Name required" }, { status: 400 });

    const { data, error } = await svc
      .from("tenants")
      .insert({ name, plan, type })
      .select()
      .single();
    if (error) {
      console.log("Error", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ organization: data }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
