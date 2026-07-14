// Generates a unique, human-readable admission ID, e.g. ADM-2026-084213
// Format: ADM-<year>-<6 random digits>. Retries on collision.
import Student from "../models/Student.js";

const generateAdmissionId = async () => {
  const year = new Date().getFullYear();
  let admissionId;
  let exists = true;

  while (exists) {
    const random = Math.floor(100000 + Math.random() * 900000); // 6 digits
    admissionId = `ADM-${year}-${random}`;
    // eslint-disable-next-line no-await-in-loop
    exists = await Student.exists({ admissionId });
  }

  return admissionId;
};

export default generateAdmissionId;
