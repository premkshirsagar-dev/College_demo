import jwt from "jsonwebtoken";
import Student from "../models/Student.js";
import Admin from "../models/Admin.js";

// Verifies the JWT and attaches the authenticated user + role to req
export const protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized. No token provided.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    let user;
    if (decoded.role === "admin") {
      user = await Admin.findById(decoded.id);
    } else {
      user = await Student.findById(decoded.id);
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Not authorized. User no longer exists.",
      });
    }

    req.user = user;
    req.role = decoded.role;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Not authorized. Token failed or expired.",
    });
  }
};

// Restricts a route to specific roles, e.g. authorize("admin")
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.role)) {
      return res.status(403).json({
        success: false,
        message: `Role '${req.role}' is not permitted to access this resource.`,
      });
    }
    next();
  };
};
