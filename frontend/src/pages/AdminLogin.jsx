import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { HiOutlineShieldCheck } from "react-icons/hi";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const AdminLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await api.post("/auth/admin/login", data);
      login(res.data.token, res.data.user);
      toast.success("Welcome back, admin.");
      navigate("/admin/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed.");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-5 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-3xl p-8 max-w-md w-full"
      >
        <div className="w-11 h-11 rounded-xl bg-primary-900 text-gold-400 flex items-center justify-center mx-auto">
          <HiOutlineShieldCheck size={22} />
        </div>
        <h1 className="font-display text-2xl font-semibold text-center mt-4">Admin login</h1>
        <p className="text-sm text-ink/60 dark:text-white/60 text-center mt-1">
          Restricted access — admissions staff only.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="mt-1.5 w-full rounded-xl border border-primary-200 dark:border-primary-700 bg-transparent px-4 py-2.5 text-sm focus:border-primary-500 outline-none"
            />
            {errors.email && <p className="text-danger-500 text-xs mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="mt-1.5 w-full rounded-xl border border-primary-200 dark:border-primary-700 bg-transparent px-4 py-2.5 text-sm focus:border-primary-500 outline-none"
            />
            {errors.password && <p className="text-danger-500 text-xs mt-1">{errors.password.message}</p>}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-full bg-primary-900 text-gold-400 font-medium hover:bg-primary-800 transition disabled:opacity-60"
          >
            {isSubmitting ? "Signing in..." : "Sign in as admin"}
          </button>
        </form>

        <p className="text-center text-sm text-ink/60 dark:text-white/60 mt-6">
          Not an admin?{" "}
          <Link to="/login" className="text-primary-600 font-medium hover:underline">
            Student login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
