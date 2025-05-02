
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  LogOut,
  Menu,
  X
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Sidebar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const menuItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/dashboard",
      roles: ["admin", "project_manager", "analyst", "viewer"],
    },
    {
      title: "Projects",
      icon: <FileText size={20} />,
      path: "/projects",
      roles: ["admin", "project_manager", "analyst", "viewer"],
    },
    {
      title: "Team",
      icon: <Users size={20} />,
      path: "/team",
      roles: ["admin", "project_manager"],
    },
    {
      title: "Settings",
      icon: <Settings size={20} />,
      path: "/settings",
      roles: ["admin"],
    },
  ];

  const filteredMenuItems = menuItems.filter((item) => 
    user?.role ? item.roles.includes(user.role) : false
  );

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden fixed top-4 left-4 z-40">
        <Button variant="outline" size="icon" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {/* Mobile sidebar */}
      <div
        className={`md:hidden fixed top-0 left-0 h-full w-64 bg-white z-30 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-200">
            <h1 className="text-xl font-bold text-insight-700">InsightBoard</h1>
          </div>
          <nav className="flex-grow p-4">
            <ul className="space-y-2">
              {filteredMenuItems.map((item) => (
                <li key={item.path}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => {
                      navigate(item.path);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.title}
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
          <div className="p-4 border-t border-gray-200">
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={() => {
                logout();
                setIsMobileMenuOpen(false);
              }}
            >
              <LogOut size={20} className="mr-2" />
              Log Out
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div
        className={`hidden md:block h-screen ${
          isCollapsed ? "w-20" : "w-64"
        } bg-white border-r border-gray-200 fixed left-0 top-0 transition-all duration-300`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            {!isCollapsed && (
              <h1 className="text-xl font-bold text-insight-700">InsightBoard</h1>
            )}
            <Button variant="ghost" size="icon" onClick={toggleSidebar}>
              <Menu size={20} />
            </Button>
          </div>
          <nav className="flex-grow p-4">
            <ul className="space-y-2">
              {filteredMenuItems.map((item) => (
                <li key={item.path}>
                  <Button
                    variant="ghost"
                    className={`${
                      isCollapsed ? "justify-center w-full p-2" : "justify-start w-full"
                    }`}
                    onClick={() => navigate(item.path)}
                  >
                    <span className={isCollapsed ? "" : "mr-2"}>{item.icon}</span>
                    {!isCollapsed && item.title}
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
          <div className="p-4 border-t border-gray-200">
            <Button
              variant="ghost"
              className={`${
                isCollapsed
                  ? "justify-center w-full p-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                  : "justify-start w-full text-red-600 hover:text-red-700 hover:bg-red-50"
              }`}
              onClick={logout}
            >
              <LogOut size={20} className={isCollapsed ? "" : "mr-2"} />
              {!isCollapsed && "Log Out"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
