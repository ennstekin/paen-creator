"use client";

import type { FormField } from "@/lib/types/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";

interface FieldRendererProps {
  field: FormField;
  register: UseFormRegister<Record<string, unknown>>;
  setValue: UseFormSetValue<Record<string, unknown>>;
  watch: UseFormWatch<Record<string, unknown>>;
  error?: string;
}

export function FieldRenderer({
  field,
  register,
  setValue,
  watch,
  error,
}: FieldRendererProps) {
  const id = field.id;

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {field.label}
        {field.required && <span className="text-destructive ml-1">*</span>}
      </Label>

      {field.type === "text" && (
        <Input
          id={id}
          placeholder={field.placeholder}
          {...register(id)}
        />
      )}

      {field.type === "textarea" && (
        <Textarea
          id={id}
          placeholder={field.placeholder}
          rows={4}
          {...register(id)}
        />
      )}

      {field.type === "email" && (
        <Input
          id={id}
          type="email"
          placeholder={field.placeholder}
          {...register(id)}
        />
      )}

      {field.type === "phone" && (
        <Input
          id={id}
          type="tel"
          placeholder={field.placeholder}
          {...register(id)}
        />
      )}

      {field.type === "number" && (
        <Input
          id={id}
          type="number"
          placeholder={field.placeholder}
          {...register(id)}
        />
      )}

      {field.type === "date" && (
        <Input id={id} type="date" {...register(id)} />
      )}

      {field.type === "select" && (
        <Select
          onValueChange={(val) => setValue(id, val)}
          defaultValue=""
        >
          <SelectTrigger>
            <SelectValue placeholder={field.placeholder || "Seçiniz..."} />
          </SelectTrigger>
          <SelectContent>
            {(field.options || []).map((opt) => (
              <SelectItem key={opt} value={opt}>
                {opt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {field.type === "radio" && (
        <RadioGroup
          onValueChange={(val) => setValue(id, val)}
          className="space-y-2"
        >
          {(field.options || []).map((opt) => (
            <div key={opt} className="flex items-center space-x-2">
              <RadioGroupItem value={opt} id={`${id}-${opt}`} />
              <Label htmlFor={`${id}-${opt}`} className="font-normal">
                {opt}
              </Label>
            </div>
          ))}
        </RadioGroup>
      )}

      {field.type === "checkbox" && (
        <div className="space-y-2">
          {(field.options || []).map((opt) => {
            const currentValues = (watch(id) as string[]) || [];
            return (
              <div key={opt} className="flex items-center space-x-2">
                <Checkbox
                  id={`${id}-${opt}`}
                  checked={currentValues.includes(opt)}
                  onCheckedChange={(checked) => {
                    const updated = checked
                      ? [...currentValues, opt]
                      : currentValues.filter((v) => v !== opt);
                    setValue(id, updated);
                  }}
                />
                <Label htmlFor={`${id}-${opt}`} className="font-normal">
                  {opt}
                </Label>
              </div>
            );
          })}
        </div>
      )}

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
