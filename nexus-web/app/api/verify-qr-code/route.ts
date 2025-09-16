/** @format */

import dbConnect from "@/db";
import QRCodeModel from "@/models/qrcode.mode";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const qrCode = await QRCodeModel.findOne({ uniqueId: code });
  //   console.log(qrCode);

  try {
    if (!qrCode) {
      return NextResponse.json(
        { message: "QR Code Is Unique", batchId: null, createdAt: null },
        { status: 200, statusText: "Unique" }
      );
    }
    if (qrCode && !qrCode.isQRPrinted) {
      return NextResponse.json(
        {
          message: "QR Code Is Available In DataBase But Not Printed Yet",
          batchId: qrCode.batchId,
          createdAt: qrCode.createdAt,
        },
        { status: 200, statusText: "Booked" }
      );
    }
    if (qrCode && qrCode.isQRPrinted) {
      return NextResponse.json(
        {
          message: "QR Code Is Already Printed",
          batchId: qrCode.batchId,
          createdAt: qrCode.createdAt,
        },
        { status: 200, statusText: "Used" }
      );
    }
  } catch (error) {
    console.error("Error in Verify QR Code Route:", error);
    return NextResponse.json(
      { message: "Somthing Want Wrong In Verify Qr Route" },
      { status: 400, statusText: "Error" }
    );
  }
}
