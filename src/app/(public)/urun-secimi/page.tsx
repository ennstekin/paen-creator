"use client";

import { useState } from "react";
import Image from "next/image";
import { CheckCircle, ChevronLeft } from "lucide-react";

const colors = [
  { name: "Siyah", slug: "siyah", image: "/products/tshirt/siyah.png" },
  { name: "Beyaz", slug: "beyaz", image: "/products/tshirt/beyaz.png" },
  { name: "Lacivert", slug: "lacivert", image: "/products/tshirt/lacivert.png" },
  { name: "Antrasit", slug: "antrasit", image: "/products/tshirt/antrasit.png" },
  { name: "Taş", slug: "tas", image: "/products/tshirt/tas.png" },
  { name: "Koyu Yeşil", slug: "koyu-yesil", image: "/products/tshirt/koyu-yesil.png" },
  { name: "Kırmızı", slug: "kirmizi", image: "/products/tshirt/kirmizi.png" },
  { name: "Bebe Mavi", slug: "bebe-mavi", image: "/products/tshirt/bebe-mavi.png" },
  { name: "Kahverengi", slug: "kahverengi", image: "/products/tshirt/kahverengi.png" },
  { name: "Sarı", slug: "sari", image: "/products/tshirt/sari.png" },
];

const sizes = ["S", "M", "L", "XL"];

