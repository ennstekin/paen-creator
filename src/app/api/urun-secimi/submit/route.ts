import { NextResponse } from "next/server";
import { google } from "googleapis";
import { z } from "zod";

const schema = z.object({
  tshirtColor: z.string().min(1),
  tshirtSize: z.string().min(1),
  fullName: z.string().min(1),
  phone: z.string().min(1),
  email: z.string().email(),
  address: z.string().min(1),
  city: z.string().min(1),
  district: z.string().min(1),
});

async function appendToSheet(data: z.infer<typeof schema>) {
  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  const sheetId = process.env.GOOGLE_SHEETS_PRODUCT_ID;

  const existing = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: "A1:K1",
  });

  if (!existing.data.values || existing.data.values.length === 0) {
    await sheets.spreadsheets.values.update({
      spreadsheetId: sheetId,
      range: "A1:K1",
      valueInputOption: "RAW",
      requestBody: {
        values: [["Tarih", "Tişört Renk", "Tişört Beden", "Ad Soyad", "Telefon", "E-posta", "İl", "İlçe", "Adres"]],
      },
    });
  }

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: "A:K",
    valueInputOption: "RAW",
    requestBody: {
      values: [[
        new Date().toLocaleString("tr-TR"),
        data.tshirtColor,
        data.tshirtSize,
        data.fullName,
        data.phone,
        data.email,
        data.city,
        data.district,
        data.address,
      ]],
    },
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  const result = schema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: "Lütfen tüm alanları doldurun." },
      { status: 400 }
    );
  }

  try {
    await appendToSheet(result.data);
  } catch (err) {
    console.error("Sheets error:", err);
    return NextResponse.json(
      { error: "Kayıt sırasında hata oluştu." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
