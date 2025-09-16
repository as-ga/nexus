/** @format */

import mongoose, { Document, Schema } from "mongoose";

// Define the allowed component types for data integrity
export type ComponentType = "Elastic Rail Clip" | "Liner" | "Rail Pad";

// Interface for TypeScript type safety
export interface IQRCodeModel extends Document {
  uniqueId: string;
  batchId: string;
  vendor: string; // Link to the Vendor model
  managementId: string;
  vendorCode: string;
  componentType: ComponentType;
  manufacturedDate: Date;
  warrantyInYears: number;
  expiryDate?: Date; // Optional field
  qualityOfComponents?: string; // e.g., "Low", "Medium", "High"
  isQRPrinted?: boolean; // Optional field to track if QR code is printed
  createdAt?: Date;
  updatedAt?: Date;
}

const QRCodeModelSchema: Schema = new Schema(
  {
    uniqueId: { type: String, required: true, unique: true },
    batchId: { type: String, required: true },
    vendor: { type: String, required: true },
    vendorCode: { type: String, required: true },
    componentType: {
      type: String,
      enum: ["Elastic Rail Clip", "Liner", "Rail Pad"],
      required: true,
    },
    manufacturedDate: { type: Date, required: true },
    warrantyInYears: { type: Number, required: true, default: 5 },
    expiryDate: { type: Date },
    qualityOfComponents: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    isQRPrinted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Create and export the Mongoose model
const QRCodeModel =
  (mongoose.models.QRCodeModel as mongoose.Model<IQRCodeModel>) ||
  mongoose.model<IQRCodeModel>("QRCodeModel", QRCodeModelSchema);

export default QRCodeModel;
