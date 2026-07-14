import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HiOutlineArrowRight } from "react-icons/hi";
import SealBadge from "./SealBadge";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: "easeOut" },
  }),
};

const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Ambient backdrop */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--color-primary-100),_transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top,_var(--color-primary-900),_transparent_60%)]" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-16 pb-24 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <motion.p
            initial="hidden"
            animate="visible"
            custom={0}
            variants={fadeUp}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.15em] uppercase text-primary-700 dark:text-primary-300 bg-primary-50 dark:bg-primary-900/40 px-3 py-1.5 rounded-full border border-primary-200 dark:border-primary-700"
          >
            Admissions open · Session 2026–27
          </motion.p>

          <motion.h1
            initial="hidden"
            animate="visible"
            custom={1}
            variants={fadeUp}
            className="mt-6 font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight"
          >
            Your admission,
            <br />
            <span className="text-primary-600">tracked from day one.</span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            custom={2}
            variants={fadeUp}
            className="mt-6 text-lg text-ink/70 dark:text-white/70 max-w-md"
          >
            Apply to Dr. Harisingh Gour Vishwavidyalaya in minutes. Every application
            gets a unique Admission ID the moment you register — track its status
            from submission to approval, in one place.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            custom={3}
            variants={fadeUp}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Link
              to="/register"
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-primary-700 text-white font-medium shadow-lg shadow-primary-700/25 hover:bg-primary-800 hover:shadow-xl hover:shadow-primary-700/30 transition-all"
            >
              Start your application
              <HiOutlineArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/about"
              className="px-6 py-3.5 rounded-full font-medium text-ink dark:text-white border border-ink/15 dark:border-white/20 hover:bg-ink/5 dark:hover:bg-white/10 transition"
            >
              Explore the college
            </Link>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            custom={4}
            variants={fadeUp}
            className="mt-10 flex items-center gap-8 text-sm text-ink/60 dark:text-white/60"
          >
            <div>
              <p className="font-display text-2xl font-semibold text-ink dark:text-white">40+</p>
              <p>Undergraduate &amp; PG courses</p>
            </div>
            <div className="w-px h-10 bg-ink/10 dark:bg-white/10" />
            <div>
              <p className="font-display text-2xl font-semibold text-ink dark:text-white">1962</p>
              <p>Established, NAAC A+ rated</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="flex justify-center md:justify-end"
        >
          <div className="glass-card rounded-3xl p-8 flex flex-col items-center gap-5 shadow-xl shadow-primary-900/5">
            <SealBadge admissionId="ADM-2026-084213" size="lg" />
            <div className="text-center">
              <p className="text-xs uppercase tracking-widest text-ink/50 dark:text-white/50">
                Status
              </p>
              <p className="mt-1 font-semibold text-primary-700 dark:text-primary-300">
                Under Review
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
