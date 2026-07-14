import { body } from "express-validator";

export const registerValidator = [
  body("firstName").trim().notEmpty().withMessage("First name is required."),
  body("lastName").trim().notEmpty().withMessage("Last name is required."),
  body("dateOfBirth")
    .notEmpty()
    .withMessage("Date of birth is required.")
    .isISO8601()
    .withMessage("Date of birth must be a valid date."),
  body("category")
    .isIn(["General", "OBC", "SC", "ST", "EWS", "Other"])
    .withMessage("Invalid category selected."),
  body("email").isEmail().withMessage("A valid email is required.").normalizeEmail(),
  body("phone")
    .matches(/^[0-9]{10}$/)
    .withMessage("Phone number must be a valid 10-digit number."),
  body("address.line1").trim().notEmpty().withMessage("Address is required."),
  body("address.city").trim().notEmpty().withMessage("City is required."),
  body("address.state").trim().notEmpty().withMessage("State is required."),
  body("address.pincode")
    .matches(/^[0-9]{6}$/)
    .withMessage("Pincode must be a valid 6-digit number."),
  body("course").trim().notEmpty().withMessage("Course is required."),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters."),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match.");
    }
    return true;
  }),
];

export const loginValidator = [
  body("email").isEmail().withMessage("A valid email is required.").normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required."),
];

export const adminRegisterValidator = [
  body("name").trim().notEmpty().withMessage("Name is required."),
  body("email").isEmail().withMessage("A valid email is required.").normalizeEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters."),
  body("setupKey").notEmpty().withMessage("Setup key is required."),
];
