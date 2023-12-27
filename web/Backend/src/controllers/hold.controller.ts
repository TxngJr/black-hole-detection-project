import { Request, Response } from "express";
import dotenv from "dotenv";
import HoldModel from "../models/hold.model";
import { IHold } from "../interfaces/hold.interface";
import path from "path";
import pdf from "html-pdf";
import fs from "fs";
dotenv.config();

const createHold = async (req: Request, res: Response) => {
  try {
    const { originalname } = req.file!;
    const { macAddress } = req.body;

    let arraryLatLog: Array<string> = originalname.split(", ");
    if (Number(arraryLatLog[0]) == 0) {
      return Response.json({ message: `Gps Error` }, { status: 404 });
    }
    arraryLatLog[1] = arraryLatLog[1].split(".jpg")[0];

    let address = "Unknown";
    try {
      const rawResponse = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${arraryLatLog[0]},${arraryLatLog[1]}&key=AIzaSyAYo9E_FaMLIjTtPbqO4UGCcCgJm9P3xc0`
      );
      const data = await rawResponse.json();
      address = data.results[0].formatted_address;
    } catch (error) {
      console.log("Have not data");
    }
    const holdCreate: IHold | null = await HoldModel.create({
      path: req.file!.path,
      position: {
        lat: Number(arraryLatLog[0]),
        lng: Number(arraryLatLog[1]),
      },
      address,
      macAddress,
    });
    if (!holdCreate) {
      return res.status(404).json({ message: "Fail to register" });
    }
    return res.status(201).json({ message: "Create hold success" });
  } catch (err) {
    return res.status(400).json({ message: "Have Something Wrong" });
  }
};

const getHolds = async (req: Request, res: Response) => {
  try {
    const holds: IHold[] | null = await HoldModel.find({});
    return res.status(200).json(holds);
  } catch (err) {
    return res.status(400).json({ message: "Have Something Wrong" });
  }
};

const getHoldImg = async (req: Request, res: Response) => {
  try {
    const { pathImg }: any = req.query;
    res.sendFile(path.resolve(pathImg));
  } catch (err) {
    return res.status(400).json({ message: "Have Something Wrong" });
  }
};

const deleteHold = async (req: Request, res: Response) => {
  try {
    const { _id }: any = req.query;
    const hold: IHold | any = await HoldModel.findByIdAndDelete(_id);
    if (!hold) {
      return res.status(404).json({ message: "Hold not found" });
    }
    await fs.unlinkSync(hold.path);
    return res.status(200).json({ message: "Delete hold success" });
  } catch (err) {
    return res.status(400).json({ message: "Have Something Wrong" });
  }
};

const getPdfHolds = async (req: Request, res: Response) => {
  const API_BASE_URL = process.env.API_BASE_URL;
  const holds:IHold[] | null = await HoldModel.find({});

  const html = `
    <html>
      <head>
        <style>
        * {
          padding: 0;
          margin: 0;
          box-sizing: border-box;
        }
          table {
            width: 100%; 
            border-collapse: collapse;
          }
          td, th {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: center;
          }
          tr:nth-child(even){background-color: #f2f2f2;}
          tr:hover {background-color: #ddd;}
          th {
            padding-top: 12px;
            padding-bottom: 12px;
            background-color: #04AA6D;
            color: white;
          }
        </style>
      </head>
      <body>
        <table>
          <tr>
            <th>ลำดับ</th>
            <th>ละติจูด</th>
            <th>ลองจิจูด</th>
            <th>ที่อยู่</th>
            <th>รูปภาพ</th>
          </tr>
          ${holds
            .map(
              (user, index) => `
            <tr>
              <td>${index + 1}</td>
              <td>${user.position.lat}</td>  
              <td>${user.position.lng}</td>
              <td>${user.address}</td>
              <td>
                <img src="${API_BASE_URL}/holds/img?pathImg=${
                  user.path
                }" width="200" height="200" />
              </td>
            </tr>
          `
            )
            .join("")}
        </table>
      </body>
    </html>`;
    
  pdf.create(html).toStream(async (err, stream) => {
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=report.pdf");

    stream.pipe(res);
  });
};

export default {
  createHold,
  getHolds,
  getHoldImg,
  deleteHold,
  getPdfHolds,
};
