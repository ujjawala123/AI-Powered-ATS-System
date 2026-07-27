import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Outlet />
    </div>
  );
};

export default MainLayout;