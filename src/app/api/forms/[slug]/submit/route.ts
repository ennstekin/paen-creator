import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { buildSubmissionSchema } from "@/lib/validations/form-schema";
import type { FormField } from "@/lib/types/form";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const supabase = await createClient();

  // Get active form by slug
  const { data: form } = await supabase
    .from("forms")
    .select("id, fields, is_active")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (!form) {
    return NextResponse.json({ error: "Form bulunamadı" }, { status: 404 });
  }

  const body = await request.json();
  const fields = form.fields as FormField[];

  // Validate submission data
  const schema = buildSubmissionSchema(fields);
  const result = schema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: "Validasyon hatası", details: result.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  // Get IP address
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || null;

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
