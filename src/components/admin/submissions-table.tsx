"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download } from "lucide-react";
import type { FormField, FormSubmission } from "@/lib/types/form";

interface SubmissionsTableProps {
  formId: string;
  fields: FormField[];
}

export function SubmissionsTable({ formId, fields }: SubmissionsTableProps) {
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/admin/forms/${formId}/submissions`)
      .then((res) => res.json())
      .then((data) => {
        setSubmissions(data);
        setLoading(false);
      });
  }, [formId]);

  function exportCSV() {
    window.open(`/api/admin/forms/${formId}/submissions?export=csv`, "_blank");
  }

  if (loading) {
    return <p className="text-muted-foreground">Yükleniyor...</p>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Toplam {submissions.length} yanıt
        </p>
        {submissions.length > 0 && (
          <Button variant="outline" size="sm" onClick={exportCSV}>
            <Download className="h-4 w-4 mr-2" />
            CSV İndir
          </Button>
        )}
      </div>

      {submissions.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          Henüz yanıt yok.
        </div>
      ) : (
        <div className="border rounded-lg overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tarih</TableHead>
                {fields.map((f) => (
                  <TableHead key={f.id}>{f.label}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {submissions.map((sub) => (
                <TableRow key={sub.id}>
                  <TableCell className="whitespace-nowrap text-muted-foreground">
                    {new Date(sub.submitted_at).toLocaleString("tr-TR")}
                  </TableCell>
                  {fields.map((f) => {
                    const val = sub.data[f.id];
                    const display = Array.isArray(val)
                      ? val.join(", ")
                      : String(val ?? "-");
                    return (
                      <TableCell key={f.id} className="max-w-[200px] truncate">
                        {display}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
