
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import RecentProjects from "@/components/dashboard/RecentProjects";

const DashboardPage = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/");
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.name}
          </p>
        </div>
      </div>

      <DashboardOverview />

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <RecentProjects />
      </div>
    </div>
  );
};

export default DashboardPage;
