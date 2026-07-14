import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { HiOutlineMenu, HiOutlineX, HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import { useAuth } from "../context/AuthContext";

const navLinkClass = ({ isActive }) =>
  `text-sm font-medium transition-colors ${
    isActive
      ? "text-primary-700 dark:text-primary-300"
      : "text-ink/70 hover:text-primary-700 dark:text-white/70 dark:hover:text-primary-300"
  }`;

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, logout, darkMode, setDarkMode } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-primary-100/70 dark:border-primary-800/60 bg-parchment/80 dark:bg-dark-bg/80 backdrop-blur-lg">
      <nav className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center text-gold-400 font-display font-semibold text-sm">
            H
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">
            Harisingh<span className="text-primary-600">Admissions</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <NavLink to="/" className={navLinkClass} end>
            Home
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            About
          </NavLink>
          <NavLink to="/contact" className={navLinkClass}>
            Contact
          </NavLink>
          {user?.role === "student" && (
            <NavLink to="/dashboard" className={navLinkClass}>
              Dashboard
            </NavLink>
          )}
          {user?.role === "admin" && (
            <NavLink to="/admin/dashboard" className={navLinkClass}>
              Admin Panel
            </NavLink>
          )}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle dark mode"
            className="w-9 h-9 rounded-full flex items-center justify-center border border-primary-200 dark:border-primary-700 text-primary-700 dark:text-primary-300 hover:bg-primary-50 dark:hover:bg-dark-surface-2 transition"
          >
            {darkMode ? <HiOutlineSun size={18} /> : <HiOutlineMoon size={18} />}
          </button>

          {user ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-full text-sm font-medium bg-ink text-white dark:bg-white dark:text-ink hover:opacity-90 transition"
            >
              Log out
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-full text-sm font-medium text-primary-700 dark:text-primary-300 hover:bg-primary-50 dark:hover:bg-dark-surface-2 transition"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded-full text-sm font-medium bg-primary-700 text-white hover:bg-primary-800 transition shadow-sm shadow-primary-700/30"
              >
                Apply now
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden p-2 text-ink dark:text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <HiOutlineX size={24} /> : <HiOutlineMenu size={24} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-primary-100 dark:border-primary-800 bg-parchment dark:bg-dark-bg px-5 py-4 space-y-4">
          <NavLink to="/" className={navLinkClass} onClick={() => setOpen(false)} end>
            Home
          </NavLink>
          <NavLink to="/about" className={navLinkClass} onClick={() => setOpen(false)}>
            About
          </NavLink>
          <NavLink to="/contact" className={navLinkClass} onClick={() => setOpen(false)}>
            Contact
          </NavLink>
          {user?.role === "student" && (
            <NavLink to="/dashboard" className={navLinkClass} onClick={() => setOpen(false)}>
              Dashboard
            </NavLink>
          )}
          {user?.role === "admin" && (
            <NavLink to="/admin/dashboard" className={navLinkClass} onClick={() => setOpen(false)}>
              Admin Panel
            </NavLink>
          )}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="w-9 h-9 rounded-full flex items-center justify-center border border-primary-200 dark:border-primary-700"
            >
              {darkMode ? <HiOutlineSun size={18} /> : <HiOutlineMoon size={18} />}
            </button>
            {user ? (
              <button
                onClick={handleLogout}
                className="flex-1 px-4 py-2 rounded-full text-sm font-medium bg-ink text-white"
              >
                Log out
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="flex-1 text-center px-4 py-2 rounded-full text-sm font-medium border border-primary-200 dark:border-primary-700"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  onClick={() => setOpen(false)}
                  className="flex-1 text-center px-4 py-2 rounded-full text-sm font-medium bg-primary-700 text-white"
                >
                  Apply
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
