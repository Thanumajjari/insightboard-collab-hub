
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProjectById, getWidgetsByProjectId } from "@/services/projectService";
import { getTeamMembersByProjectId } from "@/services/teamService";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronLeft, Download, Plus } from "lucide-react";
import ProjectWidgetGrid from "@/components/projects/ProjectWidgetGrid";
import { useAuth } from "@/hooks/useAuth";

const ProjectDetailPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  const { data: project, isLoading: isLoadingProject } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => getProjectById(projectId || ""),
    enabled: !!projectId,
  });

  const { data: members, isLoading: isLoadingMembers } = useQuery({
    queryKey: ["project-members", projectId],
    queryFn: () => getTeamMembersByProjectId(projectId || ""),
    enabled: !!projectId,
  });

  useEffect(() => {
    if (!isLoadingProject && !project) {
      navigate("/projects");
    }
  }, [isLoadingProject, project, navigate]);

  const canManageTeam = user?.role === 'admin' || user?.role === 'project_manager';
  const canAddWidgets = user?.role === 'admin' || user?.role === 'project_manager' || user?.role === 'analyst';

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "completed":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "archived":
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  if (isLoadingProject) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-12 w-3/4" />
        <Skeleton className="h-6 w-1/2" />
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {Array(4)
            .fill(null)
            .map((_, i) => (
              <Skeleton key={i} className="h-[250px] w-full" />
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <Button
            variant="ghost"
            size="sm"
            className="mb-2"
            onClick={() => navigate("/projects")}
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Projects
          </Button>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">{project?.name}</h1>
            <Badge className={getStatusColor(project?.status)} variant="secondary">
              {project?.status?.charAt(0).toUpperCase() + project?.status?.slice(1)}
            </Badge>
          </div>
          <p className="text-muted-foreground mt-1">{project?.description}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {canAddWidgets && (
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Widget
            </Button>
          )}
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="members">Team Members</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-8">
          <ProjectWidgetGrid projectId={projectId || ""} />
        </TabsContent>
        <TabsContent value="members">
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <h3 className="text-xl font-medium">Project Team</h3>
              {canManageTeam && (
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Team Member
                </Button>
              )}
            </div>
            {isLoadingMembers ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array(4)
                  .fill(null)
                  .map((_, i) => (
                    <Skeleton key={i} className="h-[100px] w-full" />
                  ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {members?.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center p-4 rounded-lg border bg-white"
                  >
                    <Avatar className="h-12 w-12 mr-4">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{member.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {member.role === "admin"
                          ? "Admin"
                          : member.role === "project_manager"
                          ? "Project Manager"
                          : member.role === "analyst"
                          ? "Analyst"
                          : "Viewer"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectDetailPage;
