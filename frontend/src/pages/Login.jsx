import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(API + '/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw data;
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } catch (err) {
      alert(err.msg || 'Login failed');
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = API + '/api/auth/google'; 
    // backend should redirect to Google OAuth
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="w-full max-w-md bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 sm:p-10 flex flex-col gap-6"
      >
        <h2 className="text-3xl font-bold text-gray-800 text-center">Welcome Back</h2>
        <p className="text-center text-gray-600">Login to your account to continue</p>

        {/* --- Email/Password Login Form --- */}
        <form className="flex flex-col gap-4" onSubmit={submit}>
          <input
            required
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
          />
          <input
            required
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
          />
          <button
            type="submit"
            className="mt-2 bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 rounded-lg shadow-md transition transform hover:scale-105"
          >
            Login
          </button>
        </form>

        {/* --- OR divider --- */}
        <div className="flex items-center gap-2 my-2">
          <hr className="flex-1 border-gray-300" />
          <span className="text-gray-400 text-sm">OR</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* --- Google Login --- */}
        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 hover:bg-gray-100 transition"
        >
          <FcGoogle size={22} />
          <span className="font-medium text-gray-700">Continue with Google</span>
        </button>

        <p className="text-center text-gray-500 mt-2 text-sm">
          Don&apos;t have an account?{' '}
          <span
            onClick={() => navigate('/register')}
            className="text-purple-500 hover:underline cursor-pointer"
          >
            Register
          </span>
        </p>
      </motion.div>
    </div>
  );
}
