import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register } from "../services/authService";

import {
  FaBrain,
  FaArrowRight,
  FaShieldAlt,
  FaUserTie,
  FaRobot,
  FaBolt,
  FaCheckCircle,
  FaUserCheck,
  FaMagic,
  FaBriefcase,
} from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "applicant",
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
  // Handle Register
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    // Password validation
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const response = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      // Save JWT Token
      localStorage.setItem("token", response.token);

      // Save User Details
      localStorage.setItem(
        "user",
        JSON.stringify(response.data)
      );

      toast.success(
        response.message || "Registration Successful"
      );

      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#050507] text-white flex items-center justify-center px-4 py-6">

      {/* =====================================================
          ANIMATED BACKGROUND
      ===================================================== */}

      <div className="absolute inset-0 pointer-events-none overflow-hidden">

        {/* Cyan Glow */}

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

        {/* Violet Glow */}

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

        {/* Fuchsia Glow */}

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
          FLOATING CARD - TOP LEFT
      ===================================================== */}

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
          z-10
        "
      >

        <div
          className="
            w-10
            h-10
            rounded-xl
            bg-cyan-400/10
            flex
            items-center
            justify-center
          "
        >
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

      {/* =====================================================
          FLOATING CARD - BOTTOM RIGHT
      ===================================================== */}

      <div
        className="
          hidden
          xl:flex
          absolute
          bottom-[15%]
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
          z-10
        "
      >

        <div
          className="
            w-10
            h-10
            rounded-xl
            bg-violet-400/10
            flex
            items-center
            justify-center
          "
        >
          <FaBriefcase className="text-violet-400" />
        </div>

        <div>
          <p className="text-xs text-zinc-500">
            AIATS Platform
          </p>

          <p className="text-sm font-semibold">
            Smarter Hiring Started
          </p>
        </div>

        <FaCheckCircle className="text-green-400 ml-1" />

      </div>

      {/* =====================================================
          MAIN REGISTER AREA
      ===================================================== */}

      <div
        className="
          relative
          w-full
          max-w-xl
          animate-[loginEnter_0.8s_ease-out]
          z-20
        "
      >

        {/* =================================================
            LOGO
        ================================================= */}

        <div className="flex justify-center mb-4">

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
            REGISTER CARD
        ================================================= */}

        <div
          className="
            relative
            rounded-[30px]
            border
            border-white/10
            bg-white/[0.055]
            backdrop-blur-2xl
            p-6
            sm:p-7
            shadow-[0_30px_100px_rgba(0,0,0,0.65)]
            overflow-hidden
          "
        >

          {/* =================================================
              CARD GRADIENT
          ================================================= */}

          <div
            className="
              absolute
              inset-0
              pointer-events-none
              bg-gradient-to-br
              from-cyan-400/[0.06]
              via-blue-500/[0.025]
              to-violet-500/[0.08]
            "
          />

          {/* Extra Gradient Glow */}

          <div
            className="
              absolute
              -top-24
              -right-24
              w-48
              h-48
              rounded-full
              bg-violet-500/10
              blur-3xl
              pointer-events-none
            "
          />

          <div
            className="
              absolute
              -bottom-24
              -left-24
              w-48
              h-48
              rounded-full
              bg-cyan-400/10
              blur-3xl
              pointer-events-none
            "
          />

          {/* =================================================
              TOP GRADIENT LINE
          ================================================= */}

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
                mb-2
              "
            >

              <FaRobot />

              AI-Powered Recruitment

            </div>

            <h2 className="text-3xl sm:text-4xl font-black">

              Create{" "}

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
                Account
              </span>

            </h2>

            <p className="text-zinc-500 text-sm mt-2">
              Start your smarter recruitment journey with AIATS.
            </p>

          </div>

          {/* =================================================
              FORM
          ================================================= */}

          <form
            onSubmit={handleSubmit}
            className="relative mt-5 space-y-4"
          >

            {/* =================================================
                NAME + EMAIL
            ================================================= */}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {/* Full Name */}

              <div>

                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  autoComplete="name"
                  required
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
                    hover:border-zinc-700
                  "
                />

              </div>

              {/* Email */}

              <div>

                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Email address
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
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
                    focus:border-blue-400/60
                    focus:ring-4
                    focus:ring-blue-400/10
                    hover:border-zinc-700
                  "
                />

              </div>

            </div>

            {/* =================================================
                PASSWORD + CONFIRM PASSWORD
            ================================================= */}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {/* Password */}

              <div>

                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create password"
                  autoComplete="new-password"
                  required
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
                    hover:border-zinc-700
                  "
                />

              </div>

              {/* Confirm Password */}

              <div>

                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Confirm Password
                </label>

                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  autoComplete="new-password"
                  required
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
                    focus:border-fuchsia-400/60
                    focus:ring-4
                    focus:ring-fuchsia-400/10
                    hover:border-zinc-700
                  "
                />

              </div>

            </div>

            {/* =================================================
                ROLE
            ================================================= */}

            <div>

              <label className="block text-sm font-medium text-zinc-300 mb-2">
                I want to join as
              </label>

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="
                  w-full
                  rounded-xl
                  border
                  border-zinc-800
                  bg-[#111114]
                  px-4
                  py-3.5
                  text-white
                  outline-none
                  transition-all
                  duration-300
                  focus:border-cyan-400/60
                  focus:ring-4
                  focus:ring-cyan-400/10
                  cursor-pointer
                  hover:border-zinc-700
                "
              >

                <option
                  value="applicant"
                  className="bg-[#111114]"
                >
                  Applicant — Find your next opportunity
                </option>

                <option
                  value="recruiter"
                  className="bg-[#111114]"
                >
                  Recruiter — Find the right talent
                </option>

              </select>

            </div>

            {/* =================================================
                CREATE ACCOUNT BUTTON
            ================================================= */}

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

              {/* Shine */}

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

                  Creating account...
                </>
              ) : (
                <>
                  Create AIATS Account

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

          <div className="relative grid grid-cols-3 gap-2 mt-4">

            <div
              className="
                rounded-xl
                border
                border-white/5
                bg-white/[0.025]
                p-2.5
                text-center
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-cyan-400/20
                hover:bg-cyan-400/[0.04]
              "
            >

              <FaUserCheck className="mx-auto text-cyan-400 mb-1" />

              <p className="text-[10px] sm:text-xs text-zinc-500">
                AI Matching
              </p>

            </div>

            <div
              className="
                rounded-xl
                border
                border-white/5
                bg-white/[0.025]
                p-2.5
                text-center
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-violet-400/20
                hover:bg-violet-400/[0.04]
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
                p-2.5
                text-center
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-fuchsia-400/20
                hover:bg-fuchsia-400/[0.04]
              "
            >

              <FaMagic className="mx-auto text-fuchsia-400 mb-1" />

              <p className="text-[10px] sm:text-xs text-zinc-500">
                Smart Analysis
              </p>

            </div>

          </div>

          {/* =================================================
              DIVIDER
          ================================================= */}

          <div className="relative flex items-center gap-4 my-4">

            <div className="h-px bg-zinc-800 flex-1" />

            <span className="text-[10px] text-zinc-600 tracking-widest">
              ALREADY A MEMBER?
            </span>

            <div className="h-px bg-zinc-800 flex-1" />

          </div>

          {/* =================================================
              LOGIN BUTTON
          ================================================= */}

          <Link
            to="/login"
            className="
              group
              relative
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

            Already have an account?

            <span className="text-cyan-400">
              Login
            </span>

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

          {/* =================================================
              SECURITY
          ================================================= */}

          <div className="flex items-center justify-center gap-2 mt-3">

            <FaShieldAlt className="text-cyan-400 text-xs" />

            <span className="text-[10px] text-zinc-600">
              Secure registration · Protected candidate data
            </span>

          </div>

        </div>

        {/* =================================================
            FOOTER
        ================================================= */}

        <p className="text-center text-[10px] text-zinc-700 mt-3">
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

export default Register;