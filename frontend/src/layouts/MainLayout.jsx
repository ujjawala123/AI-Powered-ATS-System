import { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const MainLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[#0F0F10] text-white">

      {/* ==========================================
          Sidebar
      ========================================== */}

      <Sidebar
        onCollapse={setSidebarCollapsed}
      />

      {/* ==========================================
          Fixed Navbar
      ========================================== */}

      <Navbar
        sidebarCollapsed={sidebarCollapsed}
      />

      {/* ==========================================
          Main Content
      ========================================== */}

      <main
        className={`
          min-h-screen
          pt-16
          transition-all
          duration-300
          ease-in-out
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