import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";

const Authenticate = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="text-center max-w-sm w-full">
        <div className="w-16 h-16 rounded-2xl bg-red-600/15 border border-red-500/25 flex items-center justify-center mx-auto mb-6">
          <LogIn size={28} className="text-red-400" />
        </div>
        <h2 className="text-2xl font-black text-white mb-2">Please sign in</h2>
        <p className="text-gray-400 mb-8">
          You need to be authenticated to access{" "}
          <span className="text-white font-semibold">Octo<span className="text-red-500">CV</span></span>.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="w-full bg-red-600 hover:bg-red-500 text-white font-semibold rounded-xl py-3 transition-colors"
        >
          Sign in
        </button>
        <p className="text-gray-500 text-sm mt-4">
          No account?{" "}
          <Link to="/signup" className="text-red-400 hover:text-red-300 transition-colors">Create one</Link>
        </p>
      </div>
    </div>
  );
};

export default Authenticate;
