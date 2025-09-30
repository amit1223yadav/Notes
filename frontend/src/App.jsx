import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { UserPlus, LogIn, LayoutDashboard } from "lucide-react";

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <motion.div
        className="max-w-3xl mx-auto text-center p-10 rounded-2xl shadow-2xl bg-white/30 backdrop-blur-lg"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-5xl font-extrabold mb-4 text-slate-900 dark:text-white">
          Scalable Notes App
        </h1>
        <p className="mb-6 text-slate-700 dark:text-slate-300">
         Experience a smarter, faster, and more enjoyable way to store and organize all your thoughts.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/register"
            className="px-6 py-3 flex items-center gap-2 rounded-full bg-indigo-600 text-white shadow hover:scale-110 transform transition"
          >
            <UserPlus size={18} /> Register
          </Link>
          <Link
            to="/login"
            className="px-6 py-3 flex items-center gap-2 rounded-full border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white transition"
          >
            <LogIn size={18} /> Login
          </Link>
          <Link
            to="/dashboard"
            className="px-6 py-3 flex items-center gap-2 rounded-full bg-slate-200 text-slate-800 hover:scale-110 transition"
          >
            <LayoutDashboard size={18} /> Dashboard
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
