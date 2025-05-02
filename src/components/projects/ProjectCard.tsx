
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, MoreHorizontal, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Project } from "@/lib/mockData";
import { formatDistanceToNow } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const { user } = useAuth();
  
  const getStatusColor = (status: string) => {
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

  const canEdit = user?.role === 'admin' || user?.role === 'project_manager';

  return (
    <Card className="h-full flex flex-col">
      <CardContent className="pt-6 flex-grow">
        <div className="flex justify-between items-start mb-3">
          <Badge className={getStatusColor(project.status)} variant="secondary">
            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
          </Badge>
          {canEdit && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Edit Project</DropdownMenuItem>
                <DropdownMenuItem>Export as PDF</DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">Archive Project</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        <Link to={`/projects/${project.id}`}>
          <h3 className="text-lg font-semibold mb-2 hover:text-insight-600 transition-colors">
            {project.name}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            <span>{project.members.length} members</span>
          </div>
          <span>Updated {formatDistanceToNow(new Date(project.updatedAt))} ago</span>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <Link to={`/projects/${project.id}`} className="w-full">
          <Button variant="ghost" className="w-full">
            <Eye className="mr-2 h-4 w-4" />
            View Project
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
