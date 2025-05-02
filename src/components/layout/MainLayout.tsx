
import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import { useLocation } from "react-router-dom";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const location = useLocation();
  const isAuthPage = location.pathname === "/" || 
                     location.pathname === "/login" || 
                     location.pathname === "/register";

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 md:ml-64 p-6 overflow-y-auto">
        <main className="max-w-7xl mx-auto">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
