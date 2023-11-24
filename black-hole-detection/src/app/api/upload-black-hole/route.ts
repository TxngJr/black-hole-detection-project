"use server";
import { writeFile } from "fs/promises";
import { MongoClient } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const client = new MongoClient(process.env.MONGODB_URI!);

  try {
    const formData = await req.formData();
    const file: File | null = formData.get("image") as unknown as File;
    if (!file) {
      return Response.json({ message: "have not file" }, { status: 404 });
    }
    Date.now()
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const path = `/img/${file.name}`;
    await writeFile("./public" + path, buffer);
    await client.connect();
    await client.db("holedb").collection("black-hole").insertOne({ path });
    return Response.json(
      { message: "Data saved successfully!" },
      { status: 201 }
    );
  } catch (error) {
    return Response.json({ message: "Something went wrong!" }, { status: 500 });
  } finally {
    await client.close();
  }
}
