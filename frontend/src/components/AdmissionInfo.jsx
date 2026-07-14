import { motion } from "framer-motion";
import {
  HiOutlineDocumentText,
  HiOutlineUpload,
  HiOutlineBadgeCheck,
  HiOutlineAcademicCap,
} from "react-icons/hi";

const steps = [
  {
    icon: HiOutlineDocumentText,
    title: "Fill your details",
    desc: "Personal, contact, and course information across a guided multi-step form.",
  },
  {
    icon: HiOutlineUpload,
    title: "Upload documents",
    desc: "Add your Transfer Certificate — PDF, JPG, or PNG, up to 5MB.",
  },
  {
    icon: HiOutlineBadgeCheck,
    title: "Get your Admission ID",
    desc: "A unique ID is issued instantly and becomes your permanent reference.",
  },
  {
    icon: HiOutlineAcademicCap,
    title: "Track approval",
    desc: "Watch your status move from Pending to Approved on your dashboard.",
  },
];

const courses = [
  { name: "BCA", full: "Bachelor of Computer Applications", duration: "3 years" },
  { name: "B.Sc.", full: "Bachelor of Science", duration: "3 years" },
  { name: "B.Com.", full: "Bachelor of Commerce", duration: "3 years" },
  { name: "MCA", full: "Master of Computer Applications", duration: "2 years" },
  { name: "M.Sc.", full: "Master of Science", duration: "2 years" },
  { name: "MBA", full: "Master of Business Administration", duration: "2 years" },
];

const AdmissionInfo = () => {
  return (
    <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold tracking-[0.15em] uppercase text-primary-600">
          How it works
        </p>
        <h2 className="mt-3 font-display text-3xl sm:text-4xl font-semibold tracking-tight">
          Four steps from application to admission
        </h2>
      </div>

      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="rounded-2xl border border-primary-100 dark:border-primary-800 p-6 bg-white dark:bg-dark-surface hover:shadow-lg hover:shadow-primary-900/5 hover:-translate-y-1 transition-all"
          >
            <div className="w-11 h-11 rounded-xl bg-primary-50 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 flex items-center justify-center mb-4">
              <step.icon size={22} />
            </div>
            <h3 className="font-semibold text-ink dark:text-white">{step.title}</h3>
            <p className="mt-1.5 text-sm text-ink/60 dark:text-white/60">{step.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-20">
        <p className="text-xs font-semibold tracking-[0.15em] uppercase text-primary-600">
          Programs offered
        </p>
        <h2 className="mt-3 font-display text-3xl sm:text-4xl font-semibold tracking-tight">
          Choose your course
        </h2>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {courses.map((course, i) => (
            <motion.div
              key={course.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              className="rounded-2xl p-6 glass-card hover:shadow-lg transition-shadow"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-display text-2xl font-semibold text-primary-700 dark:text-primary-300">
                  {course.name}
                </span>
                <span className="text-xs text-gold-600 dark:text-gold-400 font-medium">
                  {course.duration}
                </span>
              </div>
              <p className="mt-2 text-sm text-ink/60 dark:text-white/60">{course.full}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdmissionInfo;
