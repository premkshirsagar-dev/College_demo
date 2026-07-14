import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await api.post("/auth/student/login", data);
      login(res.data.token, res.data.user);
      toast.success("Welcome back!");
      navigate("/dashboard");
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
        <h1 className="font-display text-2xl font-semibold text-center">Student login</h1>
        <p className="text-sm text-ink/60 dark:text-white/60 text-center mt-1">
          Track your application and manage your profile.
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
            className="w-full py-3 rounded-full bg-primary-700 text-white font-medium hover:bg-primary-800 transition disabled:opacity-60"
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="text-center text-sm text-ink/60 dark:text-white/60 mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary-600 font-medium hover:underline">
            Apply now
          </Link>
        </p>
        <p className="text-center text-xs text-ink/40 dark:text-white/40 mt-3">
          <Link to="/admin/login" className="hover:underline">Admin login →</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
