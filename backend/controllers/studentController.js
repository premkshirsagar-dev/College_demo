import { validationResult } from "express-validator";
import Student from "../models/Student.js";

// @desc    Get logged-in student's own profile
// @route   GET /api/students/me
// @access  Private (student)
export const getMyProfile = async (req, res, next) => {
  try {
    const student = await Student.findById(req.user._id);
    res.status(200).json({ success: true, student });
  } catch (error) {
    next(error);
  }
};

// @desc    Update logged-in student's own profile
// @route   PUT /api/students/me
// @access  Private (student)
export const updateMyProfile = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const allowedFields = ["firstName", "middleName", "lastName", "phone", "address"];
    const updates = {};
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    });

    const student = await Student.findByIdAndUpdate(req.user._id, updates, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      student,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Upload transfer certificate
// @route   POST /api/students/me/documents/transfer-certificate
// @access  Private (student)
export const uploadTransferCertificate = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded." });
    }

    const student = await Student.findByIdAndUpdate(
      req.user._id,
      {
        "documents.transferCertificate": {
          fileName: req.file.originalname,
          filePath: `/uploads/transcripts/${req.file.filename}`,
          uploadedAt: new Date(),
        },
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Transfer certificate uploaded successfully.",
      student,
    });
  } catch (error) {
    next(error);
  }
};
