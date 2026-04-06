import { z } from "zod";
import type { FormField } from "@/lib/types/form";

export const formMetaSchema = z.object({
  title: z.string().min(1, "Form başlığı zorunludur"),
  slug: z
    .string()
    .min(1, "URL slug zorunludur")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug sadece küçük harf, rakam ve tire içerebilir"
    ),
  description: z.string().optional(),
});

export function buildSubmissionSchema(fields: FormField[]) {
  const shape: Record<string, z.ZodTypeAny> = {};

  for (const field of fields) {
    let schema: z.ZodTypeAny;

    switch (field.type) {
      case "email":
        schema = field.required
          ? z.string().min(1, "Bu alan zorunludur").email("Geçerli e-posta girin")
          : z.string().email("Geçerli e-posta girin").or(z.literal(""));
        break;
      case "phone":
        schema = field.required
          ? z
              .string()
              .min(1, "Bu alan zorunludur")
              .regex(/^[0-9\s+\-()]+$/, "Geçerli telefon numarası girin")
          : z
              .string()
              .regex(/^[0-9\s+\-()]*$/, "Geçerli telefon numarası girin");
        break;
      case "number":
        schema = field.required
          ? z.string().min(1, "Bu alan zorunludur")
          : z.string();
        break;
      case "checkbox":
        schema = field.required
          ? z.array(z.string()).min(1, "En az bir seçenek seçin")
          : z.array(z.string());
        break;
      case "date":
        schema = field.required
          ? z.string().min(1, "Bu alan zorunludur")
          : z.string();
        break;
      default:
        schema = field.required
          ? z.string().min(1, "Bu alan zorunludur")
          : z.string();
    }

    shape[field.id] = schema;
  }

  return z.object(shape);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[çÇ]/g, "c")
    .replace(/[ğĞ]/g, "g")
    .replace(/[ıİ]/g, "i")
    .replace(/[öÖ]/g, "o")
    .replace(/[şŞ]/g, "s")
    .replace(/[üÜ]/g, "u")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
