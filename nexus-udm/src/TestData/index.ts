/** @format */

import { faker } from "@faker-js/faker";
import Vendor from "../models/Vendor.model";
import ComponentBatch, { ComponentType } from "../models/ComponentsBatch.model";

const VENDORS_TO_CREATE = 10;
const MAX_BATCHES_PER_VENDOR = 5;

/**
 * The main function to generate realistic vendor and component data.
 */
const generateAndSaveData = async () => {
  try {
    console.log("🌱 Starting database seeding process...");

    // Clear existing data to prevent duplicates
    await Vendor.deleteMany({});
    await ComponentBatch.deleteMany({});
    console.log("Cleared existing data.");

    const vendors = [];
    for (let i = 0; i < VENDORS_TO_CREATE; i++) {
      vendors.push({
        name: faker.company.name(),
        vendorCode: `VEN-${faker.location
          .city()
          .substring(0, 3)
          .toUpperCase()}-${faker.string.numeric(3)}`,
        contact: {
          email: faker.internet.email(),
          phone: faker.phone.number(),
        },
        performanceRating: faker.number.float({
          min: 3.5,
          max: 4.9,
          fractionDigits: 1,
        }),
      });
    }

    // Insert all vendors at once for better performance
    const createdVendors = await Vendor.insertMany(vendors);
    console.log(`Created ${createdVendors.length} vendors.`);

    const componentBatches = [];
    const componentTypes: ComponentType[] = [
      "Elastic Rail Clip",
      "Liner",
      "Rail Pad",
    ];

    // For each created vendor, generate a random number of component batches
    for (const vendor of createdVendors) {
      const numBatches = faker.number.int({
        min: 1,
        max: MAX_BATCHES_PER_VENDOR,
      });
      for (let i = 0; i < numBatches; i++) {
        componentBatches.push({
          vendor: vendor._id, // Link the batch to the vendor's ID
          batchId: `BATCH-${faker.string.alphanumeric(8).toUpperCase()}`,
          componentType: faker.helpers.arrayElement(componentTypes),
          quantity: faker.number.int({ min: 5000, max: 20000 }),
          manufacturedDate: faker.date.past({ years: 2 }),
          warrantyInYears: faker.helpers.arrayElement([5, 7, 10]),
          qualityOfComponents: faker.helpers.arrayElement([
            "Low",
            "Medium",
            "High",
          ]),
          expiryDate: faker.date.future({ years: 10 }),
        });
      }
    }

    // Insert all component batches at once
    const createdBatches = await ComponentBatch.insertMany(componentBatches);
    console.log(` Created ${createdBatches.length} component batches.`);

    console.log(" Seeding completed successfully!");
  } catch (error) {
    console.error(" An error occurred during the seeding process:", error);
  }
};

export { generateAndSaveData };
