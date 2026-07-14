import express from "express";
import {
  getMyProfile,
  updateMyProfile,
  uploadTransferCertificate,
} from "../controllers/studentController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";
import { updateProfileValidator } from "../validators/studentValidators.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.use(protect, authorize("student"));

router.get("/me", getMyProfile);
router.put("/me", updateProfileValidator, updateMyProfile);
router.post(
  "/me/documents/transfer-certificate",
  upload.single("transferCertificate"),
  uploadTransferCertificate
);

export default router;
