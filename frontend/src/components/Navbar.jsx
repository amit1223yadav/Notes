import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react"; // hamburger + close icons

export default function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="w-full bg-white/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
              SN
            </div>
            <span className="font-semibold text-gray-800">ScalableNotes</span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-5">
            <Link to="/" className="text-sm text-gray-700 hover:text-purple-600 transition">
              Home
            </Link>
            <Link to="/dashboard" className="text-sm text-gray-700 hover:text-purple-600 transition">
              Dashboard
            </Link>
            <button
              onClick={logout}
              className="px-3 py-1 rounded-md bg-red-500 text-white text-sm hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md hover:bg-gray-100 transition"
            >
              {isOpen ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t shadow-sm">
          <div className="flex flex-col space-y-2 px-4 py-3">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="text-sm text-gray-700 hover:text-purple-600 transition"
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              onClick={() => setIsOpen(false)}
              className="text-sm text-gray-700 hover:text-purple-600 transition"
            >
              Dashboard
            </Link>
            <button
              onClick={() => {
                setIsOpen(false);
                logout();
              }}
              className="px-3 py-1 rounded-md bg-red-500 text-white text-sm hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
