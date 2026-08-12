import { FaBell, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = ({ sidebarCollapsed }) => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleProfile = () => {
    if (user.role === "recruiter") {
      navigate("/recruiter/profile");
    } else {
      navigate("/applicant/profile");
    }
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

        {/* Logo */}
        <div className="flex items-center">
          <h1 className="text-xl font-bold tracking-wide text-white">
            AI<span className="text-cyan-400">ATS</span>
          </h1>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-5">

          {/* Notification */}
          <button
            className="relative text-zinc-400 hover:text-white transition"
            title="Notifications"
          >
            <FaBell className="text-lg" />

            <span className="absolute -top-2 -right-2 bg-cyan-500 text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              0
            </span>
          </button>

          {/* User */}
          <button
            onClick={handleProfile}
            className="flex items-center gap-3 hover:bg-zinc-800 px-3 py-2 rounded-lg transition"
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

        </div>

      </div>
    </nav>
  );
};

export default Navbar;