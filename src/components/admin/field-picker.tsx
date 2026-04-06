"use client";

import { Button } from "@/components/ui/button";
import { FIELD_TYPES, type FieldType } from "@/lib/types/form";
import { FIELD_TYPE_CONFIG } from "@/lib/constants";
import {
  Type,
  AlignLeft,
  Mail,
  Phone,
  Hash,
  ChevronDown,
  CheckSquare,
  Circle,
  Calendar,
} from "lucide-react";

const iconMap = {
  Type,
  AlignLeft,
  Mail,
  Phone,
  Hash,
  ChevronDown,
  CheckSquare,
  Circle,
  Calendar,
};

interface FieldPickerProps {
  onAdd: (type: FieldType) => void;
}

export function FieldPicker({ onAdd }: FieldPickerProps) {
  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
        Alan Ekle
      </h3>
      <div className="grid grid-cols-1 gap-1.5">
        {FIELD_TYPES.map((type) => {
          const config = FIELD_TYPE_CONFIG[type];
          const Icon = iconMap[config.icon as keyof typeof iconMap];
          return (
            <Button
              key={type}
              variant="ghost"
              size="sm"
              className="justify-start gap-2 h-9"
              onClick={() => onAdd(type)}
            >
              <Icon className="h-4 w-4 text-muted-foreground" />
              {config.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
