import { Link } from "react-router-dom";
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from "react-icons/hi";

const Footer = () => {
  return (
    <footer className="border-t border-primary-100 dark:border-primary-800 bg-parchment dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <span className="font-display text-lg font-semibold">
            Harisingh<span className="text-primary-600">Admissions</span>
          </span>
          <p className="mt-3 text-sm text-ink/60 dark:text-white/60 max-w-xs">
            The digital admissions portal of Dr. Harisingh Gour Vishwavidyalaya, Sagar —
            built to make applying simple, transparent, and fast.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-sm mb-3 uppercase tracking-wide text-primary-700 dark:text-primary-300">
            Navigate
          </h4>
          <ul className="space-y-2 text-sm text-ink/70 dark:text-white/70">
            <li><Link to="/" className="hover:text-primary-600">Home</Link></li>
            <li><Link to="/about" className="hover:text-primary-600">About the College</Link></li>
            <li><Link to="/register" className="hover:text-primary-600">Apply for Admission</Link></li>
            <li><Link to="/contact" className="hover:text-primary-600">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-sm mb-3 uppercase tracking-wide text-primary-700 dark:text-primary-300">
            Access
          </h4>
          <ul className="space-y-2 text-sm text-ink/70 dark:text-white/70">
            <li><Link to="/login" className="hover:text-primary-600">Student Login</Link></li>
            <li><Link to="/admin/login" className="hover:text-primary-600">Admin Login</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-sm mb-3 uppercase tracking-wide text-primary-700 dark:text-primary-300">
            Reach us
          </h4>
          <ul className="space-y-2 text-sm text-ink/70 dark:text-white/70">
            <li className="flex items-center gap-2">
              <HiOutlineMail /> admissions@dhsgsu.ac.in
            </li>
            <li className="flex items-center gap-2">
              <HiOutlinePhone /> +91 7582 265 275
            </li>
            <li className="flex items-center gap-2">
              <HiOutlineLocationMarker /> Sagar, Madhya Pradesh, India
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-100 dark:border-primary-800 py-5 text-center text-xs text-ink/50 dark:text-white/50">
        © {new Date().getFullYear()} Dr. Harisingh Gour Vishwavidyalaya, Sagar. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
