import express from "express";
import {
  getAllStudents,
  searchStudents,
  getStudentById,
  updateStudent,
  updateAdmissionStatus,
  deleteStudent,
  downloadStudentsCsv,
} from "../controllers/adminController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";
import { statusUpdateValidator } from "../validators/studentValidators.js";

const router = express.Router();

router.use(protect, authorize("admin"));

router.get("/students", getAllStudents);
router.get("/students/search", searchStudents);
router.get("/students/export/csv", downloadStudentsCsv);
router.get("/students/:id", getStudentById);
router.put("/students/:id", updateStudent);
router.patch("/students/:id/status", statusUpdateValidator, updateAdmissionStatus);
router.delete("/students/:id", deleteStudent);

export default router;
