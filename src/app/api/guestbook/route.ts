import { NextResponse } from "next/server";
import { z } from "zod";

import { createClient } from "@/lib/supabase/server";

const schema = z.object({
  name: z.string().min(2),
  message: z.string().min(5),
});

export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("guestbook")
    .select("id, name, message, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const payload = await request.json();
  const parsed = schema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message }, { status: 400 });
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("guestbook")
    .insert(parsed.data)
    .select("id, name, message, created_at")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
