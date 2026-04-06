"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Plus, Pencil, Trash2, Eye, Copy, ToggleLeft } from "lucide-react";

interface FormItem {
  id: string;
  title: string;
  slug: string;
  is_active: boolean;
  created_at: string;
}

export function FormList() {
  const [forms, setForms] = useState<FormItem[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchForms = useCallback(async () => {
    const res = await fetch("/api/admin/forms");
    if (res.ok) {
      setForms(await res.json());
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchForms();
  }, [fetchForms]);

  async function toggleActive(id: string, currentState: boolean) {
    await fetch(`/api/admin/forms/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_active: !currentState }),
    });
    fetchForms();
  }

  async function deleteForm(id: string) {
    if (!confirm("Bu formu silmek istediğinize emin misiniz?")) return;
    await fetch(`/api/admin/forms/${id}`, { method: "DELETE" });
    fetchForms();
  }

  function copyLink(slug: string) {
    const url = `${window.location.origin}/${slug}`;
    navigator.clipboard.writeText(url);
  }

  if (loading) {
    return <p className="text-muted-foreground">Yükleniyor...</p>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Formlar</h2>
        <Link href="/admin/forms/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Yeni Form
          </Button>
        </Link>
      </div>

      {forms.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p>Henüz form oluşturmadınız.</p>
          <Link href="/admin/forms/new">
            <Button variant="outline" className="mt-4">
              <Plus className="h-4 w-4 mr-2" />
              İlk Formunuzu Oluşturun
            </Button>
          </Link>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Başlık</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Durum</TableHead>
              <TableHead>Oluşturulma</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {forms.map((form) => (
              <TableRow key={form.id}>
                <TableCell className="font-medium">{form.title}</TableCell>
                <TableCell className="text-muted-foreground">
                  /{form.slug}
                </TableCell>
                <TableCell>
                  <Badge variant={form.is_active ? "default" : "secondary"}>
                    {form.is_active ? "Aktif" : "Pasif"}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(form.created_at).toLocaleDateString("tr-TR")}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => router.push(`/admin/forms/${form.id}`)}
                      >
                        <Pencil className="h-4 w-4 mr-2" />
                        Düzenle
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          router.push(`/admin/forms/${form.id}/submissions`)
                        }
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Yanıtlar
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => copyLink(form.slug)}>
                        <Copy className="h-4 w-4 mr-2" />
                        Link Kopyala
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => toggleActive(form.id, form.is_active)}
                      >
                        <ToggleLeft className="h-4 w-4 mr-2" />
                        {form.is_active ? "Pasife Al" : "Aktif Et"}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => deleteForm(form.id)}
                        className="text-destructive"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Sil
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
