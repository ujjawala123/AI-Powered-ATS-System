import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import { toast } from "react-toastify";
import {
  FaBrain,
  FaArrowRight,
  FaShieldAlt,
  FaChartLine,
  FaUserTie,
  FaRobot,
  FaBolt,
  FaCheckCircle,
  FaUserCheck,
  FaStar,
  FaMagic,
} from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // =====================================================
  // Handle Input
  // =====================================================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // =====================================================
  // Handle Login
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    try {
      setLoading(true);

      const response = await login(formData);

      // Save JWT Token
      localStorage.setItem("token", response.token);

      // Save User Details
      localStorage.setItem(
        "user",
        JSON.stringify(response.data)
      );

      toast.success(
        response.message || "Login Successful!"
      );

      // Redirect Based on Role
      if (response.data.role === "applicant") {
        navigate("/applicant/dashboard");
      } else if (response.data.role === "recruiter") {
        navigate("/recruiter/dashboard");
      } else {
        toast.error("Invalid user role.");

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#050507] text-white flex items-center justify-center px-4 py-8">

      {/* =====================================================
          ANIMATED BACKGROUND
          ===================================================== */}

      <div className="absolute inset-0 pointer-events-none overflow-hidden">

        {/* Main Cyan Glow */}

        <div
          className="
            absolute
            -top-48
            -left-48
            w-[520px]
            h-[520px]
            rounded-full
            bg-cyan-500/15
            blur-[120px]
            animate-pulse
          "
        />

        {/* Purple Glow */}

        <div
          className="
            absolute
            -bottom-48
            -right-48
            w-[520px]
            h-[520px]
            rounded-full
            bg-violet-600/15
            blur-[120px]
            animate-pulse
          "
          style={{
            animationDelay: "1.5s",
          }}
        />

        {/* Pink Glow */}

        <div
          className="
            absolute
            top-1/3
            right-1/4
            w-[300px]
            h-[300px]
            rounded-full
            bg-fuchsia-500/10
            blur-[110px]
            animate-pulse
          "
          style={{
            animationDelay: "3s",
          }}
        />

        {/* =================================================
            BACKGROUND GRID
            ================================================= */}

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* =================================================
            FLOATING DOTS
            ================================================= */}

        <div
          className="
            absolute
            top-[12%]
            left-[15%]
            w-3
            h-3
            rounded-full
            bg-cyan-400
            shadow-[0_0_25px_rgba(34,211,238,0.9)]
            animate-bounce
          "
        />

        <div
          className="
            absolute
            top-[24%]
            right-[14%]
            w-2
            h-2
            rounded-full
            bg-violet-400
            shadow-[0_0_20px_rgba(167,139,250,0.9)]
            animate-ping
          "
        />

        <div
          className="
            absolute
            bottom-[17%]
            left-[17%]
            w-2
            h-2
            rounded-full
            bg-fuchsia-400
            shadow-[0_0_20px_rgba(232,121,249,0.9)]
            animate-pulse
          "
        />

      </div>

      {/* =====================================================
          FLOATING ATS CARDS
          ===================================================== */}

      {/* Candidate Matched - Top Left */}

      <div
        className="
          hidden
          xl:flex
          absolute
          top-[15%]
          left-[6%]
          items-center
          gap-3
          px-4
          py-3
          rounded-2xl
          border
          border-cyan-400/20
          bg-white/[0.055]
          backdrop-blur-xl
          shadow-[0_15px_50px_rgba(0,0,0,0.35)]
          animate-[floatOne_5s_ease-in-out_infinite]
        "
      >

        <div className="w-10 h-10 rounded-xl bg-cyan-400/10 flex items-center justify-center">
          <FaUserCheck className="text-cyan-400" />
        </div>

        <div>
          <p className="text-xs text-zinc-500">
            AI Recruitment
          </p>

          <p className="text-sm font-semibold">
            Candidate Matched
          </p>
        </div>

        <FaCheckCircle className="text-green-400 ml-1" />

      </div>

      {/* ATS Score - Top Right */}

      <div
        className="
          hidden
          xl:flex
          absolute
          top-[22%]
          right-[6%]
          items-center
          gap-3
          px-4
          py-3
          rounded-2xl
          border
          border-violet-400/20
          bg-white/[0.055]
          backdrop-blur-xl
          shadow-[0_15px_50px_rgba(0,0,0,0.35)]
          animate-[floatTwo_6s_ease-in-out_infinite]
        "
      >

        <div
          className="
            w-11
            h-11
            rounded-full
            border-2
            border-violet-400/30
            flex
            items-center
            justify-center
            bg-violet-400/10
          "
        >
          <span className="text-sm font-bold text-violet-300">
            94%
          </span>
        </div>

        <div>
          <p className="text-xs text-zinc-500">
            Resume Analysis
          </p>

          <p className="text-sm font-semibold">
            Excellent ATS Score
          </p>
        </div>

      </div>

      {/* Interview Scheduled - Bottom Left */}

      <div
        className="
          hidden
          xl:flex
          absolute
          bottom-[17%]
          left-[7%]
          items-center
          gap-3
          px-4
          py-3
          rounded-2xl
          border
          border-fuchsia-400/20
          bg-white/[0.055]
          backdrop-blur-xl
          shadow-[0_15px_50px_rgba(0,0,0,0.35)]
          animate-[floatTwo_6s_ease-in-out_infinite]
        "
      >

        <div className="w-10 h-10 rounded-xl bg-fuchsia-400/10 flex items-center justify-center">
          <FaUserTie className="text-fuchsia-400" />
        </div>

        <div>
          <p className="text-xs text-zinc-500">
            Recruitment Pipeline
          </p>

          <p className="text-sm font-semibold">
            Interview Scheduled
          </p>
        </div>

        <FaCheckCircle className="text-green-400 ml-1" />

      </div>

      {/* AI Analysis - Bottom Right */}

      <div
        className="
          hidden
          xl:flex
          absolute
          bottom-[13%]
          right-[7%]
          items-center
          gap-3
          px-4
          py-3
          rounded-2xl
          border
          border-blue-400/20
          bg-white/[0.055]
          backdrop-blur-xl
          shadow-[0_15px_50px_rgba(0,0,0,0.35)]
          animate-[floatOne_5s_ease-in-out_infinite]
        "
      >

        <div className="w-10 h-10 rounded-xl bg-blue-400/10 flex items-center justify-center">
          <FaMagic className="text-blue-400" />
        </div>

        <div>
          <p className="text-xs text-zinc-500">
            Gemini AI
          </p>

          <p className="text-sm font-semibold">
            Resume Analysis Complete
          </p>
        </div>

      </div>

      {/* =====================================================
          MAIN LOGIN AREA
          ===================================================== */}

      <div
        className="
          relative
          w-full
          max-w-xl
          animate-[loginEnter_0.8s_ease-out]
          z-10
        "
      >

        {/* =================================================
            LOGO
            ================================================= */}

        <div className="flex justify-center mb-5">

          <div className="group flex items-center gap-3">

            <div
              className="
                relative
                w-12
                h-12
                rounded-2xl
                bg-gradient-to-br
                from-cyan-400
                via-blue-500
                to-violet-600
                flex
                items-center
                justify-center
                shadow-[0_0_35px_rgba(34,211,238,0.3)]
                transition
                duration-500
                group-hover:scale-110
                group-hover:rotate-6
              "
            >

              <FaBrain className="text-white text-xl" />

              <div
                className="
                  absolute
                  inset-0
                  rounded-2xl
                  border
                  border-cyan-300/50
                  animate-ping
                  opacity-20
                "
              />

            </div>

            <div>

              <h1 className="text-2xl font-black">
                AI
                <span className="text-cyan-400">
                  ATS
                </span>
              </h1>

              <p className="text-[10px] text-zinc-500 uppercase tracking-[0.25em]">
                Intelligent Hiring
              </p>

            </div>

          </div>

        </div>

        {/* =================================================
            LOGIN CARD
            ================================================= */}

        <div
          className="
            relative
            rounded-[30px]
            border
            border-white/10
            bg-white/[0.055]
            backdrop-blur-2xl
            p-7
            sm:p-8
            shadow-[0_30px_100px_rgba(0,0,0,0.65)]
            overflow-hidden
          "
        >

          {/* Card Gradient */}

          <div
            className="
              absolute
              inset-0
              pointer-events-none
              bg-gradient-to-br
              from-cyan-400/[0.05]
              via-transparent
              to-violet-500/[0.06]
            "
          />

          {/* Top Line */}

          <div
            className="
              absolute
              top-0
              left-1/2
              -translate-x-1/2
              w-48
              h-px
              bg-gradient-to-r
              from-transparent
              via-cyan-400
              to-transparent
              shadow-[0_0_20px_rgba(34,211,238,0.8)]
            "
          />

          {/* =================================================
              HEADING
              ================================================= */}

          <div className="relative text-center">

            <div
              className="
                inline-flex
                items-center
                gap-2
                px-3
                py-1.5
                rounded-full
                bg-cyan-400/10
                border
                border-cyan-400/20
                text-cyan-300
                text-xs
                font-semibold
                mb-3
              "
            >

              <FaRobot />

              AI-Powered Recruitment

            </div>

            <h2 className="text-3xl sm:text-4xl font-black">

              Welcome{" "}

              <span
                className="
                  text-transparent
                  bg-clip-text
                  bg-gradient-to-r
                  from-cyan-300
                  via-blue-400
                  to-violet-400
                "
              >
                Back
              </span>

            </h2>

            <p className="text-zinc-500 text-sm mt-2">
              Sign in and continue your hiring journey.
            </p>

          </div>

          {/* =================================================
              LOGIN FORM
              ================================================= */}

          <form
            onSubmit={handleSubmit}
            className="relative mt-6 space-y-4"
          >

            {/* Email */}

            <div>

              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Email address
              </label>

              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
                className="
                  w-full
                  rounded-xl
                  border
                  border-zinc-800
                  bg-[#111114]
                  px-4
                  py-3.5
                  text-white
                  placeholder-zinc-600
                  outline-none
                  transition-all
                  duration-300
                  focus:border-cyan-400/60
                  focus:ring-4
                  focus:ring-cyan-400/10
                "
              />

            </div>

            {/* Password */}

            <div>

              <div className="flex items-center justify-between mb-2">

                <label className="text-sm font-medium text-zinc-300">
                  Password
                </label>

                <button
                  type="button"
                  className="
                    text-xs
                    text-zinc-500
                    hover:text-cyan-400
                    transition
                  "
                >
                  Forgot password?
                </button>

              </div>

              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="current-password"
                className="
                  w-full
                  rounded-xl
                  border
                  border-zinc-800
                  bg-[#111114]
                  px-4
                  py-3.5
                  text-white
                  placeholder-zinc-600
                  outline-none
                  transition-all
                  duration-300
                  focus:border-violet-400/60
                  focus:ring-4
                  focus:ring-violet-400/10
                "
              />

            </div>

            {/* Login Button */}

            <button
              type="submit"
              disabled={loading}
              className="
                group
                relative
                w-full
                flex
                items-center
                justify-center
                gap-3
                overflow-hidden
                rounded-xl
                bg-gradient-to-r
                from-cyan-400
                via-blue-500
                to-violet-500
                py-3.5
                font-bold
                text-white
                shadow-lg
                shadow-cyan-500/10
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:shadow-xl
                hover:shadow-cyan-500/20
                disabled:opacity-60
                disabled:cursor-not-allowed
              "
            >

              {/* Shine Animation */}

              <span
                className="
                  absolute
                  inset-0
                  -translate-x-full
                  group-hover:translate-x-full
                  transition-transform
                  duration-1000
                  bg-gradient-to-r
                  from-transparent
                  via-white/20
                  to-transparent
                "
              />

              {loading ? (
                <>
                  <span
                    className="
                      w-5
                      h-5
                      border-2
                      border-white/30
                      border-t-white
                      rounded-full
                      animate-spin
                    "
                  />

                  Signing in...
                </>
              ) : (
                <>
                  Sign in to AIATS

                  <FaArrowRight
                    className="
                      text-sm
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                  />
                </>
              )}

            </button>

          </form>

          {/* =================================================
              SMALL FEATURE CARDS
              ================================================= */}

          <div className="relative grid grid-cols-3 gap-2 mt-5">

            <div
              className="
                rounded-xl
                border
                border-white/5
                bg-white/[0.025]
                p-3
                text-center
                transition
                hover:-translate-y-1
                hover:border-cyan-400/20
              "
            >
              <FaChartLine className="mx-auto text-cyan-400 mb-1" />

              <p className="text-[10px] sm:text-xs text-zinc-500">
                Smart Analytics
              </p>
            </div>

            <div
              className="
                rounded-xl
                border
                border-white/5
                bg-white/[0.025]
                p-3
                text-center
                transition
                hover:-translate-y-1
                hover:border-violet-400/20
              "
            >
              <FaBolt className="mx-auto text-violet-400 mb-1" />

              <p className="text-[10px] sm:text-xs text-zinc-500">
                Faster Hiring
              </p>
            </div>

            <div
              className="
                rounded-xl
                border
                border-white/5
                bg-white/[0.025]
                p-3
                text-center
                transition
                hover:-translate-y-1
                hover:border-fuchsia-400/20
              "
            >
              <FaUserTie className="mx-auto text-fuchsia-400 mb-1" />

              <p className="text-[10px] sm:text-xs text-zinc-500">
                Better Candidates
              </p>
            </div>

          </div>

          {/* =================================================
              DIVIDER
              ================================================= */}

          <div className="relative flex items-center gap-4 my-5">

            <div className="h-px bg-zinc-800 flex-1" />

            <span className="text-[10px] text-zinc-600 tracking-widest">
              NEW TO AIATS?
            </span>

            <div className="h-px bg-zinc-800 flex-1" />

          </div>

          {/* Register */}

          <Link
            to="/register"
            className="
              group
              w-full
              flex
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-zinc-800
              bg-zinc-900/50
              py-3
              text-sm
              font-semibold
              text-zinc-300
              transition-all
              duration-300
              hover:border-cyan-400/30
              hover:bg-cyan-400/5
              hover:text-white
            "
          >

            Create your AIATS account

            <FaArrowRight
              className="
                text-xs
                opacity-0
                -translate-x-2
                group-hover:opacity-100
                group-hover:translate-x-0
                transition-all
              "
            />

          </Link>

          {/* Security */}

          <div className="flex items-center justify-center gap-2 mt-4">

            <FaShieldAlt className="text-cyan-400 text-xs" />

            <span className="text-[10px] text-zinc-600">
              Secure authentication · Protected candidate data
            </span>

          </div>

        </div>

        {/* Footer */}

        <p className="text-center text-[10px] text-zinc-700 mt-4">
          © {new Date().getFullYear()} AIATS · Intelligent Applicant Tracking System
        </p>

      </div>

      {/* =====================================================
          CUSTOM ANIMATIONS
          ===================================================== */}

      <style>
        {`
          @keyframes loginEnter {
            0% {
              opacity: 0;
              transform: translateY(30px) scale(0.96);
            }

            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          @keyframes floatOne {
            0%,
            100% {
              transform: translateY(0) rotate(0deg);
            }

            50% {
              transform: translateY(-14px) rotate(1deg);
            }
          }

          @keyframes floatTwo {
            0%,
            100% {
              transform: translateY(0) rotate(0deg);
            }

            50% {
              transform: translateY(12px) rotate(-1deg);
            }
          }
        `}
      </style>

    </div>
  );
};

export default Login;