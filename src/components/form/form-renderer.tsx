"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { buildSubmissionSchema } from "@/lib/validations/form-schema";
import { FieldRenderer } from "./field-renderer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { FormField } from "@/lib/types/form";

interface FormRendererProps {
  slug: string;
  title: string;
  description?: string | null;
  fields: FormField[];
}

export function FormRenderer({ slug, title, description, fields }: FormRendererProps) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const schema = buildSubmissionSchema(fields);

  const defaultValues: Record<string, unknown> = {};
  for (const field of fields) {
    defaultValues[field.id] = field.type === "checkbox" ? [] : "";
  }

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  async function onSubmit(data: Record<string, unknown>) {
    setSubmitting(true);
    setError("");

    const res = await fetch(`/api/forms/${slug}/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const json = await res.json();
      setError(json.error || "Bir hata oluştu");
      setSubmitting(false);
      return;
    }

    router.push(`/${slug}/success`);
  }

  return (
    <div className="min-h-screen bg-muted/30 flex items-start justify-center py-8 px-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl">{title}</CardTitle>
          {description && (
            <CardDescription>{description}</CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {fields
              .sort((a, b) => a.order - b.order)
              .map((field) => (
                <FieldRenderer
                  key={field.id}
                  field={field}
                  register={register}
                  setValue={setValue}
                  watch={watch}
                  error={
                    errors[field.id]?.message as string | undefined
                  }
                />
              ))}

            {error && (
              <p className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                {error}
              </p>
            )}

            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? "Gönderiliyor..." : "Gönder"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
