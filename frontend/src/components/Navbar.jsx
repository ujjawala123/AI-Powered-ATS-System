import {
  FaBell,
  FaUserCircle,
  FaSignInAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = ({ sidebarCollapsed }) => {
  const navigate = useNavigate();

  const getUser = () => {
    try {
      return JSON.parse(localStorage.getItem("user") || "{}");
    } catch {
      return {};
    }
  };

  const user = getUser();
  const token = localStorage.getItem("token");

  const isLoggedIn = !!token;

  // ==========================================
  // Profile
  // ==========================================

  const handleProfile = () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    if (user.role === "recruiter") {
      navigate("/recruiter/profile");
    } else {
      navigate("/applicant/profile");
    }
  };

  // ==========================================
  // Login
  // ==========================================

  const handleLogin = () => {
    navigate("/login");
  };

  // ==========================================
  // Logout
  // ==========================================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login", { replace: true });

    // Refresh so all authenticated UI updates immediately
    window.location.reload();
  };

  return (
    <nav
      className={`
        fixed top-0 right-0 z-40
        h-16
        bg-[#111113]
        border-b border-zinc-800
        transition-all duration-300
        ${sidebarCollapsed ? "left-20" : "left-64"}
      `}
    >
      <div className="h-full px-6 flex items-center justify-between">

        {/* ========================================
            Logo
        ======================================== */}

        <button
          onClick={() => {
            if (user.role === "recruiter") {
              navigate("/recruiter/dashboard");
            } else if (user.role === "applicant") {
              navigate("/applicant/dashboard");
            } else {
              navigate("/");
            }
          }}
          className="flex items-center"
        >
          <h1 className="text-xl font-bold tracking-wide text-white">
            AI<span className="text-cyan-400">ATS</span>
          </h1>
        </button>

        {/* ========================================
            Right Side
        ======================================== */}

        <div className="flex items-center gap-3">

          {/* ======================================
              Notification
          ====================================== */}

          {isLoggedIn && (
            <button
              className="relative text-zinc-400 hover:text-white transition p-2"
              title="Notifications"
            >
              <FaBell className="text-lg" />

              <span className="absolute -top-1 -right-1 bg-cyan-500 text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                0
              </span>
            </button>
          )}

          {/* ======================================
              Logged Out → Login
          ====================================== */}

          {!isLoggedIn && (
            <button
              onClick={handleLogin}
              className="
                flex items-center gap-2
                bg-cyan-500
                hover:bg-cyan-400
                text-black
                px-4 py-2
                rounded-lg
                font-semibold
                transition
              "
            >
              <FaSignInAlt />
              Login
            </button>
          )}

          {/* ======================================
              Logged In → User
          ====================================== */}

          {isLoggedIn && (
            <>
              <button
                onClick={handleProfile}
                className="
                  flex items-center gap-3
                  hover:bg-zinc-800
                  px-3 py-2
                  rounded-lg
                  transition
                "
              >
                <FaUserCircle className="text-2xl text-cyan-400" />

                <div className="hidden sm:block text-left">
                  <p className="text-sm font-semibold text-white">
                    {user.name || "User"}
                  </p>

                  <p className="text-xs text-zinc-500 capitalize">
                    {user.role || "Applicant"}
                  </p>
                </div>
              </button>

              {/* Logout */}
              <button
                onClick={handleLogout}
                title="Logout"
                className="
                  flex items-center gap-2
                  text-zinc-400
                  hover:text-red-400
                  hover:bg-zinc-800
                  px-3 py-2
                  rounded-lg
                  transition
                "
              >
                <FaSignOutAlt />
                <span className="hidden sm:inline">
                  Logout
                </span>
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;