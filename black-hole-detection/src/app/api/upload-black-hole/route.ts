"use server";
import { writeFile } from "fs/promises";
import { MongoClient } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const client = new MongoClient("mongodb://127.0.0.1:27017");

  try {
    const formData = await req.formData();
    const file: File | null = formData.get("image") as unknown as File;
    if (!file) {
      return Response.json({ message: "have not file" }, { status: 404 });
    }

    let arraryLatLog: Array<string> = file.name.split(", ");
    arraryLatLog[1] = arraryLatLog[1].split(".jpg")[0];

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const path = `uploads/img/${Date.now()}.jpg`;

    await writeFile("./public" + path, buffer);
    await client.connect();
    await client
      .db("holedb")
      .collection("black-hole")
      .insertOne({
        path,
        position: {
          lat: Number(arraryLatLog[0]),
          lng: Number(arraryLatLog[1]),
        },
      });
    return Response.json(
      { message: "Data saved successfully!" },
      { status: 201 }
    );
  } catch (error) {
    return Response.json({ message: `Something went wrong!` }, { status: 500 });
  } finally {
    await client.close();
  }
}
