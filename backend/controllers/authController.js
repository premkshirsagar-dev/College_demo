import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import Student from "../models/Student.js";
import Admin from "../models/Admin.js";
import generateToken from "../utils/generateToken.js";
import generateAdmissionId from "../utils/generateAdmissionId.js";

// @desc    Register a new student
// @route   POST /api/auth/student/register
// @access  Public
export const registerStudent = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const {
      firstName,
      middleName,
      lastName,
      dateOfBirth,
      category,
      email,
      phone,
      address,
      course,
      password,
    } = req.body;

    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const admissionId = await generateAdmissionId();

    const student = await Student.create({
      admissionId,
      firstName,
      middleName,
      lastName,
      dateOfBirth,
      category,
      email,
      phone,
      address,
      course,
      password: hashedPassword,
    });

    const token = generateToken(student._id, "student");

    res.status(201).json({
      success: true,
      message: "Registration successful.",
      token,
      user: {
        id: student._id,
        admissionId: student.admissionId,
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        role: "student",
        admissionStatus: student.admissionStatus,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Login a student
// @route   POST /api/auth/student/login
// @access  Public
export const loginStudent = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email, password } = req.body;
    const student = await Student.findOne({ email }).select("+password");

    if (!student || !(await bcrypt.compare(password, student.password))) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const token = generateToken(student._id, "student");

    res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      user: {
        id: student._id,
        admissionId: student.admissionId,
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        role: "student",
        admissionStatus: student.admissionStatus,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Register a new admin (requires ADMIN_SETUP_KEY)
// @route   POST /api/auth/admin/register
// @access  Public, but locked behind a setup key
export const registerAdmin = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name, email, password, setupKey } = req.body;

    if (setupKey !== process.env.ADMIN_SETUP_KEY) {
      return res.status(403).json({
        success: false,
        message: "Invalid setup key. Admin account was not created.",
      });
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(409).json({
        success: false,
        message: "An admin account with this email already exists.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const admin = await Admin.create({ name, email, password: hashedPassword });
    const token = generateToken(admin._id, "admin");

    res.status(201).json({
      success: true,
      message: "Admin account created.",
      token,
      user: { id: admin._id, name: admin.name, email: admin.email, role: "admin" },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Login an admin
// @route   POST /api/auth/admin/login
// @access  Public
export const loginAdmin = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email, password } = req.body;
    const admin = await Admin.findOne({ email }).select("+password");

    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const token = generateToken(admin._id, "admin");

    res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      user: { id: admin._id, name: admin.name, email: admin.email, role: "admin" },
    });
  } catch (error) {
    next(error);
  }
};
