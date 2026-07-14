import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from "react-icons/hi";

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    // Demo submission — wire this to a /api/contact endpoint if you add one.
    await new Promise((r) => setTimeout(r, 800));
    toast.success("Message sent. We'll get back to you soon.");
    reset();
  };

  return (
    <div className="max-w-5xl mx-auto px-5 sm:px-8 py-16 grid md:grid-cols-2 gap-12">
      <div>
        <p className="text-xs font-semibold tracking-[0.15em] uppercase text-primary-600">
          Get in touch
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight">
          We're here to help
        </h1>
        <p className="mt-4 text-ink/70 dark:text-white/70">
          Questions about eligibility, courses, or your application status?
          Reach the admissions office directly.
        </p>

        <ul className="mt-8 space-y-4 text-sm">
          <li className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-full bg-primary-50 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 flex items-center justify-center">
              <HiOutlineMail />
            </span>
            admissions@dhsgsu.ac.in
          </li>
          <li className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-full bg-primary-50 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 flex items-center justify-center">
              <HiOutlinePhone />
            </span>
            +91 7582 265 275
          </li>
          <li className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-full bg-primary-50 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 flex items-center justify-center">
              <HiOutlineLocationMarker />
            </span>
            Dr. Harisingh Gour Vishwavidyalaya, Sagar, M.P. 470003
          </li>
        </ul>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="glass-card rounded-3xl p-8 space-y-5">
        <div>
          <label className="text-sm font-medium">Full name</label>
          <input
            {...register("name", { required: "Name is required" })}
            className="mt-1.5 w-full rounded-xl border border-primary-200 dark:border-primary-700 bg-transparent px-4 py-2.5 text-sm focus:border-primary-500 outline-none"
            placeholder="Your name"
          />
          {errors.name && <p className="text-danger-500 text-xs mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="mt-1.5 w-full rounded-xl border border-primary-200 dark:border-primary-700 bg-transparent px-4 py-2.5 text-sm focus:border-primary-500 outline-none"
            placeholder="you@example.com"
          />
          {errors.email && <p className="text-danger-500 text-xs mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="text-sm font-medium">Message</label>
          <textarea
            rows={4}
            {...register("message", { required: "Message is required" })}
            className="mt-1.5 w-full rounded-xl border border-primary-200 dark:border-primary-700 bg-transparent px-4 py-2.5 text-sm focus:border-primary-500 outline-none resize-none"
            placeholder="How can we help?"
          />
          {errors.message && (
            <p className="text-danger-500 text-xs mt-1">{errors.message.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 rounded-full bg-primary-700 text-white font-medium hover:bg-primary-800 transition disabled:opacity-60"
        >
          {isSubmitting ? "Sending..." : "Send message"}
        </button>
      </form>
    </div>
  );
};

export default Contact;
