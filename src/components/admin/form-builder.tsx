"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormBuilder } from "@/hooks/use-form-builder";
import { FieldPicker } from "./field-picker";
import { FieldPreview } from "./field-preview";
import { FieldEditor } from "./field-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { slugify } from "@/lib/validations/form-schema";
import type { FormField, Form } from "@/lib/types/form";
import { Save, ExternalLink } from "lucide-react";

interface FormBuilderProps {
  initialForm?: Form;
}

export function FormBuilder({ initialForm }: FormBuilderProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [editingField, setEditingField] = useState<FormField | null>(null);

  const { state, setMeta, addField, removeField, updateField, moveFieldUp, moveFieldDown } =
    useFormBuilder(
      initialForm
        ? {
            title: initialForm.title,
            slug: initialForm.slug,
            description: initialForm.description || "",
            fields: initialForm.fields,
          }
        : undefined
    );

  function handleTitleChange(title: string) {
    setMeta({ title });
    if (!initialForm) {
      setMeta({ slug: slugify(title) });
    }
  }

  async function handleSave() {
    if (!state.title || !state.slug) {
      setError("Başlık ve slug zorunludur");
      return;
    }

    setSaving(true);
    setError("");

    const url = initialForm
      ? `/api/admin/forms/${initialForm.id}`
      : "/api/admin/forms";
    const method = initialForm ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: state.title,
        slug: state.slug,
        description: state.description || null,
        fields: state.fields,
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Bir hata oluştu");
      setSaving(false);
      return;
    }

    if (!initialForm) {
      const data = await res.json();
      router.push(`/admin/forms/${data.id}`);
    }

    setSaving(false);
    router.refresh();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          {initialForm ? "Formu Düzenle" : "Yeni Form"}
        </h2>
        <div className="flex gap-2">
          {initialForm && (
            <Button
              variant="outline"
              onClick={() => window.open(`/${initialForm.slug}`, "_blank")}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Önizle
            </Button>
          )}
          <Button onClick={handleSave} disabled={saving}>
            <Save className="h-4 w-4 mr-2" />
            {saving ? "Kaydediliyor..." : "Kaydet"}
          </Button>
        </div>
      </div>

      {error && (
        <p className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
          {error}
        </p>
      )}

      {/* Form Meta */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Form Başlığı</Label>
              <Input
                value={state.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Müşteri Başvuru Formu"
              />
            </div>
            <div className="space-y-2">
              <Label>URL Slug</Label>
              <Input
                value={state.slug}
                onChange={(e) => setMeta({ slug: e.target.value })}
                placeholder="musteri-basvuru"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Açıklama (opsiyonel)</Label>
            <Textarea
              value={state.description}
              onChange={(e) => setMeta({ description: e.target.value })}
              placeholder="Form açıklaması..."
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Builder */}
      <div className="grid grid-cols-[240px_1fr] gap-6">
        <div>
          <FieldPicker onAdd={addField} />
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
            Form Alanları
          </h3>
          {state.fields.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground border-2 border-dashed rounded-lg">
              <p>Soldaki panelden alan ekleyerek başlayın</p>
            </div>
          ) : (
            state.fields.map((field, index) => (
              <FieldPreview
                key={field.id}
                field={field}
                isFirst={index === 0}
                isLast={index === state.fields.length - 1}
                onEdit={() => setEditingField(field)}
                onRemove={() => removeField(field.id)}
                onMoveUp={() => moveFieldUp(field.id)}
                onMoveDown={() => moveFieldDown(field.id)}
              />
            ))
          )}
        </div>
      </div>

      <FieldEditor
        field={editingField}
        open={!!editingField}
        onClose={() => setEditingField(null)}
        onSave={updateField}
      />
    </div>
  );
}
