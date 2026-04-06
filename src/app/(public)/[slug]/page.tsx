import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { FormRenderer } from "@/components/form/form-renderer";
import type { FormField } from "@/lib/types/form";

export default async function PublicFormPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Skip admin routes
  if (slug === "admin") {
    notFound();
  }

  const supabase = await createClient();

  const { data: form } = await supabase
    .from("forms")
    .select("title, slug, description, fields, is_active")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (!form) {
    notFound();
  }

  return (
    <FormRenderer
      slug={form.slug}
      title={form.title}
      description={form.description}
      fields={form.fields as FormField[]}
    />
  );
}
