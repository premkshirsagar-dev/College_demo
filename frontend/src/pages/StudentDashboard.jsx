import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { HiOutlineUpload, HiOutlinePencil } from "react-icons/hi";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import SealBadge from "../components/SealBadge";
import { SkeletonCard } from "../components/Skeleton";

const statusStyles = {
  Pending: "bg-gold-500/15 text-gold-600 dark:text-gold-400 border-gold-500/40",
  Approved: "bg-primary-500/15 text-primary-700 dark:text-primary-300 border-primary-500/40",
  Rejected: "bg-danger-500/15 text-danger-600 dark:text-danger-500 border-danger-500/40",
};

const StudentDashboard = () => {
  const { user } = useAuth();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [uploading, setUploading] = useState(false);

  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();

  const fetchProfile = async () => {
    try {
      const res = await api.get("/students/me");
      setStudent(res.data.student);
      reset({
        firstName: res.data.student.firstName,
        middleName: res.data.student.middleName,
        lastName: res.data.student.lastName,
        phone: res.data.student.phone,
        address: res.data.student.address,
      });
    } catch (err) {
      toast.error("Could not load your profile.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (data) => {
    try {
      const res = await api.put("/students/me", data);
      setStudent(res.data.student);
      setEditing(false);
      toast.success("Profile updated.");
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed.");
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("transferCertificate", file);
      const res = await api.post("/students/me/documents/transfer-certificate", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setStudent(res.data.student);
      toast.success("Transfer certificate uploaded.");
    } catch (err) {
      toast.error(err.response?.data?.message || "Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-16 grid md:grid-cols-3 gap-6">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  const inputClass =
    "mt-1.5 w-full rounded-xl border border-primary-200 dark:border-primary-700 bg-transparent px-4 py-2.5 text-sm focus:border-primary-500 outline-none";

  return (
    <div className="max-w-5xl mx-auto px-5 sm:px-8 py-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <p className="text-xs font-semibold tracking-[0.15em] uppercase text-primary-600">
            Student dashboard
          </p>
          <h1 className="mt-2 font-display text-3xl font-semibold">
            Welcome, {student?.firstName}
          </h1>
          <span
            className={`inline-block mt-3 text-xs font-semibold px-3 py-1 rounded-full border ${statusStyles[student?.admissionStatus]}`}
          >
            {student?.admissionStatus}
          </span>
          {student?.statusNote && (
            <p className="text-sm text-ink/60 dark:text-white/60 mt-2 max-w-md">
              Note from admissions: {student.statusNote}
            </p>
          )}
        </div>
        <SealBadge admissionId={student?.admissionId} />
      </div>

      <div className="mt-10 grid md:grid-cols-3 gap-6">
        {/* Profile card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:col-span-2 rounded-2xl border border-primary-100 dark:border-primary-800 p-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Profile</h2>
            <button
              onClick={() => setEditing(!editing)}
              className="inline-flex items-center gap-1.5 text-sm text-primary-600 hover:underline"
            >
              <HiOutlinePencil size={16} /> {editing ? "Cancel" : "Edit"}
            </button>
          </div>

          {editing ? (
            <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">First name</label>
                  <input {...register("firstName")} className={inputClass} />
                </div>
                <div>
                  <label className="text-sm font-medium">Last name</label>
                  <input {...register("lastName")} className={inputClass} />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Phone</label>
                <input {...register("phone")} className={inputClass} />
              </div>
              <div>
                <label className="text-sm font-medium">Address</label>
                <input {...register("address.line1")} className={inputClass} placeholder="Street address" />
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                <input {...register("address.city")} className={inputClass} placeholder="City" />
                <input {...register("address.state")} className={inputClass} placeholder="State" />
                <input {...register("address.pincode")} className={inputClass} placeholder="Pincode" />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2.5 rounded-full bg-primary-700 text-white text-sm font-medium hover:bg-primary-800 transition"
              >
                Save changes
              </button>
            </form>
          ) : (
            <dl className="mt-5 grid sm:grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-ink/50 dark:text-white/50">Full name</dt>
                <dd className="mt-0.5 font-medium">
                  {student?.firstName} {student?.middleName} {student?.lastName}
                </dd>
              </div>
              <div>
                <dt className="text-ink/50 dark:text-white/50">Email</dt>
                <dd className="mt-0.5 font-medium">{student?.email}</dd>
              </div>
              <div>
                <dt className="text-ink/50 dark:text-white/50">Phone</dt>
                <dd className="mt-0.5 font-medium">{student?.phone}</dd>
              </div>
              <div>
                <dt className="text-ink/50 dark:text-white/50">Course</dt>
                <dd className="mt-0.5 font-medium">{student?.course}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-ink/50 dark:text-white/50">Address</dt>
                <dd className="mt-0.5 font-medium">
                  {student?.address?.line1}, {student?.address?.city}, {student?.address?.state} - {student?.address?.pincode}
                </dd>
              </div>
            </dl>
          )}
        </motion.div>

        {/* Documents card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="rounded-2xl border border-primary-100 dark:border-primary-800 p-6"
        >
          <h2 className="font-semibold">Transfer Certificate</h2>
          {student?.documents?.transferCertificate?.fileName ? (
            <div className="mt-4 text-sm">
              <p className="font-medium truncate">{student.documents.transferCertificate.fileName}</p>
              <a
                href={student.documents.transferCertificate.filePath}
                target="_blank"
                rel="noreferrer"
                className="text-primary-600 hover:underline text-xs"
              >
                View uploaded file
              </a>
            </div>
          ) : (
            <p className="mt-4 text-sm text-ink/50 dark:text-white/50">No document uploaded yet.</p>
          )}

          <label className="mt-5 flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-primary-200 dark:border-primary-700 py-8 cursor-pointer hover:border-primary-500 transition">
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              className="hidden"
              onChange={handleFileUpload}
              disabled={uploading}
            />
            <HiOutlineUpload className="text-primary-600" size={22} />
            <span className="text-xs text-ink/60 dark:text-white/60">
              {uploading ? "Uploading..." : "Upload / replace file"}
            </span>
          </label>
        </motion.div>
      </div>
    </div>
  );
};

export default StudentDashboard;
