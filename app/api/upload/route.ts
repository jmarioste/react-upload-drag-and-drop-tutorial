import { NextResponse } from "next/server";
import fs from "fs";
export async function POST(req: Request, response: Response) {
  const data = await req.formData();
  for (const entry of Array.from(data.entries())) {
    const [filename, value] = entry;
    const blob = value as unknown as Blob;
    const buffer = await blob.arrayBuffer();
    fs.writeFileSync(`public/${filename}`, Buffer.from(buffer));
  }

  return NextResponse.json({ success: true });
}
