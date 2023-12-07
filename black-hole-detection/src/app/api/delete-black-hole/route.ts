"use server";
import { unlink } from "fs/promises";
import { MongoClient } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const client = new MongoClient("mongodb://127.0.0.1:27017");

  try {
    const searchParams = req.nextUrl.searchParams;
    const path = searchParams.get("path");
    await client.connect();
    await client
      .db("holedb")
      .collection("black-hole")
      .deleteOne({ path: path });
    await unlink("./public" + path);
    return Response.json(
      { message: "Data deleted successfully!" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ message: "Something went wrong!" }, { status: 500 });
  } finally {
    await client.close();
  }
}
