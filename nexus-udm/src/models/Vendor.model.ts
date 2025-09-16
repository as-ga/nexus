/** @format */

import mongoose, { Document, Schema } from "mongoose";

// Interface for TypeScript type safety
export interface IVendor extends Document {
  name: string;
  vendorCode: string; // e.g., VEN-PUNE-001
  contact: {
    email: string;
    phone: string;
  };
  performanceRating: number;
}

const vendorSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    vendorCode: { type: String, required: true, unique: true },
    contact: {
      email: { type: String, required: true },
      phone: { type: String, required: true },
    },
    // A rating out of 5, can be updated by the AI later
    performanceRating: { type: Number, default: 4.0, min: 0, max: 5 },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

// Create and export the Mongoose model
const Vendor = mongoose.model<IVendor>("Vendor", vendorSchema);

export default Vendor;
