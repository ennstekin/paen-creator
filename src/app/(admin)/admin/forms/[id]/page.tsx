import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { FormBuilder } from "@/components/admin/form-builder";
import type { Form, FormField } from "@/lib/types/form";

export default async function EditFormPage({
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

  const { data } = await supabase
    .from("forms")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (!data) redirect("/admin");

  const form: Form = {
    ...data,
    fields: data.fields as FormField[],
  };

  return <FormBuilder initialForm={form} />;
}
