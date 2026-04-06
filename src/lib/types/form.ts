export const FIELD_TYPES = [
  "text",
  "textarea",
  "email",
  "phone",
  "number",
  "select",
  "checkbox",
  "radio",
  "date",
] as const;

export type FieldType = (typeof FIELD_TYPES)[number];

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
  order: number;
}

export interface Form {
  id: string;
  user_id: string;
  title: string;
  slug: string;
  description: string | null;
  fields: FormField[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface FormSubmission {
  id: string;
  form_id: string;
  data: Record<string, unknown>;
  ip_address: string | null;
  submitted_at: string;
}
