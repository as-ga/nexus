/** @format */

import mongoose, { Document, Schema } from "mongoose";

// Define the allowed component types for data integrity
export type ComponentType = "Elastic Rail Clip" | "Liner" | "Rail Pad";

// Interface for TypeScript type safety
export interface IComponentBatch extends Document {
  batchId: string;
  vendor: mongoose.Types.ObjectId; // Link to the Vendor model
  componentType: ComponentType;
  quantity: number;
  manufacturedDate: Date;
  warrantyInYears: number;
  expiryDate?: Date; // Optional field
  qualityOfComponents?: string; // e.g., "Low", "Medium", "High"
}

const componentBatchSchema: Schema = new Schema(
  {
    batchId: { type: String, required: true, unique: true },
    // This creates the crucial link between a batch and its vendor
    vendor: {
      type: Schema.Types.ObjectId,
      ref: "Vendor", // This must match the model name of the vendor schema
      required: true,
    },
    componentType: {
      type: String,
      enum: ["Elastic Rail Clip", "Liner", "Rail Pad"],
      required: true,
    },
    quantity: { type: Number, required: true },
    manufacturedDate: { type: Date, required: true },
    warrantyInYears: { type: Number, required: true, default: 5 },
    expiryDate: { type: Date },
    qualityOfComponents: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
  },
  { timestamps: true }
);

// Create and export the Mongoose model
const ComponentBatch = mongoose.model<IComponentBatch>(
  "ComponentBatch",
  componentBatchSchema
);

export default ComponentBatch;
