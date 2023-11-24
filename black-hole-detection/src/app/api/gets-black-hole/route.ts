"use server";
import { MongoClient } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const client = new MongoClient(process.env.MONGODB_URI!);

  try {
    await client.connect();
    const data = await client.db("holedb").collection("black-hole").find({}).toArray();
    return Response.json(data, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Something went wrong!" }, { status: 500 });
  } finally {
    await client.close();
  }
}
