import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import {
  HiOutlineSearch,
  HiOutlineDownload,
  HiOutlineTrash,
  HiOutlinePencil,
  HiOutlineCheck,
  HiOutlineX,
  HiOutlineDocumentText,
} from "react-icons/hi";
import api from "../api/axios";
import { SkeletonRow } from "../components/Skeleton";

const courses = ["BCA", "B.Sc.", "B.Com.", "MCA", "M.Sc.", "MBA"];
const statuses = ["Pending", "Approved", "Rejected"];

const statusStyles = {
  Pending: "bg-gold-500/15 text-gold-600 dark:text-gold-400 border-gold-500/40",
  Approved: "bg-primary-500/15 text-primary-700 dark:text-primary-300 border-primary-500/40",
  Rejected: "bg-danger-500/15 text-danger-600 dark:text-danger-500 border-danger-500/40",
};

const AdminDashboard = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [courseFilter, setCourseFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selected, setSelected] = useState(null);
  const [editForm, setEditForm] = useState(null);

  const fetchStudents = useCallback(async () => {
    setLoading(true);
    try {
      const hasFilters = query || courseFilter || statusFilter;
      const res = hasFilters
        ? await api.get("/admin/students/search", {
            params: { q: query, course: courseFilter, status: statusFilter },
          })
        : await api.get("/admin/students", { params: { limit: 50 } });
      setStudents(res.data.students);
    } catch (err) {
      toast.error("Could not load students.");
    } finally {
      setLoading(false);
    }
  }, [query, courseFilter, statusFilter]);

  useEffect(() => {
    const t = setTimeout(fetchStudents, 300); // debounce search
    return () => clearTimeout(t);
  }, [fetchStudents]);

  const handleStatus = async (id, admissionStatus) => {
    try {
      const res = await api.patch(`/admin/students/${id}/status`, { admissionStatus });
      setStudents((prev) => prev.map((s) => (s._id === id ? res.data.student : s)));
      toast.success(`Admission ${admissionStatus.toLowerCase()}.`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this student record? This cannot be undone.")) return;
    try {
      await api.delete(`/admin/students/${id}`);
      setStudents((prev) => prev.filter((s) => s._id !== id));
      toast.success("Student deleted.");
    } catch (err) {
      toast.error("Delete failed.");
    }
  };

  const handleEditSave = async () => {
    try {
      const res = await api.put(`/admin/students/${editForm._id}`, editForm);
      setStudents((prev) => prev.map((s) => (s._id === editForm._id ? res.data.student : s)));
      setEditForm(null);
      toast.success("Student updated.");
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed.");
    }
  };

  const handleDownload = () => {
    window.open("/api/admin/students/export/csv", "_blank");
  };

  const counts = {
    total: students.length,
    approved: students.filter((s) => s.admissionStatus === "Approved").length,
    pending: students.filter((s) => s.admissionStatus === "Pending").length,
  };

  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold tracking-[0.15em] uppercase text-primary-600">
            Admin panel
          </p>
          <h1 className="mt-2 font-display text-3xl font-semibold">Applications</h1>
        </div>
        <button
          onClick={handleDownload}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium bg-primary-900 text-gold-400 hover:bg-primary-800 transition self-start"
        >
          <HiOutlineDownload /> Export CSV
        </button>
      </div>

      {/* Stat cards */}
      <div className="mt-8 grid sm:grid-cols-3 gap-5">
        <div className="rounded-2xl border border-primary-100 dark:border-primary-800 p-5">
          <p className="text-xs text-ink/50 dark:text-white/50">Total (this view)</p>
          <p className="font-display text-2xl font-semibold mt-1">{counts.total}</p>
        </div>
        <div className="rounded-2xl border border-primary-100 dark:border-primary-800 p-5">
          <p className="text-xs text-ink/50 dark:text-white/50">Approved</p>
          <p className="font-display text-2xl font-semibold mt-1 text-primary-600">{counts.approved}</p>
        </div>
        <div className="rounded-2xl border border-primary-100 dark:border-primary-800 p-5">
          <p className="text-xs text-ink/50 dark:text-white/50">Pending</p>
          <p className="font-display text-2xl font-semibold mt-1 text-gold-600">{counts.pending}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <HiOutlineSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/40" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, email, or Admission ID"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-primary-200 dark:border-primary-700 bg-transparent text-sm focus:border-primary-500 outline-none"
          />
        </div>
        <select
          value={courseFilter}
          onChange={(e) => setCourseFilter(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-primary-200 dark:border-primary-700 bg-transparent text-sm outline-none"
        >
          <option value="">All courses</option>
          {courses.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-primary-200 dark:border-primary-700 bg-transparent text-sm outline-none"
        >
          <option value="">All statuses</option>
          {statuses.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="mt-6 rounded-2xl border border-primary-100 dark:border-primary-800 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-primary-100 dark:border-primary-800 text-left text-ink/50 dark:text-white/50">
              <th className="px-4 py-3 font-medium">Admission ID</th>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Course</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Documents</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
            ) : students.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-ink/50 dark:text-white/50">
                  No applications match these filters.
                </td>
              </tr>
            ) : (
              students.map((s) => (
                <tr
                  key={s._id}
                  className="border-b border-primary-100 dark:border-primary-800 last:border-0 hover:bg-primary-50/50 dark:hover:bg-dark-surface-2/50 transition"
                >
                  <td className="px-4 py-3 font-mono text-xs">{s.admissionId}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => setSelected(s)} className="font-medium hover:underline text-left">
                      {s.firstName} {s.lastName}
                    </button>
                    <p className="text-xs text-ink/50 dark:text-white/50">{s.email}</p>
                  </td>
                  <td className="px-4 py-3">{s.course}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${statusStyles[s.admissionStatus]}`}>
                      {s.admissionStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {s.documents?.transferCertificate?.filePath ? (
                      <a
                        href={s.documents.transferCertificate.filePath}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-primary-600 hover:underline text-xs"
                      >
                        <HiOutlineDocumentText /> View
                      </a>
                    ) : (
                      <span className="text-xs text-ink/40 dark:text-white/40">None</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleStatus(s._id, "Approved")}
                        title="Approve"
                        className="w-8 h-8 rounded-full flex items-center justify-center text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/40"
                      >
                        <HiOutlineCheck />
                      </button>
                      <button
                        onClick={() => handleStatus(s._id, "Rejected")}
                        title="Reject"
                        className="w-8 h-8 rounded-full flex items-center justify-center text-danger-500 hover:bg-danger-500/10"
                      >
                        <HiOutlineX />
                      </button>
                      <button
                        onClick={() => setEditForm(s)}
                        title="Edit"
                        className="w-8 h-8 rounded-full flex items-center justify-center text-ink/60 dark:text-white/60 hover:bg-ink/5 dark:hover:bg-white/10"
                      >
                        <HiOutlinePencil />
                      </button>
                      <button
                        onClick={() => handleDelete(s._id)}
                        title="Delete"
                        className="w-8 h-8 rounded-full flex items-center justify-center text-danger-500 hover:bg-danger-500/10"
                      >
                        <HiOutlineTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* View details modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm flex items-center justify-center px-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-parchment dark:bg-dark-surface rounded-3xl p-8 max-w-lg w-full"
            >
              <h2 className="font-display text-xl font-semibold">
                {selected.firstName} {selected.middleName} {selected.lastName}
              </h2>
              <p className="font-mono text-xs text-primary-600 mt-1">{selected.admissionId}</p>
              <dl className="mt-5 grid grid-cols-2 gap-4 text-sm">
                <div><dt className="text-ink/50 dark:text-white/50">Email</dt><dd>{selected.email}</dd></div>
                <div><dt className="text-ink/50 dark:text-white/50">Phone</dt><dd>{selected.phone}</dd></div>
                <div><dt className="text-ink/50 dark:text-white/50">Course</dt><dd>{selected.course}</dd></div>
                <div><dt className="text-ink/50 dark:text-white/50">Category</dt><dd>{selected.category}</dd></div>
                <div className="col-span-2">
                  <dt className="text-ink/50 dark:text-white/50">Address</dt>
                  <dd>{selected.address?.line1}, {selected.address?.city}, {selected.address?.state} - {selected.address?.pincode}</dd>
                </div>
              </dl>
              <button
                onClick={() => setSelected(null)}
                className="mt-6 w-full py-2.5 rounded-full border border-ink/15 dark:border-white/20 text-sm font-medium hover:bg-ink/5 dark:hover:bg-white/10 transition"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit modal */}
      <AnimatePresence>
        {editForm && (
          <motion.div
            className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm flex items-center justify-center px-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setEditForm(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-parchment dark:bg-dark-surface rounded-3xl p-8 max-w-lg w-full"
            >
              <h2 className="font-display text-xl font-semibold">Edit student</h2>
              <div className="mt-5 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    value={editForm.firstName}
                    onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })}
                    className="rounded-xl border border-primary-200 dark:border-primary-700 bg-transparent px-4 py-2.5 text-sm outline-none"
                    placeholder="First name"
                  />
                  <input
                    value={editForm.lastName}
                    onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })}
                    className="rounded-xl border border-primary-200 dark:border-primary-700 bg-transparent px-4 py-2.5 text-sm outline-none"
                    placeholder="Last name"
                  />
                </div>
                <input
                  value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  className="w-full rounded-xl border border-primary-200 dark:border-primary-700 bg-transparent px-4 py-2.5 text-sm outline-none"
                  placeholder="Phone"
                />
                <select
                  value={editForm.course}
                  onChange={(e) => setEditForm({ ...editForm, course: e.target.value })}
                  className="w-full rounded-xl border border-primary-200 dark:border-primary-700 bg-transparent px-4 py-2.5 text-sm outline-none"
                >
                  {courses.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setEditForm(null)}
                  className="flex-1 py-2.5 rounded-full border border-ink/15 dark:border-white/20 text-sm font-medium hover:bg-ink/5 dark:hover:bg-white/10 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditSave}
                  className="flex-1 py-2.5 rounded-full bg-primary-700 text-white text-sm font-medium hover:bg-primary-800 transition"
                >
                  Save changes
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
