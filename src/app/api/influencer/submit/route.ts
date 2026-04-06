import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { google } from "googleapis";
import { z } from "zod";

const schema = z.object({
  fullName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  instagram: z.string().optional().default(""),
  tiktok: z.string().optional().default(""),
  followerCount: z.string().min(1),
});

async function appendToSheet(data: z.infer<typeof schema>) {
  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  const sheetId = process.env.GOOGLE_SHEETS_ID;

  // Başlık satırı yoksa ekle
  const existing = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: "A1:G1",
  });

  if (!existing.data.values || existing.data.values.length === 0) {
    await sheets.spreadsheets.values.update({
      spreadsheetId: sheetId,
      range: "A1:G1",
      valueInputOption: "RAW",
      requestBody: {
        values: [["Tarih", "Ad Soyad", "E-posta", "Telefon", "Instagram", "TikTok", "Takipçi Sayısı"]],
      },
    });
  }

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: "A:G",
    valueInputOption: "RAW",
    requestBody: {
      values: [[
        new Date().toLocaleString("tr-TR"),
        data.fullName,
        data.email,
        data.phone,
        data.instagram || "",
        data.tiktok || "",
        data.followerCount,
      ]],
    },
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  const result = schema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: "Lütfen tüm zorunlu alanları doldurun." },
      { status: 400 }
    );
  }

  const supabase = await createClient();
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || null;

  const { data: form } = await supabase
    .from("forms")
    .select("id")
    .eq("slug", "influencer-basvuru")
    .single();

  if (!form) {
    return NextResponse.json(
      { error: "Form henüz yapılandırılmadı." },
      { status: 500 }
    );
  }

  const { error } = await supabase.from("form_submissions").insert({
    form_id: form.id,
    data: result.data,
    ip_address: ip,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Google Sheets'e yaz (hata olsa bile başvuruyu engelleme)
  try {
    await appendToSheet(result.data);
  } catch (err) {
    console.error("Sheets error:", err);
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
