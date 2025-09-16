/** @format */

import { Router } from "express";
import {
  GetComponentByBatchId,
  ListOfAllComponents,
  ListOfAllVendors,
} from "../controllers/vendor.controllers";
const router = Router();

router.route("/vendors").get(ListOfAllVendors);
router.route("/components").get(ListOfAllComponents);
router.route("/components/:batchId").get(GetComponentByBatchId);

export default router;
