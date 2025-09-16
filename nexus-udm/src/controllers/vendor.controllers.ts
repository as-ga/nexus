/** @format */
import { Request, Response } from "express";
import Vendor from "../models/Vendor.model";
import ComponentBatch from "../models/ComponentsBatch.model";
import { IAggregatedComponent } from "../types/content.types";
import { PipelineStage } from "mongoose";

const GetComponentByBatchId = async (
  req: Request,
  res: Response<IAggregatedComponent | { message: string; error?: any }>
) => {
  const { batchId } = req.params;
  if (!batchId) {
    return res.status(400).json({ message: "batchId is required" });
  }
  try {
    const pipeline: PipelineStage[] = [
      { $match: { batchId } },
      {
        $lookup: {
          from: "vendors",
          localField: "vendor",
          foreignField: "_id",
          as: "vendorDetails",
        },
      },
      {
        $unwind: {
          path: "$vendorDetails",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 0,
          batchId: 1,
          componentType: 1,
          quantity: 1,
          manufacturedDate: 1,
          warrantyInYears: 1,
          createdAt: 1,
          vendor: {
            _id: "$vendorDetails._id",
            name: "$vendorDetails.name",
            vendorCode: "$vendorDetails.vendorCode",
            contact: "$vendorDetails.contact",
            performanceRating: "$vendorDetails.performanceRating",
            createdAt: "$vendorDetails.createdAt",
            updatedAt: "$vendorDetails.updatedAt",
          },
        },
      },
    ];
    const result = await ComponentBatch.aggregate<IAggregatedComponent>(
      pipeline
    ).exec();
    if (!result || result.length === 0) {
      return res.status(404).json({ message: "Component batch not found" });
    }
    res.status(200).json(result[0]);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
const ListOfAllVendors = async (req: Request, res: Response) => {
  try {
    const vendors = await Vendor.find();
    res.status(200).json(vendors);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
const ListOfAllComponents = async (
  req: Request,
  res: Response<IAggregatedComponent[] | { message: string; error?: any }>
) => {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const pipeline: PipelineStage[] = [
      {
        $lookup: {
          from: "vendors",
          localField: "vendor",
          foreignField: "_id",
          as: "vendorDetails",
        },
      },
      {
        $unwind: {
          path: "$vendorDetails",
          preserveNullAndEmptyArrays: true,
        },
      },
      // Stage 3: Reshape the output document (CORRECTED STAGE)
      {
        $project: {
          // Exclude only the _id field. This is the only allowed exclusion in an inclusion project.
          _id: 0,

          // By explicitly including all other fields, any fields not mentioned (like __v)
          // will be automatically excluded. This fixes the error.
          batchId: 1,
          componentType: 1,
          quantity: 1,
          manufacturedDate: 1,
          warrantyInYears: 1,
          createdAt: 1,
          vendor: {
            _id: "$vendorDetails._id",
            name: "$vendorDetails.name",
            vendorCode: "$vendorDetails.vendorCode",
            contact: "$vendorDetails.contact",
            performanceRating: "$vendorDetails.performanceRating",
            createdAt: "$vendorDetails.createdAt",
            updatedAt: "$vendorDetails.updatedAt",
          },
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ];

    const allComponents: IAggregatedComponent[] =
      await ComponentBatch.aggregate<IAggregatedComponent>(pipeline).exec();

    if (!allComponents || allComponents.length === 0) {
      return res.status(404).json({ message: "No components found" });
    }

    res.status(200).json(allComponents);
  } catch (error) {
    console.error("Error fetching components with aggregation:", error);
    // Send back the actual error for better debugging during development
    res.status(500).json({ message: "Server Error", error });
  }
};

export { ListOfAllVendors, ListOfAllComponents, GetComponentByBatchId };
