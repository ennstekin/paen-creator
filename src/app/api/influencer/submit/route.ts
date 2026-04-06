import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

const schema = z.object({
  fullName: z.string().min(1),
  phone: z.string().min(1),
  instagram: z.string().optional().default(""),
  tiktok: z.string().optional().default(""),
  followerCount: z.string().min(1),
});

export async function POST(request: Request) {
  const body = await request.json();
  const result = schema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: "Lütfen tüm zorunlu alanları doldurun." },
      { status: 400 }
    );
  }

  const supabase = await createClient();

  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || null;

  // Look for a form with slug "influencer-basvuru"
  const { data: form } = await supabase
    .from("forms")
    .select("id")
    .eq("slug", "influencer-basvuru")
    .single();

  if (!form) {
    return NextResponse.json(
      { error: "Form henüz yapılandırılmadı. Admin panelden 'influencer-basvuru' slug'ıyla bir form oluşturun." },
      { status: 500 }
    );
  }

  const { error } = await supabase.from("form_submissions").insert({
    form_id: form.id,
    data: result.data,
    ip_address: ip,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
