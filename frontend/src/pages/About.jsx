import { motion } from "framer-motion";
import { HiOutlineLibrary, HiOutlineUserGroup, HiOutlineGlobeAlt } from "react-icons/hi";

const stats = [
  { label: "Departments", value: "30+", icon: HiOutlineLibrary },
  { label: "Students enrolled", value: "12,000+", icon: HiOutlineUserGroup },
  { label: "NAAC Grade", value: "A+", icon: HiOutlineGlobeAlt },
];

const About = () => {
  return (
    <div className="max-w-5xl mx-auto px-5 sm:px-8 py-16">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xs font-semibold tracking-[0.15em] uppercase text-primary-600"
      >
        About the university
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="mt-3 font-display text-4xl sm:text-5xl font-semibold tracking-tight max-w-3xl"
      >
        Dr. Harisingh Gour Vishwavidyalaya, Sagar
      </motion.h1>
      <p className="mt-6 text-lg text-ink/70 dark:text-white/70 max-w-2xl">
        Established in 1946 by Dr. Harisingh Gour, this central university in Sagar,
        Madhya Pradesh has grown into one of India's oldest and most respected seats
        of higher learning — home to the Department of Computer Science and
        Applications and dozens of other schools spanning the sciences, humanities,
        law, and engineering.
      </p>

      <div className="mt-12 grid sm:grid-cols-3 gap-5">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="rounded-2xl border border-primary-100 dark:border-primary-800 p-6 text-center"
          >
            <s.icon className="mx-auto text-primary-600 dark:text-primary-300" size={28} />
            <p className="mt-3 font-display text-3xl font-semibold">{s.value}</p>
            <p className="text-sm text-ink/60 dark:text-white/60 mt-1">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="font-display text-2xl font-semibold">Our mission</h2>
          <p className="mt-3 text-ink/70 dark:text-white/70">
            To provide accessible, high-quality education that prepares students for
            both academic distinction and professional careers — with a growing focus
            on computing, applied sciences, and industry-ready skills.
          </p>
        </div>
        <div>
          <h2 className="font-display text-2xl font-semibold">Why apply here</h2>
          <p className="mt-3 text-ink/70 dark:text-white/70">
            A century-strong academic legacy, an experienced faculty, active student
            communities, and a modern admissions process that keeps you informed at
            every stage — from application to enrollment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
