import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { SubmissionsTable } from "@/components/admin/submissions-table";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import type { FormField } from "@/lib/types/form";

export default async function SubmissionsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  const { data: form } = await supabase
    .from("forms")
    .select("id, title, fields")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (!form) redirect("/admin");

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h2 className="text-2xl font-bold">{form.title} - Yanıtlar</h2>
      </div>
      <SubmissionsTable
        formId={form.id}
        fields={form.fields as FormField[]}
      />
    </div>
  );
}
