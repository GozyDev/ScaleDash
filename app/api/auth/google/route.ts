import { NextResponse } from "next/server";
import { createClient } from "@/lib/superbase/superbase-server"; // server supabase client

export async function GET() {
  const supabaseServer = await createClient();
  const { data, error } = await supabaseServer.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://localhost:3000/dashboard/auth/callback/",
    },
  });

  if (error || !data?.url) return NextResponse.json({ error: error?.message });
  return NextResponse.redirect(data.url);
}
