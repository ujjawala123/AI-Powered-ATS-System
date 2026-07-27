import { Link } from "react-router-dom";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";

const Landing = () => {
  return (
<div className="min-h-screen bg-[#0F0F10] text-white">      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-cyan-400">
          AI ATS
        </h1>

        <div className="space-x-4">
          <Link
            to="/login"
            className="px-5 py-2 rounded-lg border border-cyan-400 hover:bg-cyan-500 transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-600 transition"
          >
            Register
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-8 py-20 grid md:grid-cols-2 gap-10 items-center">
        {/* Left */}
        <div>
          <h1 className="text-5xl font-extrabold leading-tight">
            AI Powered
            <span className="text-cyan-400"> Applicant Tracking System</span>
          </h1>

          <p className="mt-6 text-lg text-gray-300">
            Upload your resume, compare it with any job description,
            receive an ATS score, and improve your chances of getting
            shortlisted.
          </p>

          <div className="mt-8 flex gap-4">
            <Link
              to="/register"
              className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-xl font-semibold flex items-center gap-2"
            >
              Get Started
              <FaArrowRight />
            </Link>

            <Link
              to="/login"
              className="border border-cyan-400 px-6 py-3 rounded-xl hover:bg-cyan-500 transition"
            >
              Login
            </Link>
          </div>
        </div>

        {/* Right */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl">
          <h2 className="text-2xl font-bold mb-6">
            Why Choose Our ATS?
          </h2>

          <div className="space-y-4">
            {[
              "Resume Parsing",
              "AI ATS Score",
              "Skill Matching",
              "Resume Suggestions",
              "Job Tracking",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <FaCheckCircle className="text-green-400" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;