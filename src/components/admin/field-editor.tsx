"use client";

import { useState, useEffect } from "react";
import type { FormField } from "@/lib/types/form";
import { FIELD_TYPE_CONFIG } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Plus, X } from "lucide-react";

interface FieldEditorProps {
  field: FormField | null;
  open: boolean;
  onClose: () => void;
  onSave: (id: string, updates: Partial<FormField>) => void;
}

export function FieldEditor({ field, open, onClose, onSave }: FieldEditorProps) {
  const [label, setLabel] = useState(field?.label || "");
  const [placeholder, setPlaceholder] = useState(field?.placeholder || "");
  const [required, setRequired] = useState(field?.required || false);
  const [options, setOptions] = useState<string[]>(field?.options || []);

  const fieldId = field?.id;
  useEffect(() => {
    if (!field) return;
    setLabel(field.label);
    setPlaceholder(field.placeholder || "");
    setRequired(field.required);
    setOptions(field.options || []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fieldId]);

  if (!field) return null;

  const config = FIELD_TYPE_CONFIG[field.type];

  function handleSave() {
    onSave(field!.id, {
      label,
      placeholder,
      required,
      ...(config.hasOptions && { options }),
    });
    onClose();
  }

  function addOption() {
    setOptions([...options, `Seçenek ${options.length + 1}`]);
  }

  function removeOption(index: number) {
    setOptions(options.filter((_, i) => i !== index));
  }

  function updateOption(index: number, value: string) {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  }

  return (
    <Sheet open={open} onOpenChange={(o) => !o && onClose()}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Alan Düzenle - {config.label}</SheetTitle>
        </SheetHeader>
        <div className="space-y-4 mt-6">
          <div className="space-y-2">
            <Label>Etiket</Label>
            <Input
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Alan etiketi"
            />
          </div>

          {!config.hasOptions && (
            <div className="space-y-2">
              <Label>Placeholder</Label>
              <Input
                value={placeholder}
                onChange={(e) => setPlaceholder(e.target.value)}
                placeholder="Placeholder metin"
              />
            </div>
          )}

          <div className="flex items-center justify-between">
            <Label>Zorunlu Alan</Label>
            <Switch checked={required} onCheckedChange={setRequired} />
          </div>

          {config.hasOptions && (
            <div className="space-y-2">
              <Label>Seçenekler</Label>
              <div className="space-y-2">
                {options.map((opt, i) => (
                  <div key={i} className="flex gap-2">
                    <Input
                      value={opt}
                      onChange={(e) => updateOption(i, e.target.value)}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeOption(i)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" onClick={addOption}>
                <Plus className="h-4 w-4 mr-1" />
                Seçenek Ekle
              </Button>
            </div>
          )}

          <Button className="w-full" onClick={handleSave}>
            Kaydet
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
