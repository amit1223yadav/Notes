import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        (import.meta.env.VITE_API_URL || "http://localhost:5000") +
          "/api/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        }
      );
      const data = await res.json();
      if (!res.ok) throw data;
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err) {
      alert(err.msg || "Error registering");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      <motion.div
        className="w-full max-w-md p-8 rounded-2xl shadow-2xl bg-white/30 dark:bg-black/30 backdrop-blur-xl"
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-slate-900 dark:text-white">
          Create Account
        </h2>
        <form className="flex flex-col gap-4" onSubmit={submit}>
          <input
            required
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none bg-white/70 dark:bg-slate-800/70"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            required
            type="email"
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none bg-white/70 dark:bg-slate-800/70"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            required
            type="password"
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none bg-white/70 dark:bg-slate-800/70"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-lg shadow-lg transition"
          >
            Register
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
