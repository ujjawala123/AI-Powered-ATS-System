import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaCheckCircle,
  FaBrain,
  FaRobot,
  FaUserCheck,
  FaChartLine,
  FaBolt,
  FaShieldAlt,
  FaFileAlt,
  FaSearch,
  FaMagic,
  FaBriefcase,
  FaStar,
} from "react-icons/fa";

const Landing = () => {
  const features = [
    {
      icon: <FaFileAlt />,
      title: "Resume Parsing",
      description:
        "Automatically extract skills, experience and candidate information from resumes.",
      color: "cyan",
    },
    {
      icon: <FaBrain />,
      title: "AI ATS Score",
      description:
        "Analyze resumes against job descriptions and generate intelligent ATS scores.",
      color: "violet",
    },
    {
      icon: <FaUserCheck />,
      title: "Smart Matching",
      description:
        "Identify the strongest candidates based on skills and job requirements.",
      color: "fuchsia",
    },
    {
      icon: <FaChartLine />,
      title: "Hiring Analytics",
      description:
        "Track applications, candidates, interviews and recruitment performance.",
      color: "blue",
    },
  ];

  return (
    <div className="min-h-screen bg-[#050507] text-white overflow-hidden">

      {/* =====================================================
          ANIMATED BACKGROUND
      ===================================================== */}

      <div className="fixed inset-0 pointer-events-none overflow-hidden">

        {/* Cyan Glow */}

        <div
          className="
            absolute
            -top-60
            -left-60
            w-[650px]
            h-[650px]
            rounded-full
            bg-cyan-500/10
            blur-[140px]
            animate-pulse
          "
        />

        {/* Violet Glow */}

        <div
          className="
            absolute
            top-[30%]
            -right-60
            w-[600px]
            h-[600px]
            rounded-full
            bg-violet-600/10
            blur-[140px]
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
            bottom-[-300px]
            left-[30%]
            w-[550px]
            h-[550px]
            rounded-full
            bg-fuchsia-500/10
            blur-[140px]
            animate-pulse
          "
          style={{
            animationDelay: "3s",
          }}
        />

        {/* Grid */}

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Floating particles */}

        <div className="absolute top-[18%] left-[12%] w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.9)] animate-ping" />

        <div className="absolute top-[28%] right-[17%] w-3 h-3 rounded-full bg-violet-400 shadow-[0_0_25px_rgba(167,139,250,0.9)] animate-bounce" />

        <div className="absolute bottom-[20%] left-[18%] w-2 h-2 rounded-full bg-fuchsia-400 shadow-[0_0_20px_rgba(232,121,249,0.9)] animate-pulse" />

        <div className="absolute bottom-[30%] right-[12%] w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_20px_rgba(96,165,250,0.9)] animate-ping" />

      </div>

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <nav
        className="
          relative
          z-50
          max-w-7xl
          mx-auto
          px-5
          sm:px-8
          py-5
          flex
          items-center
          justify-between
        "
      >

        {/* Logo */}

        <Link
          to="/"
          className="group flex items-center gap-3"
        >

          <div
            className="
              relative
              w-11
              h-11
              rounded-xl
              bg-gradient-to-br
              from-cyan-400
              via-blue-500
              to-violet-600
              flex
              items-center
              justify-center
              shadow-[0_0_30px_rgba(34,211,238,0.25)]
              transition
              duration-500
              group-hover:scale-110
              group-hover:rotate-6
            "
          >

            <FaBrain className="text-white text-lg" />

            <div
              className="
                absolute
                inset-0
                rounded-xl
                border
                border-cyan-300/40
                animate-ping
                opacity-20
              "
            />

          </div>

          <div>

            <h1 className="text-xl sm:text-2xl font-black">

              AI
              <span className="text-cyan-400">
                ATS
              </span>

            </h1>

            <p className="hidden sm:block text-[9px] text-zinc-500 uppercase tracking-[0.25em]">
              Intelligent Hiring
            </p>

          </div>

        </Link>

        {/* Navigation */}

        <div className="flex items-center gap-2 sm:gap-4">

          <Link
            to="/login"
            className="
              px-4
              sm:px-5
              py-2.5
              rounded-xl
              border
              border-zinc-800
              bg-white/[0.025]
              text-sm
              font-semibold
              text-zinc-300
              transition-all
              duration-300
              hover:border-cyan-400/40
              hover:text-white
              hover:bg-cyan-400/5
            "
          >
            Login
          </Link>

          <Link
            to="/register"
            className="
              group
              relative
              overflow-hidden
              px-4
              sm:px-5
              py-2.5
              rounded-xl
              bg-gradient-to-r
              from-cyan-400
              via-blue-500
              to-violet-500
              text-sm
              font-bold
              text-white
              shadow-lg
              shadow-cyan-500/10
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:shadow-xl
              hover:shadow-cyan-500/20
            "
          >

            <span
              className="
                absolute
                inset-0
                -translate-x-full
                group-hover:translate-x-full
                transition-transform
                duration-700
                bg-gradient-to-r
                from-transparent
                via-white/20
                to-transparent
              "
            />

            <span className="relative">
              Get Started
            </span>

          </Link>

        </div>

      </nav>

      {/* =====================================================
          HERO SECTION
      ===================================================== */}

      <main className="relative z-10">

        <section
          className="
            max-w-7xl
            mx-auto
            px-5
            sm:px-8
            pt-12
            sm:pt-20
            pb-20
          "
        >

          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-14 lg:gap-10 items-center">

            {/* =================================================
                HERO LEFT
            ================================================= */}

            <div className="text-center lg:text-left">

              {/* Badge */}

              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  px-4
                  py-2
                  rounded-full
                  bg-cyan-400/10
                  border
                  border-cyan-400/20
                  text-cyan-300
                  text-xs
                  sm:text-sm
                  font-semibold
                  mb-6
                  animate-[fadeUp_0.7s_ease-out]
                "
              >

                <FaRobot />

                AI-Powered Recruitment Platform

                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />

              </div>

              {/* Heading */}

              <h1
                className="
                  text-4xl
                  sm:text-5xl
                  md:text-6xl
                  lg:text-[64px]
                  font-black
                  leading-[1.05]
                  tracking-tight
                  animate-[fadeUp_0.8s_ease-out]
                "
              >

                Hire Smarter.

                <br />

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
                  Find Better.
                </span>

              </h1>

              {/* Description */}

              <p
                className="
                  mt-6
                  text-base
                  sm:text-lg
                  text-zinc-400
                  leading-relaxed
                  max-w-2xl
                  mx-auto
                  lg:mx-0
                  animate-[fadeUp_1s_ease-out]
                "
              >
                AIATS transforms the recruitment process with intelligent
                resume analysis, ATS scoring, candidate matching and a
                complete hiring pipeline — all in one powerful platform.
              </p>

              {/* Buttons */}

              <div
                className="
                  mt-8
                  flex
                  flex-col
                  sm:flex-row
                  items-center
                  justify-center
                  lg:justify-start
                  gap-4
                  animate-[fadeUp_1.1s_ease-out]
                "
              >

                <Link
                  to="/register"
                  className="
                    group
                    relative
                    overflow-hidden
                    w-full
                    sm:w-auto
                    flex
                    items-center
                    justify-center
                    gap-3
                    px-7
                    py-3.5
                    rounded-xl
                    bg-gradient-to-r
                    from-cyan-400
                    via-blue-500
                    to-violet-500
                    font-bold
                    shadow-xl
                    shadow-cyan-500/15
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:shadow-cyan-500/25
                  "
                >

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

                  <span className="relative">
                    Start Hiring Smarter
                  </span>

                  <FaArrowRight className="relative transition-transform group-hover:translate-x-1" />

                </Link>

                <Link
                  to="/login"
                  className="
                    w-full
                    sm:w-auto
                    flex
                    items-center
                    justify-center
                    gap-2
                    px-7
                    py-3.5
                    rounded-xl
                    border
                    border-zinc-800
                    bg-white/[0.025]
                    text-zinc-300
                    font-semibold
                    transition-all
                    duration-300
                    hover:border-cyan-400/30
                    hover:text-white
                    hover:bg-cyan-400/5
                  "
                >
                  Login to AIATS
                </Link>

              </div>

              {/* Trust */}

              <div
                className="
                  mt-7
                  flex
                  flex-wrap
                  justify-center
                  lg:justify-start
                  gap-x-6
                  gap-y-2
                  text-xs
                  text-zinc-500
                "
              >

                <span className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-400" />
                  AI Resume Analysis
                </span>

                <span className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-400" />
                  Smart Candidate Matching
                </span>

                <span className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-400" />
                  Secure Data
                </span>

              </div>

            </div>

            {/* =================================================
                HERO RIGHT - AI DASHBOARD VISUAL
            ================================================= */}

            <div className="relative">

              {/* Glow */}

              <div
                className="
                  absolute
                  inset-10
                  rounded-full
                  bg-cyan-500/10
                  blur-[100px]
                "
              />

              {/* Main Dashboard */}

              <div
                className="
                  relative
                  rounded-[30px]
                  border
                  border-white/10
                  bg-white/[0.055]
                  backdrop-blur-2xl
                  p-5
                  sm:p-7
                  shadow-[0_30px_100px_rgba(0,0,0,0.65)]
                  animate-[dashboardFloat_6s_ease-in-out_infinite]
                "
              >

                {/* Top gradient line */}

                <div
                  className="
                    absolute
                    top-0
                    left-1/2
                    -translate-x-1/2
                    w-40
                    h-px
                    bg-gradient-to-r
                    from-transparent
                    via-cyan-400
                    to-transparent
                    shadow-[0_0_20px_rgba(34,211,238,0.8)]
                  "
                />

                {/* Dashboard Header */}

                <div className="flex items-center justify-between mb-6">

                  <div>

                    <p className="text-xs text-zinc-500">
                      AIATS Dashboard
                    </p>

                    <h3 className="text-lg font-bold mt-1">
                      Candidate Intelligence
                    </h3>

                  </div>

                  <div
                    className="
                      w-10
                      h-10
                      rounded-xl
                      bg-gradient-to-br
                      from-cyan-400/20
                      to-violet-500/20
                      border
                      border-cyan-400/20
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <FaBrain className="text-cyan-400" />
                  </div>

                </div>

                {/* Candidate */}

                <div
                  className="
                    rounded-2xl
                    border
                    border-white/5
                    bg-black/20
                    p-4
                  "
                >

                  <div className="flex items-center gap-3">

                    <div
                      className="
                        w-12
                        h-12
                        rounded-xl
                        bg-gradient-to-br
                        from-cyan-400
                        to-blue-600
                        flex
                        items-center
                        justify-center
                        font-bold
                      "
                    >
                      JD
                    </div>

                    <div className="flex-1">

                      <p className="font-semibold">
                        Candidate Profile
                      </p>

                      <p className="text-xs text-zinc-500">
                        Full Stack Developer
                      </p>

                    </div>

                    <FaCheckCircle className="text-green-400" />

                  </div>

                  {/* Score */}

                  <div className="mt-5">

                    <div className="flex items-center justify-between mb-2">

                      <span className="text-xs text-zinc-500">
                        AI ATS Match
                      </span>

                      <span className="text-sm font-bold text-cyan-400">
                        94%
                      </span>

                    </div>

                    <div className="h-2 rounded-full bg-zinc-800 overflow-hidden">

                      <div
                        className="
                          h-full
                          w-[94%]
                          rounded-full
                          bg-gradient-to-r
                          from-cyan-400
                          via-blue-500
                          to-violet-500
                          animate-[scoreLoad_2s_ease-out]
                        "
                      />

                    </div>

                  </div>

                </div>

                {/* Stats */}

                <div className="grid grid-cols-3 gap-3 mt-4">

                  <div
                    className="
                      rounded-xl
                      border
                      border-cyan-400/10
                      bg-cyan-400/[0.04]
                      p-3
                      text-center
                    "
                  >

                    <FaSearch className="mx-auto text-cyan-400 mb-2" />

                    <p className="text-lg font-bold">
                      92%
                    </p>

                    <p className="text-[10px] text-zinc-500">
                      Skills Match
                    </p>

                  </div>

                  <div
                    className="
                      rounded-xl
                      border
                      border-violet-400/10
                      bg-violet-400/[0.04]
                      p-3
                      text-center
                    "
                  >

                    <FaChartLine className="mx-auto text-violet-400 mb-2" />

                    <p className="text-lg font-bold">
                      87%
                    </p>

                    <p className="text-[10px] text-zinc-500">
                      Experience
                    </p>

                  </div>

                  <div
                    className="
                      rounded-xl
                      border
                      border-fuchsia-400/10
                      bg-fuchsia-400/[0.04]
                      p-3
                      text-center
                    "
                  >

                    <FaStar className="mx-auto text-fuchsia-400 mb-2" />

                    <p className="text-lg font-bold">
                      A+
                    </p>

                    <p className="text-[10px] text-zinc-500">
                      Overall
                    </p>

                  </div>

                </div>

                {/* AI Status */}

                <div
                  className="
                    mt-4
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    border
                    border-green-400/10
                    bg-green-400/[0.03]
                    px-4
                    py-3
                  "
                >

                  <div className="relative">

                    <div className="w-2.5 h-2.5 rounded-full bg-green-400" />

                    <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-50" />

                  </div>

                  <p className="text-xs text-zinc-400">
                    AI analysis completed successfully
                  </p>

                </div>

              </div>

              {/* Floating Card */}

              <div
                className="
                  hidden
                  sm:flex
                  absolute
                  -left-8
                  top-12
                  items-center
                  gap-3
                  px-4
                  py-3
                  rounded-2xl
                  border
                  border-cyan-400/20
                  bg-[#111114]/90
                  backdrop-blur-xl
                  shadow-2xl
                  animate-[floatOne_5s_ease-in-out_infinite]
                "
              >

                <div className="w-9 h-9 rounded-lg bg-cyan-400/10 flex items-center justify-center">
                  <FaUserCheck className="text-cyan-400" />
                </div>

                <div>

                  <p className="text-[10px] text-zinc-500">
                    AI Matching
                  </p>

                  <p className="text-xs font-semibold">
                    Candidate Matched
                  </p>

                </div>

              </div>

              {/* Floating Card */}

              <div
                className="
                  hidden
                  sm:flex
                  absolute
                  -right-8
                  bottom-12
                  items-center
                  gap-3
                  px-4
                  py-3
                  rounded-2xl
                  border
                  border-violet-400/20
                  bg-[#111114]/90
                  backdrop-blur-xl
                  shadow-2xl
                  animate-[floatTwo_6s_ease-in-out_infinite]
                "
              >

                <div className="w-9 h-9 rounded-lg bg-violet-400/10 flex items-center justify-center">
                  <FaMagic className="text-violet-400" />
                </div>

                <div>

                  <p className="text-[10px] text-zinc-500">
                    Gemini AI
                  </p>

                  <p className="text-xs font-semibold">
                    Resume Analysis
                  </p>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* =====================================================
            FEATURES
        ===================================================== */}

        <section className="max-w-7xl mx-auto px-5 sm:px-8 pb-24">

          <div className="text-center mb-12">

            <div
              className="
                inline-flex
                items-center
                gap-2
                text-xs
                font-semibold
                text-cyan-400
                uppercase
                tracking-[0.2em]
              "
            >

              <FaBolt />

              Powerful AI Features

            </div>

            <h2 className="text-3xl sm:text-4xl font-black mt-3">

              Everything you need to

              <span
                className="
                  ml-2
                  text-transparent
                  bg-clip-text
                  bg-gradient-to-r
                  from-cyan-300
                  to-violet-400
                "
              >
                hire better
              </span>

            </h2>

            <p className="text-zinc-500 max-w-2xl mx-auto mt-4">
              AIATS brings the complete recruitment workflow into one
              intelligent platform.
            </p>

          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">

            {features.map((feature, index) => (

              <div
                key={feature.title}
                className="
                  group
                  relative
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.035]
                  backdrop-blur-xl
                  p-6
                  transition-all
                  duration-500
                  hover:-translate-y-2
                  hover:bg-white/[0.055]
                  hover:border-cyan-400/20
                "
                style={{
                  animationDelay: `${index * 150}ms`,
                }}
              >

                <div
                  className="
                    w-12
                    h-12
                    rounded-xl
                    bg-gradient-to-br
                    from-cyan-400/10
                    to-violet-500/10
                    border
                    border-white/5
                    flex
                    items-center
                    justify-center
                    text-cyan-400
                    text-lg
                    mb-5
                    transition
                    duration-300
                    group-hover:scale-110
                  "
                >
                  {feature.icon}
                </div>

                <h3 className="font-bold text-lg">
                  {feature.title}
                </h3>

                <p className="text-sm text-zinc-500 leading-relaxed mt-3">
                  {feature.description}
                </p>

                <div
                  className="
                    absolute
                    bottom-0
                    left-1/2
                    -translate-x-1/2
                    w-0
                    h-px
                    bg-gradient-to-r
                    from-cyan-400
                    to-violet-500
                    group-hover:w-2/3
                    transition-all
                    duration-500
                  "
                />

              </div>

            ))}

          </div>

        </section>

        {/* =====================================================
            CTA SECTION
        ===================================================== */}

        <section className="max-w-5xl mx-auto px-5 sm:px-8 pb-24">

          <div
            className="
              relative
              overflow-hidden
              rounded-[30px]
              border
              border-white/10
              bg-white/[0.04]
              backdrop-blur-2xl
              p-8
              sm:p-12
              text-center
              shadow-[0_30px_100px_rgba(0,0,0,0.5)]
            "
          >

            {/* CTA Glow */}

            <div
              className="
                absolute
                -top-32
                left-1/2
                -translate-x-1/2
                w-96
                h-96
                rounded-full
                bg-cyan-500/10
                blur-[100px]
              "
            />

            <div className="relative">

              <div
                className="
                  mx-auto
                  w-14
                  h-14
                  rounded-2xl
                  bg-gradient-to-br
                  from-cyan-400
                  to-violet-600
                  flex
                  items-center
                  justify-center
                  shadow-[0_0_40px_rgba(34,211,238,0.25)]
                  mb-5
                "
              >

                <FaBrain className="text-xl" />

              </div>

              <h2 className="text-3xl sm:text-4xl font-black">
                Ready to transform your hiring?
              </h2>

              <p className="text-zinc-500 mt-4 max-w-xl mx-auto">
                Join AIATS and experience a smarter, faster and more
                intelligent way to manage candidates and recruitment.
              </p>

              <Link
                to="/register"
                className="
                  group
                  inline-flex
                  items-center
                  gap-3
                  mt-7
                  px-7
                  py-3.5
                  rounded-xl
                  bg-gradient-to-r
                  from-cyan-400
                  via-blue-500
                  to-violet-500
                  font-bold
                  shadow-xl
                  shadow-cyan-500/15
                  transition-all
                  duration-300
                  hover:-translate-y-1
                "
              >

                Create Your AIATS Account

                <FaArrowRight className="transition-transform group-hover:translate-x-1" />

              </Link>

            </div>

          </div>

        </section>

      </main>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer
        className="
          relative
          z-10
          border-t
          border-white/5
          py-7
        "
      >

        <div
          className="
            max-w-7xl
            mx-auto
            px-5
            sm:px-8
            flex
            flex-col
            sm:flex-row
            items-center
            justify-between
            gap-4
          "
        >

          <div className="flex items-center gap-2">

            <FaShieldAlt className="text-cyan-400 text-xs" />

            <span className="text-xs text-zinc-600">
              Secure · Intelligent · Candidate-focused
            </span>

          </div>

          <p className="text-xs text-zinc-700">
            © {new Date().getFullYear()} AIATS · Intelligent Applicant Tracking System
          </p>

        </div>

      </footer>

      {/* =====================================================
          CUSTOM ANIMATIONS
      ===================================================== */}

      <style>
        {`
          @keyframes fadeUp {
            0% {
              opacity: 0;
              transform: translateY(25px);
            }

            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes dashboardFloat {
            0%,
            100% {
              transform: translateY(0);
            }

            50% {
              transform: translateY(-8px);
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

          @keyframes scoreLoad {
            0% {
              width: 0%;
            }

            100% {
              width: 94%;
            }
          }
        `}
      </style>

    </div>
  );
};

export default Landing;