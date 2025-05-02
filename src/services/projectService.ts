
import { MOCK_PROJECTS, MOCK_WIDGETS, Project, Widget } from "@/lib/mockData";

// Get all projects
export const getAllProjects = async (): Promise<Project[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return [...MOCK_PROJECTS];
};

// Get project by ID
export const getProjectById = async (id: string): Promise<Project | undefined> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return MOCK_PROJECTS.find(project => project.id === id);
};

// Get widgets by project ID
export const getWidgetsByProjectId = async (projectId: string): Promise<Widget[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400));
  return MOCK_WIDGETS.filter(widget => widget.projectId === projectId);
};

// Create a new project
export const createProject = async (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 700));
  
  const now = new Date().toISOString();
  const newProject: Project = {
    ...project,
    id: `proj-${Math.random().toString(36).substring(2, 11)}`,
    createdAt: now,
    updatedAt: now,
  };
  
  // In a real app, this would save to the database
  // For now we just return the created project
  return newProject;
};

// Update project
export const updateProject = async (id: string, updates: Partial<Project>): Promise<Project> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  const projectIndex = MOCK_PROJECTS.findIndex(project => project.id === id);
  if (projectIndex === -1) {
    throw new Error("Project not found");
  }
  
  // In a real app, this would update the database
  const updatedProject: Project = {
    ...MOCK_PROJECTS[projectIndex],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  
  return updatedProject;
};

// Delete project
export const deleteProject = async (id: string): Promise<boolean> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // In a real app, this would delete from the database
  return true;
};
