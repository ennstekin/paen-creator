"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle } from "lucide-react";

const schema = z.object({
  fullName: z.string().min(1, "Ad soyad zorunludur"),
  email: z.string().min(1, "E-posta zorunludur").email("Geçerli e-posta girin"),
  phone: z
    .string()
    .min(1, "Telefon zorunludur")
    .regex(/^[0-9\s+\-()]+$/, "Geçerli telefon numarası girin"),
  instagram: z.string().optional(),
  tiktok: z.string().optional(),
  followerCount: z.string().min(1, "Takipçi sayısı seçiniz"),
  agreement: z.literal(true, {
    errorMap: () => ({ message: "Devam etmek için onaylamalısın" }),
  }),
});

type FormData = z.infer<typeof schema>;

export function ApplicationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      instagram: "",
      tiktok: "",
      followerCount: "",
    },
  });

  async function onSubmit(data: FormData) {
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/influencer/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const json = await res.json();
        setError(json.error || "Bir hata oluştu, tekrar dene.");
        setSubmitting(false);
        return;
      }

      setSubmitted(true);
    } catch {
      setError("Bağlantı hatası, tekrar dene.");
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <section id="basvuru" className="py-14 sm:py-24 bg-neutral-50">
        <div className="max-w-lg mx-auto px-5 sm:px-6 text-center">
          <div className="inline-flex items-center justify-center h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-emerald-50 mb-5 sm:mb-6">
            <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 text-emerald-500" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-neutral-900">
            Başvurun alındı!
          </h2>
          <p className="mt-2 sm:mt-3 text-sm sm:text-base text-neutral-500">
            En kısa sürede sana dönüş yapacağız. Gözün mailinde olsun.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="basvuru" className="py-14 sm:py-24 bg-neutral-50">
      <div className="max-w-lg mx-auto px-5 sm:px-6">
        <div className="text-center mb-8 sm:mb-10">
          <p className="text-xs font-medium uppercase tracking-widest text-neutral-400 mb-3">
            Başvuru
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900">
            Formu doldur, biz sana dönelim.
          </h2>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-2xl border border-neutral-200 bg-white p-5 sm:p-8 space-y-4 sm:space-y-5 shadow-sm"
        >
          <div className="space-y-1.5">
            <Label htmlFor="fullName" className="text-sm">Ad Soyad</Label>
            <Input
              id="fullName"
              placeholder="Adın Soyadın"
              {...register("fullName")}
            />
            {errors.fullName && (
              <p className="text-xs text-red-500">{errors.fullName.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-sm">E-posta</Label>
            <Input
              id="email"
              type="email"
              inputMode="email"
              placeholder="ornek@mail.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="phone" className="text-sm">Telefon</Label>
            <Input
              id="phone"
              type="tel"
              inputMode="tel"
              placeholder="05XX XXX XX XX"
              onKeyDown={(e) => {
                if (!/[0-9\s+\-()Backspace Tab Delete ArrowLeft ArrowRight]/.test(e.key) && !e.metaKey && !e.ctrlKey) {
                  e.preventDefault();
                }
              }}
              {...register("phone")}
            />
            {errors.phone && (
              <p className="text-xs text-red-500">{errors.phone.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-5">
            <div className="space-y-1.5">
              <Label htmlFor="instagram" className="text-sm">Instagram</Label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-sm text-muted-foreground">@</span>
                <Input
                  id="instagram"
                  placeholder="kullaniciadin"
                  className="rounded-l-none"
                  {...register("instagram")}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="tiktok" className="text-sm">TikTok</Label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-sm text-muted-foreground">@</span>
                <Input
                  id="tiktok"
                  placeholder="kullaniciadin"
                  className="rounded-l-none"
                  {...register("tiktok")}
                />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm">Takipçi Sayısı</Label>
            <Select onValueChange={(val) => setValue("followerCount", val)}>
              <SelectTrigger>
                <SelectValue placeholder="Seçiniz" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1k-5k">1K - 5K</SelectItem>
                <SelectItem value="5k-10k">5K - 10K</SelectItem>
                <SelectItem value="10k-50k">10K - 50K</SelectItem>
                <SelectItem value="50k-100k">50K - 100K</SelectItem>
                <SelectItem value="100k+">100K+</SelectItem>
              </SelectContent>
            </Select>
            {errors.followerCount && (
              <p className="text-xs text-red-500">{errors.followerCount.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="mt-0.5 h-4 w-4 rounded border-neutral-300 accent-neutral-900 cursor-pointer shrink-0"
                {...register("agreement")}
              />
              <span className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
                PAEN ile içerik iş birliği koşullarını okudum ve kabul ediyorum. Gönderilen ürünlerin karşılığında içerik üretmeyi taahhüt ediyorum.
              </span>
            </label>
            {errors.agreement && (
              <p className="text-xs text-red-500">{errors.agreement.message}</p>
            )}
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 border border-red-200 p-3">
              <p className="text-xs text-red-600">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex h-14 w-full items-center justify-center rounded-full bg-neutral-900 text-sm font-semibold text-white transition-colors hover:bg-neutral-800 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? "Gönderiliyor..." : "Gönder"}
          </button>
        </form>
      </div>
    </section>
  );
}
