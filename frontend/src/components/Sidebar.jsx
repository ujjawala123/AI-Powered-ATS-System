import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import {
  FaBars,
  FaHome,
  FaBriefcase,
  FaFileAlt,
  FaUser,
  FaSignOutAlt,
  FaPlus,
  FaUsers,
  FaTimes,
} from "react-icons/fa";

const Sidebar = ({ onCollapse }) => {
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const isRecruiter = user.role === "recruiter";

  const handleCollapse = () => {
    const newState = !collapsed;

    setCollapsed(newState);

    if (onCollapse) {
      onCollapse(newState);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  const applicantLinks = [
    {
      name: "Dashboard",
      path: "/applicant/dashboard",
      icon: <FaHome />,
    },
    {
      name: "Browse Jobs",
      path: "/applicant/jobs",
      icon: <FaBriefcase />,
    },
    {
      name: "Applications",
      path: "/applicant/applications",
      icon: <FaFileAlt />,
    },
    {
      name: "Profile",
      path: "/applicant/profile",
      icon: <FaUser />,
    },
  ];

  const recruiterLinks = [
    {
      name: "Dashboard",
      path: "/recruiter/dashboard",
      icon: <FaHome />,
    },
    {
      name: "My Jobs",
      path: "/recruiter/jobs",
      icon: <FaBriefcase />,
    },
    {
      name: "Post Job",
      path: "/recruiter/post-job",
      icon: <FaPlus />,
    },
    {
      name: "Profile",
      path: "/recruiter/profile",
      icon: <FaUser />,
    },
    {
      name: "Application Pipeline",
      path: "/recruiter/pipeline",
      icon: <FaUsers />,
    }
  ];

  const links = isRecruiter
    ? recruiterLinks
    : applicantLinks;

  return (
    <aside
      className={`
        fixed
        left-0
        top-0
        bottom-0
        z-50
        bg-[#111113]
        border-r border-zinc-800
        transition-all
        duration-300
        flex
        flex-col
        ${collapsed ? "w-20" : "w-64"}
      `}
    >

      {/* Logo / Collapse */}
      <div
        className={`
          h-16
          flex
          items-center
          border-b
          border-zinc-800
          ${collapsed ? "justify-center" : "justify-between px-5"}
        `}
      >

        {!collapsed && (
          <div>
            <h1 className="text-xl font-bold tracking-wide text-white">
              AI<span className="text-cyan-400">ATS</span>
            </h1>

            <p className="text-[10px] text-zinc-500">
              Applicant Tracking System
            </p>
          </div>
        )}

        <button
          onClick={handleCollapse}
          className="w-9 h-9 flex items-center justify-center rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <FaBars /> : <FaTimes />}
        </button>

      </div>

      {/* Navigation */}
      <div className="flex-1 px-3 py-6 overflow-y-auto">

        {!collapsed && (
          <p className="text-[11px] uppercase tracking-wider text-zinc-600 px-3 mb-3">
            {isRecruiter ? "Recruiter" : "Applicant"}
          </p>
        )}

        <div className="space-y-2">

          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `
                group
                flex
                items-center
                rounded-xl
                transition-all
                duration-200
                ${
                  collapsed
                    ? "justify-center px-3 py-3"
                    : "gap-4 px-4 py-3"
                }
                ${
                  isActive
                    ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                    : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                }
                `
              }
              title={collapsed ? link.name : ""}
            >

              <span className="text-lg min-w-[20px] flex justify-center">
                {link.icon}
              </span>

              {!collapsed && (
                <span className="text-sm font-medium">
                  {link.name}
                </span>
              )}

            </NavLink>
          ))}

        </div>

      </div>

      {/* Logout */}
      <div className="p-3 border-t border-zinc-800">

        <button
          onClick={handleLogout}
          className={`
            w-full
            flex
            items-center
            rounded-xl
            text-zinc-400
            hover:text-red-400
            hover:bg-red-500/10
            transition
            ${
              collapsed
                ? "justify-center px-3 py-3"
                : "gap-4 px-4 py-3"
            }
          `}
          title={collapsed ? "Logout" : ""}
        >

          <FaSignOutAlt className="text-lg" />

          {!collapsed && (
            <span className="text-sm font-medium">
              Logout
            </span>
          )}

        </button>

      </div>

    </aside>
  );
};

export default Sidebar;