export default function UrunSecimiPage() {
  const [step, setStep] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("S");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  // Address fields
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");

  const selectedProduct = colors.find((c) => c.slug === selectedColor);

  async function handleSubmit() {
    if (!fullName || !phone || !email || !address || !city || !district) {
      setFormError("Lütfen tüm alanları doldurun.");
      return;
    }

    setSubmitting(true);
    setFormError("");

    try {
      const res = await fetch("/api/urun-secimi/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tshirtColor: selectedProduct?.name,
          tshirtSize: selectedSize,
          fullName,
          phone,
          email,
          address,
          city,
          district,
        }),
      });

      if (!res.ok) {
        const json = await res.json();
        setFormError(json.error || "Bir hata oluştu.");
        setSubmitting(false);
        return;
      }

      setStep(3);
    } catch {
      setFormError("Bağlantı hatası, tekrar dene.");
      setSubmitting(false);
    }
  }

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-5 py-4 sm:py-16">

        {/* Header */}
        <div className="mb-4 sm:mb-8">
          <Image src="/logo.png" alt="PAEN" width={60} height={20} className="h-4 sm:h-5 w-auto" />
        </div>

        {/* Step 1: Tişört Seçimi */}
        {step === 1 && (
          <>
            <div className="mb-4 sm:mb-8">
              <p className="text-[10px] sm:text-xs font-medium uppercase tracking-widest text-neutral-400 mb-1">Adım 1</p>
              <h1 className="text-xl sm:text-3xl font-bold text-neutral-900">Tişörtünü seç</h1>
            </div>

            {/* Color grid */}
            <div className="grid grid-cols-5 sm:grid-cols-5 gap-2 sm:gap-3 mb-4 sm:mb-8">
              {colors.map((color) => (
                <button
                  key={color.slug}
                  onClick={() => setSelectedColor(color.slug)}
                  className={`relative rounded-xl sm:rounded-2xl border-2 overflow-hidden transition-all ${
                    selectedColor === color.slug
                      ? "border-neutral-900 shadow-md"
                      : "border-transparent hover:border-neutral-200"
                  }`}
                >
                  <div className="bg-neutral-50 p-1 sm:p-2">
                    <Image
                      src={color.image}
                      alt={color.name}
                      width={400}
                      height={400}
                      className="w-full aspect-square object-contain"
                    />
                  </div>
                  <p className="text-[10px] sm:text-xs font-medium text-neutral-700 py-1 sm:py-2 text-center truncate px-0.5">{color.name}</p>
                  {selectedColor === color.slug && (
                    <div className="absolute top-1 right-1 sm:top-2 sm:right-2 h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-neutral-900 flex items-center justify-center">
                      <CheckCircle className="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Size */}
            <div className="mb-4 sm:mb-8">
              <p className="text-xs sm:text-sm font-medium text-neutral-700 mb-2 sm:mb-3">Beden</p>
              <div className="flex gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`h-9 w-12 sm:h-11 sm:w-14 rounded-lg sm:rounded-xl border text-xs sm:text-sm font-medium transition-all ${
                      selectedSize === size
                        ? "bg-neutral-900 text-white border-neutral-900"
                        : "bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Next */}
            <button
              onClick={() => setStep(2)}
              disabled={!selectedColor || !selectedSize}
              className="w-full h-12 sm:h-14 rounded-full bg-neutral-900 text-sm sm:text-base font-semibold text-white hover:bg-neutral-800 transition-colors active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Devam et
            </button>
          </>
        )}

        {/* Step 2: Teslimat Bilgileri */}
        {step === 2 && (
          <>
            <button
              onClick={() => setStep(1)}
              className="flex items-center gap-1 text-sm text-neutral-500 hover:text-neutral-900 transition-colors mb-6"
            >
              <ChevronLeft className="h-4 w-4" />
              Geri
            </button>

            <div className="mb-8">
              <p className="text-xs font-medium uppercase tracking-widest text-neutral-400 mb-2">Adım 2</p>
              <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900">Teslimat bilgilerin</h1>
            </div>

            {/* Selected summary */}
            <div className="flex items-center gap-4 rounded-2xl border border-neutral-100 bg-neutral-50 p-4 mb-8">
              {selectedProduct && (
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  width={80}
                  height={80}
                  className="rounded-xl bg-white object-contain"
                />
              )}
              <div>
                <p className="text-sm font-semibold text-neutral-900">Tişört</p>
                <p className="text-xs text-neutral-500">{selectedProduct?.name} · {selectedSize}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-500">Ad Soyad</label>
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Adın Soyadın"
                  className="w-full h-11 rounded-xl border border-neutral-200 px-4 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-neutral-400 transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-neutral-500">Telefon</label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    type="tel"
                    inputMode="tel"
                    placeholder="05XX XXX XX XX"
                    className="w-full h-11 rounded-xl border border-neutral-200 px-4 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-neutral-400 transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-neutral-500">E-posta</label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    inputMode="email"
                    placeholder="ornek@mail.com"
                    className="w-full h-11 rounded-xl border border-neutral-200 px-4 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-neutral-400 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-neutral-500">İl</label>
                  <input
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="İstanbul"
                    className="w-full h-11 rounded-xl border border-neutral-200 px-4 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-neutral-400 transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-neutral-500">İlçe</label>
                  <input
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    placeholder="Kadıköy"
                    className="w-full h-11 rounded-xl border border-neutral-200 px-4 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-neutral-400 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-500">Açık Adres</label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Mahalle, sokak, bina no, daire no"
                  rows={3}
                  className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-neutral-400 transition-colors resize-none"
                />
              </div>

              {formError && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-3">
                  <p className="text-xs text-red-600">{formError}</p>
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="w-full h-14 rounded-full bg-neutral-900 text-base font-semibold text-white hover:bg-neutral-800 transition-colors active:scale-[0.98] disabled:opacity-50"
              >
                {submitting ? "Gönderiliyor..." : "Gönder"}
              </button>
            </div>
          </>
        )}

        {/* Step 3: Teşekkürler */}
        {step === 3 && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-emerald-50 mb-5">
              <CheckCircle className="h-8 w-8 text-emerald-500" />
            </div>
            <h2 className="text-xl font-bold text-neutral-900">Seçimlerin alındı!</h2>
            <p className="mt-2 text-sm text-neutral-500 max-w-xs mx-auto leading-relaxed">
              En kısa sürede ürünlerini kargolayacağız. Gözün mailinde olsun.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
