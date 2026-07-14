import { validationResult } from "express-validator";
import { Parser as Json2CsvParser } from "json2csv";
import Student from "../models/Student.js";

// @desc    Get all students (with pagination)
// @route   GET /api/admin/students
// @access  Private (admin)
export const getAllStudents = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const total = await Student.countDocuments();
    const students = await Student.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      count: students.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      students,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Search + filter students (by name/email/admissionId, course, status)
// @route   GET /api/admin/students/search
// @access  Private (admin)
export const searchStudents = async (req, res, next) => {
  try {
    const { q, course, status } = req.query;
    const filter = {};

    if (q) {
      filter.$or = [
        { firstName: { $regex: q, $options: "i" } },
        { lastName: { $regex: q, $options: "i" } },
        { email: { $regex: q, $options: "i" } },
        { admissionId: { $regex: q, $options: "i" } },
      ];
    }
    if (course) filter.course = course;
    if (status) filter.admissionStatus = status;

    const students = await Student.find(filter).sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: students.length, students });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single student by ID
// @route   GET /api/admin/students/:id
// @access  Private (admin)
export const getStudentById = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found." });
    }
    res.status(200).json({ success: true, student });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a student's details (admin edit)
// @route   PUT /api/admin/students/:id
// @access  Private (admin)
export const updateStudent = async (req, res, next) => {
  try {
    const allowedFields = [
      "firstName",
      "middleName",
      "lastName",
      "phone",
      "address",
      "course",
      "category",
    ];
    const updates = {};
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    });

    const student = await Student.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found." });
    }

    res.status(200).json({ success: true, message: "Student updated.", student });
  } catch (error) {
    next(error);
  }
};

// @desc    Update admission status — approve or reject
// @route   PATCH /api/admin/students/:id/status
// @access  Private (admin)
export const updateAdmissionStatus = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { admissionStatus, statusNote } = req.body;

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { admissionStatus, statusNote: statusNote || "" },
      { new: true }
    );

    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found." });
    }

    res.status(200).json({
      success: true,
      message: `Admission ${admissionStatus.toLowerCase()}.`,
      student,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a student
// @route   DELETE /api/admin/students/:id
// @access  Private (admin)
export const deleteStudent = async (req, res, next) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found." });
    }
    res.status(200).json({ success: true, message: "Student deleted." });
  } catch (error) {
    next(error);
  }
};

// @desc    Download all student data as CSV
// @route   GET /api/admin/students/export/csv
// @access  Private (admin)
export const downloadStudentsCsv = async (req, res, next) => {
  try {
    const students = await Student.find().lean();

    const rows = students.map((s) => ({
      admissionId: s.admissionId,
      firstName: s.firstName,
      middleName: s.middleName || "",
      lastName: s.lastName,
      email: s.email,
      phone: s.phone,
      course: s.course,
      category: s.category,
      admissionStatus: s.admissionStatus,
      city: s.address?.city || "",
      state: s.address?.state || "",
      registeredOn: s.createdAt,
    }));

    const parser = new Json2CsvParser();
    const csv = parser.parse(rows);

    res.header("Content-Type", "text/csv");
    res.attachment("students.csv");
    res.send(csv);
  } catch (error) {
    next(error);
  }
};
