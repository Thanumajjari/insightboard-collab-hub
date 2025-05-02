
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { TeamMember } from "@/lib/mockData";

interface TeamMemberCardProps {
  member: TeamMember;
}

const TeamMemberCard = ({ member }: TeamMemberCardProps) => {
  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      case "project_manager":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "analyst":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "viewer":
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case "admin":
        return "Admin";
      case "project_manager":
        return "Project Manager";
      case "analyst":
        return "Analyst";
      case "viewer":
        return "Viewer";
      default:
        return role;
    }
  };

  return (
    <Card className="h-full">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center text-center">
          <Avatar className="h-20 w-20 mb-4">
            <AvatarImage src={member.avatar} alt={member.name} />
            <AvatarFallback>
              {member.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <h3 className="font-medium text-lg mb-1">{member.name}</h3>
          <p className="text-sm text-muted-foreground mb-3">{member.email}</p>
          <Badge className={getRoleBadgeColor(member.role)} variant="secondary">
            {getRoleDisplayName(member.role)}
          </Badge>
          <div className="mt-4 text-sm text-muted-foreground">
            <p>{member.projects.length} projects</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamMemberCard;
