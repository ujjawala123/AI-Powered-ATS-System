import { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const MainLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] =
    useState(false);

  return (
    <div className="min-h-screen bg-[#0F0F10] text-white">

      {/* Sidebar */}
      <Sidebar
        onCollapse={setSidebarCollapsed}
      />

      {/* Navbar */}
      <Navbar
        sidebarCollapsed={sidebarCollapsed}
      />

      {/* Main Content */}
      <main
        className={`
          pt-16
          min-h-screen
          transition-all
          duration-300
          ${
            sidebarCollapsed
              ? "ml-20"
              : "ml-64"
          }
        `}
      >
        <Outlet />
      </main>

    </div>
  );
};

export default MainLayout;