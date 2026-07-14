import express from "express";
import {
  registerStudent,
  loginStudent,
  registerAdmin,
  loginAdmin,
} from "../controllers/authController.js";
import {
  registerValidator,
  loginValidator,
  adminRegisterValidator,
} from "../validators/authValidators.js";

const router = express.Router();

router.post("/student/register", registerValidator, registerStudent);
router.post("/student/login", loginValidator, loginStudent);

router.post("/admin/register", adminRegisterValidator, registerAdmin);
router.post("/admin/login", loginValidator, loginAdmin);

export default router;
