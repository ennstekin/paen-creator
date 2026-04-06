import type { FieldType } from "@/lib/types/form";

export const FIELD_TYPE_CONFIG: Record<
  FieldType,
  {
    label: string;
    icon: string;
    hasOptions: boolean;
    defaultPlaceholder: string;
  }
> = {
  text: {
    label: "Metin",
    icon: "Type",
    hasOptions: false,
    defaultPlaceholder: "Metin girin...",
  },
  textarea: {
    label: "Uzun Metin",
    icon: "AlignLeft",
    hasOptions: false,
    defaultPlaceholder: "Açıklama girin...",
  },
  email: {
    label: "E-posta",
    icon: "Mail",
    hasOptions: false,
    defaultPlaceholder: "ornek@email.com",
  },
  phone: {
    label: "Telefon",
    icon: "Phone",
    hasOptions: false,
    defaultPlaceholder: "0 (5XX) XXX XX XX",
  },
  number: {
    label: "Sayı",
    icon: "Hash",
    hasOptions: false,
    defaultPlaceholder: "0",
  },
  select: {
    label: "Açılır Liste",
    icon: "ChevronDown",
    hasOptions: true,
    defaultPlaceholder: "Seçiniz...",
  },
  checkbox: {
    label: "Onay Kutusu",
    icon: "CheckSquare",
    hasOptions: true,
    defaultPlaceholder: "",
  },
  radio: {
    label: "Tekli Seçim",
    icon: "Circle",
    hasOptions: true,
    defaultPlaceholder: "",
  },
  date: {
    label: "Tarih",
    icon: "Calendar",
    hasOptions: false,
    defaultPlaceholder: "GG/AA/YYYY",
  },
};
