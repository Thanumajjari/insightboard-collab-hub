
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllProjects } from "@/services/projectService";
import { getAllTeamMembers } from "@/services/teamService";
import { Skeleton } from "@/components/ui/skeleton";
import { Activity, FileText, Folder, Users } from "lucide-react";

const DashboardOverview = () => {
  const { data: projects, isLoading: isLoadingProjects } = useQuery({
    queryKey: ["projects"],
    queryFn: getAllProjects,
  });

  const { data: members, isLoading: isLoadingMembers } = useQuery({
    queryKey: ["team-members"],
    queryFn: getAllTeamMembers,
  });

  const stats = [
    {
      title: "Total Projects",
      value: projects?.length || 0,
      icon: <Folder className="h-8 w-8 text-insight-600" />,
      change: "+12% from last month",
    },
    {
      title: "Active Projects",
      value: projects?.filter((project) => project.status === "active").length || 0,
      icon: <Activity className="h-8 w-8 text-green-600" />,
      change: "+5% from last month",
    },
    {
      title: "Team Members",
      value: members?.length || 0,
      icon: <Users className="h-8 w-8 text-blue-600" />,
      change: "No change from last month",
    },
    {
      title: "Total Widgets",
      value: "15",
      icon: <FileText className="h-8 w-8 text-purple-600" />,
      change: "+8% from last month",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6 flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </p>
                {isLoadingProjects || isLoadingMembers ? (
                  <Skeleton className="h-8 w-16 mt-1" />
                ) : (
                  <>
                    <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {stat.change}
                    </p>
                  </>
                )}
              </div>
              {stat.icon}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardOverview;
