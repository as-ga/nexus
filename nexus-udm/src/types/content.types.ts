/** @format */

import { Document } from "mongoose";

// A "clean" Vendor type for the final API response, without Mongoose Document properties
export interface IVendorData {
  _id: string;
  name: string;

  vendorCode: string;
  contact: {
    email: string;
    phone: string;
  };
  performanceRating: number;
  createdAt: Date;
  updatedAt: Date;
}

// This is the shape of the final object returned by our aggregation pipeline
export interface IAggregatedComponent {
  batchId: string;
  componentType: "Elastic Rail Clip" | "Liner" | "Rail Pad";
  quantity: number;
  manufacturedDate: Date;
  warrantyInYears: number;
  createdAt: Date;
  vendor: IVendorData; // The vendor details are embedded as a full object
}
