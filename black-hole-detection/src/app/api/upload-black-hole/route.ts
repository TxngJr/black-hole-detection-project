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
    if (Number(arraryLatLog[0]) == 0) {
      return Response.json({ message: `Gps Error` }, { status: 404 });
    }
    arraryLatLog[1] = arraryLatLog[1].split(".jpg")[0];

    const rawResponse = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${arraryLatLog[0]},${arraryLatLog[1]}&key=AIzaSyAYo9E_FaMLIjTtPbqO4UGCcCgJm9P3xc0`
    );
    const data = await rawResponse.json();

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    // const path = `/img/${Date.now()}.jpg`;

    // await writeFile(`${process.cwd()}/public` + path, buffer);
    await client.connect();
    await client
      .db("holedb")
      .collection("black-hole")
      .insertOne({
        path: buffer,
        position: {
          lat: Number(arraryLatLog[0]),
          lng: Number(arraryLatLog[1]),
        },
        address: data.results[0].formatted_address,
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
