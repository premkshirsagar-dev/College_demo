import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-5">
    <p className="font-mono text-primary-500 text-sm">404</p>
    <h1 className="mt-3 font-display text-3xl font-semibold">This page doesn't exist</h1>
    <p className="mt-2 text-ink/60 dark:text-white/60">
      Check the address, or head back to the homepage.
    </p>
    <Link
      to="/"
      className="mt-6 px-6 py-3 rounded-full bg-primary-700 text-white font-medium hover:bg-primary-800 transition"
    >
      Back to home
    </Link>
  </div>
);

export default NotFound;
