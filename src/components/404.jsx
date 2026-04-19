import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const NotFound = () => (
  <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
    <div className="text-center">
      <p className="text-8xl font-black text-red-600 mb-4">404</p>
      <h1 className="text-2xl font-bold text-white mb-2">Page not found</h1>
      <p className="text-gray-400 mb-8">The page you're looking for doesn't exist.</p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-xl px-6 py-3 transition-colors"
      >
        <ArrowLeft size={16} />
        Back to home
      </Link>
    </div>
  </div>
);

export default NotFound;
