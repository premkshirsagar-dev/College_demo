import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    admissionId: {
      type: String,
      unique: true,
      required: true,
    },
    // Step 1 — Personal Details
    firstName: { type: String, required: true, trim: true },
    middleName: { type: String, trim: true },
    lastName: { type: String, required: true, trim: true },
    dateOfBirth: { type: Date, required: true },
    category: {
      type: String,
      enum: ["General", "OBC", "SC", "ST", "EWS", "Other"],
      required: true,
    },

    // Step 2 — Contact Details
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: { type: String, required: true, trim: true },
    address: {
      line1: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
    },

    // Course applied for (used by admin filtering)
    course: {
      type: String,
      required: true,
      default: "Not Specified",
    },

    // Step 4 — Documents
    documents: {
      transferCertificate: {
        fileName: String,
        filePath: String,
        uploadedAt: Date,
      },
    },

    // Step 5 — Account
    password: { type: String, required: true, select: false },

    // Admin-managed admission status
    admissionStatus: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    statusNote: { type: String, default: "" },

    role: {
      type: String,
      enum: ["student"],
      default: "student",
    },
  },
  { timestamps: true }
);

studentSchema.index({ firstName: 1, lastName: 1 });
studentSchema.index({ course: 1 });
studentSchema.index({ admissionStatus: 1 });

export default mongoose.model("Student", studentSchema);
