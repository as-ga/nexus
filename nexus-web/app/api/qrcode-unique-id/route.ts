/** @format */

import dbConnect from "@/db";
// import ComponentBatch from "@/models/ComponentsBatch.model";
import QRCodeModel from "@/models/qrcode.mode";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import crypto from "crypto";
export async function POST(request: NextRequest) {
  try {
    const { batchId, vendorCode } = await request.json();
    // console.log(batchId, vendorCode);
    if (!batchId)
      return NextResponse.json(
        { error: "Batch ID is required" },
        { status: 400 }
      );
    await dbConnect();
    const ExistingBatchId = await axios.get(
      `${process.env.UDM_URL}/api/v1/components/${batchId}`
    );
    // console.log(ExistingBatchId);
    if (!ExistingBatchId.data) {
      return NextResponse.json({ error: "Invalid Batch ID" }, { status: 400 });
    }
    const totalQuantityPresentInDatabase = await QRCodeModel.countDocuments({
      batchId,
    });
    if (
      ExistingBatchId.data.quantity &&
      totalQuantityPresentInDatabase >= ExistingBatchId.data.quantity
    ) {
      return NextResponse.json(
        { error: "All QR codes for this batch have been generated" },
        { status: 400 }
      );
    }
    if (vendorCode) {
      if (ExistingBatchId.data.vendor.vendorCode !== vendorCode) {
        return NextResponse.json(
          { error: "Invalid Vendor Code" },
          { status: 400 }
        );
      }
    }
    const ExistingvendorCode = ExistingBatchId.data.vendor.vendorCode;
    // Create a new Unique QR Code ID using crypto, batchId, and vendorCode
    const baseString = `${batchId}-${
      ExistingvendorCode || ""
    }-${Date.now()}-${Math.random()}`;
    const hash = crypto.createHash("sha256").update(baseString).digest("hex");
    let uniqueId = `QR-${hash}-${batchId}-${ExistingvendorCode}`;
    const existingQRCode = await QRCodeModel.findOne({ uniqueId });
    while (existingQRCode) {
      const newBaseString = `${batchId}-${
        ExistingvendorCode || ""
      }-${Date.now()}-${Math.random()}`;
      const newHash = crypto
        .createHash("sha256")
        .update(newBaseString)
        .digest("hex");
      uniqueId = `QR-${newHash}-${batchId}-${ExistingvendorCode}`;
      // const existingQRCode = await QRCodeModel.findOne({ uniqueId });
    }
    // Save to database
    const newQRCode = new QRCodeModel({
      uniqueId,
      batchId,
      vendor: ExistingBatchId.data.vendor._id,
      vendorCode: ExistingvendorCode || null,
      managementId: "",
      componentType: ExistingBatchId.data.componentType,
      manufacturedDate: ExistingBatchId.data.manufacturedDate,
      warrantyInYears: ExistingBatchId.data.warrantyInYears,
      expiryDate: ExistingBatchId.data.expiryDate,
      qualityOfComponents: ExistingBatchId.data.qualityOfComponents,
      isQRPrinted: false,
    });
    await newQRCode.save();
    return NextResponse.json({ uniqueId }, { status: 200 });
  } catch (error) {
    console.error("Error fetching QR code data:", error);
    return NextResponse.error();
  }
}
