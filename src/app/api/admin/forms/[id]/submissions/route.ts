import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import type { FormField } from "@/lib/types/form";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Verify form ownership
  const { data: form } = await supabase
    .from("forms")
    .select("id, fields")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (!form) {
    return NextResponse.json({ error: "Form bulunamadı" }, { status: 404 });
  }

  const { data: submissions, error } = await supabase
    .from("form_submissions")
    .select("*")
    .eq("form_id", id)
    .order("submitted_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Check if CSV export requested
  const url = new URL(request.url);
  if (url.searchParams.get("export") === "csv") {
    const fields = form.fields as FormField[];
    const headers = ["Tarih", ...fields.map((f) => f.label)];
    const rows = (submissions || []).map((s) => [
      new Date(s.submitted_at).toLocaleString("tr-TR"),
      ...fields.map((f) => {
        const val = (s.data as Record<string, unknown>)[f.id];
        if (Array.isArray(val)) return val.join(", ");
        return String(val ?? "");
      }),
    ]);

    const csv = [
      headers.join(","),
      ...rows.map((r) =>
        r.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
      ),
    ].join("\n");

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="submissions-${id}.csv"`,
      },
    });
  }

  return NextResponse.json(submissions);
}
