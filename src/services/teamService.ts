
import { MOCK_TEAM_MEMBERS, TeamMember } from "@/lib/mockData";

// Get all team members
export const getAllTeamMembers = async (): Promise<TeamMember[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return [...MOCK_TEAM_MEMBERS];
};

// Get team member by ID
export const getTeamMemberById = async (id: string): Promise<TeamMember | undefined> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return MOCK_TEAM_MEMBERS.find(member => member.id === id);
};

// Get team members by project ID
export const getTeamMembersByProjectId = async (projectId: string): Promise<TeamMember[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400));
  return MOCK_TEAM_MEMBERS.filter(member => member.projects.includes(projectId));
};
