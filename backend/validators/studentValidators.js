import { body } from "express-validator";

export const updateProfileValidator = [
  body("firstName").optional().trim().notEmpty().withMessage("First name cannot be empty."),
  body("lastName").optional().trim().notEmpty().withMessage("Last name cannot be empty."),
  body("phone")
    .optional()
    .matches(/^[0-9]{10}$/)
    .withMessage("Phone number must be a valid 10-digit number."),
  body("address.line1").optional().trim().notEmpty(),
  body("address.city").optional().trim().notEmpty(),
  body("address.state").optional().trim().notEmpty(),
  body("address.pincode")
    .optional()
    .matches(/^[0-9]{6}$/)
    .withMessage("Pincode must be a valid 6-digit number."),
];

export const statusUpdateValidator = [
  body("admissionStatus")
    .isIn(["Pending", "Approved", "Rejected"])
    .withMessage("Status must be Pending, Approved, or Rejected."),
  body("statusNote").optional().trim(),
];
