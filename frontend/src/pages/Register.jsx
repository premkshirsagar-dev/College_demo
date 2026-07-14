import { useState } from "react";
import { useForm } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { HiOutlineArrowLeft, HiOutlineArrowRight, HiOutlineCheckCircle } from "react-icons/hi";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import SealBadge from "../components/SealBadge";

const steps = ["Personal", "Contact", "Course", "Documents", "Account"];

const stepFields = [
  ["firstName", "lastName", "dateOfBirth", "category"],
  ["email", "phone", "address.line1", "address.city", "address.state", "address.pincode"],
  ["course"],
  [], // documents optional
  ["password", "confirmPassword"],
];

const categories = ["General", "OBC", "SC", "ST", "EWS", "Other"];
const courses = ["BCA", "B.Sc.", "B.Com.", "MCA", "M.Sc.", "MBA"];

const Register = () => {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [tcFile, setTcFile] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onTouched" });

  const goNext = async () => {
    const valid = await trigger(stepFields[step]);
    if (!valid) return;
    setDirection(1);
    setStep((s) => Math.min(s + 1, steps.length - 1));
  };

  const goBack = () => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 0));
  };

  const onSubmit = async (data) => {
    try {
      const payload = {
        firstName: data.firstName,
        middleName: data.middleName,
        lastName: data.lastName,
        dateOfBirth: data.dateOfBirth,
        category: data.category,
        email: data.email,
        phone: data.phone,
        address: {
          line1: data.address.line1,
          city: data.address.city,
          state: data.address.state,
          pincode: data.address.pincode,
        },
        course: data.course,
        password: data.password,
        confirmPassword: data.confirmPassword,
      };

      const res = await api.post("/auth/student/register", payload);
      const { token, user } = res.data;

      // Optional transfer certificate upload, once we have a token
      if (tcFile) {
        const formData = new FormData();
        formData.append("transferCertificate", tcFile);
        localStorage.setItem("token", token); // needed for the interceptor
        await api.post("/students/me/documents/transfer-certificate", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      login(token, user);
      setSuccess(user);
      toast.success("Application submitted!");
    } catch (err) {
      const message = err.response?.data?.message || "Registration failed. Please try again.";
      toast.error(message);
    }
  };

  if (success) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-5 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-3xl p-10 max-w-md w-full text-center"
        >
          <HiOutlineCheckCircle className="mx-auto text-primary-600" size={48} />
          <h1 className="mt-4 font-display text-2xl font-semibold">
            Application submitted!
          </h1>
          <p className="mt-2 text-sm text-ink/60 dark:text-white/60">
            Save your Admission ID — you'll need it to track your status.
          </p>
          <div className="mt-6 flex justify-center">
            <SealBadge admissionId={success.admissionId} size="md" />
          </div>
          <button
            onClick={() => navigate("/dashboard")}
            className="mt-8 w-full py-3 rounded-full bg-primary-700 text-white font-medium hover:bg-primary-800 transition"
          >
            Go to dashboard
          </button>
        </motion.div>
      </div>
    );
  }

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  };

  const inputClass =
    "mt-1.5 w-full rounded-xl border border-primary-200 dark:border-primary-700 bg-transparent px-4 py-2.5 text-sm focus:border-primary-500 outline-none";
  const errClass = "text-danger-500 text-xs mt-1";

  return (
    <div className="max-w-2xl mx-auto px-5 sm:px-8 py-16">
      <p className="text-xs font-semibold tracking-[0.15em] uppercase text-primary-600 text-center">
        Student registration
      </p>
      <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-center">
        Apply for admission
      </h1>

      {/* Stepper */}
      <div className="mt-8 flex items-center justify-between">
        {steps.map((label, i) => (
          <div key={label} className="flex-1 flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                i <= step
                  ? "bg-primary-700 text-white"
                  : "bg-primary-100 dark:bg-dark-surface-2 text-ink/40 dark:text-white/40"
              }`}
            >
              {i + 1}
            </div>
            <span className="mt-1.5 text-[11px] text-ink/60 dark:text-white/60 hidden sm:block">
              {label}
            </span>
            {i < steps.length - 1 && (
              <div className="hidden" />
            )}
          </div>
        ))}
      </div>
      <div className="mt-2 h-1 rounded-full bg-primary-100 dark:bg-dark-surface-2 overflow-hidden">
        <motion.div
          className="h-full bg-primary-600"
          animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-10 glass-card rounded-3xl p-8 overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {step === 0 && (
              <div className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm font-medium">First name</label>
                    <input {...register("firstName", { required: "Required" })} className={inputClass} />
                    {errors.firstName && <p className={errClass}>{errors.firstName.message}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-medium">Middle name</label>
                    <input {...register("middleName")} className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Last name</label>
                  <input {...register("lastName", { required: "Required" })} className={inputClass} />
                  {errors.lastName && <p className={errClass}>{errors.lastName.message}</p>}
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm font-medium">Date of birth</label>
                    <input
                      type="date"
                      {...register("dateOfBirth", { required: "Required" })}
                      className={inputClass}
                    />
                    {errors.dateOfBirth && <p className={errClass}>{errors.dateOfBirth.message}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-medium">Category</label>
                    <select {...register("category", { required: "Required" })} className={inputClass}>
                      <option value="">Select</option>
                      {categories.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                    {errors.category && <p className={errClass}>{errors.category.message}</p>}
                  </div>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-5">
                <div>
                  <label className="text-sm font-medium">Email address</label>
                  <input
                    type="email"
                    {...register("email", { required: "Required" })}
                    className={inputClass}
                  />
                  {errors.email && <p className={errClass}>{errors.email.message}</p>}
                </div>
                <div>
                  <label className="text-sm font-medium">Phone number</label>
                  <input
                    {...register("phone", {
                      required: "Required",
                      pattern: { value: /^[0-9]{10}$/, message: "Enter a 10-digit number" },
                    })}
                    className={inputClass}
                    placeholder="10-digit mobile number"
                  />
                  {errors.phone && <p className={errClass}>{errors.phone.message}</p>}
                </div>
                <div>
                  <label className="text-sm font-medium">Address</label>
                  <input
                    {...register("address.line1", { required: "Required" })}
                    className={inputClass}
                    placeholder="Street address"
                  />
                  {errors.address?.line1 && <p className={errClass}>{errors.address.line1.message}</p>}
                </div>
                <div className="grid sm:grid-cols-3 gap-5">
                  <div>
                    <label className="text-sm font-medium">City</label>
                    <input {...register("address.city", { required: "Required" })} className={inputClass} />
                    {errors.address?.city && <p className={errClass}>{errors.address.city.message}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-medium">State</label>
                    <input {...register("address.state", { required: "Required" })} className={inputClass} />
                    {errors.address?.state && <p className={errClass}>{errors.address.state.message}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-medium">Pincode</label>
                    <input
                      {...register("address.pincode", {
                        required: "Required",
                        pattern: { value: /^[0-9]{6}$/, message: "6 digits" },
                      })}
                      className={inputClass}
                    />
                    {errors.address?.pincode && <p className={errClass}>{errors.address.pincode.message}</p>}
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <label className="text-sm font-medium">Course</label>
                <div className="mt-2 grid sm:grid-cols-3 gap-3">
                  {courses.map((c) => (
                    <label
                      key={c}
                      className="flex items-center gap-2 rounded-xl border border-primary-200 dark:border-primary-700 px-4 py-3 text-sm cursor-pointer has-[:checked]:border-primary-600 has-[:checked]:bg-primary-50 dark:has-[:checked]:bg-primary-900/40 transition"
                    >
                      <input
                        type="radio"
                        value={c}
                        {...register("course", { required: "Please select a course" })}
                        className="accent-primary-600"
                      />
                      {c}
                    </label>
                  ))}
                </div>
                {errors.course && <p className={errClass}>{errors.course.message}</p>}
              </div>
            )}

            {step === 3 && (
              <div>
                <label className="text-sm font-medium">Transfer Certificate (optional)</label>
                <p className="text-xs text-ink/50 dark:text-white/50 mt-1 mb-3">
                  PDF, JPG, or PNG — up to 5MB. You can also add this later from your dashboard.
                </p>
                <label className="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-primary-200 dark:border-primary-700 py-10 cursor-pointer hover:border-primary-500 transition">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                    onChange={(e) => setTcFile(e.target.files?.[0] || null)}
                  />
                  <span className="text-sm text-ink/60 dark:text-white/60">
                    {tcFile ? tcFile.name : "Click to choose a file"}
                  </span>
                </label>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-5">
                <div>
                  <label className="text-sm font-medium">Password</label>
                  <input
                    type="password"
                    {...register("password", {
                      required: "Required",
                      minLength: { value: 6, message: "At least 6 characters" },
                    })}
                    className={inputClass}
                  />
                  {errors.password && <p className={errClass}>{errors.password.message}</p>}
                </div>
                <div>
                  <label className="text-sm font-medium">Confirm password</label>
                  <input
                    type="password"
                    {...register("confirmPassword", {
                      required: "Required",
                      validate: (val, formValues) =>
                        val === formValues.password || "Passwords do not match",
                    })}
                    className={inputClass}
                  />
                  {errors.confirmPassword && <p className={errClass}>{errors.confirmPassword.message}</p>}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex items-center justify-between">
          <button
            type="button"
            onClick={goBack}
            disabled={step === 0}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-medium border border-ink/15 dark:border-white/20 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-ink/5 dark:hover:bg-white/10 transition"
          >
            <HiOutlineArrowLeft /> Back
          </button>

          {step < steps.length - 1 ? (
            <button
              type="button"
              onClick={goNext}
              className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full text-sm font-medium bg-primary-700 text-white hover:bg-primary-800 transition"
            >
              Continue <HiOutlineArrowRight />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-full text-sm font-medium bg-primary-700 text-white hover:bg-primary-800 transition disabled:opacity-60"
            >
              {isSubmitting ? "Submitting..." : "Submit application"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Register;
