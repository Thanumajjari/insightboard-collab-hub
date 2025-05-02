
export interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  status: "active" | "completed" | "archived";
  members: string[];
}

export interface Widget {
  id: string;
  projectId: string;
  type: "chart" | "metric" | "table";
  name: string;
  data: any;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  size: "small" | "medium" | "large";
  config: Record<string, any>;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "admin" | "project_manager" | "analyst" | "viewer";
  avatar: string;
  projects: string[];
}

export const MOCK_PROJECTS: Project[] = [
  {
    id: "proj-1",
    name: "Q2 Sales Dashboard",
    description: "Dashboard tracking Q2 sales performance and metrics",
    createdAt: "2025-03-15T12:00:00Z",
    updatedAt: "2025-05-01T09:23:00Z",
    status: "active",
    members: ["user-1", "user-2", "user-3"],
  },
  {
    id: "proj-2",
    name: "Customer Satisfaction Survey",
    description: "Analysis of customer satisfaction survey results",
    createdAt: "2025-02-10T15:30:00Z",
    updatedAt: "2025-04-28T14:15:00Z",
    status: "active",
    members: ["user-1", "user-4"],
  },
  {
    id: "proj-3",
    name: "Marketing Campaign ROI",
    description: "ROI analysis for Q1 marketing campaigns",
    createdAt: "2025-01-05T09:45:00Z",
    updatedAt: "2025-04-10T11:20:00Z",
    status: "completed",
    members: ["user-2", "user-3"],
  },
  {
    id: "proj-4",
    name: "Product Development Metrics",
    description: "Tracking development velocity and quality metrics",
    createdAt: "2025-04-01T10:00:00Z",
    updatedAt: "2025-05-01T16:45:00Z",
    status: "active",
    members: ["user-1", "user-3", "user-4"],
  },
  {
    id: "proj-5",
    name: "Operations Efficiency",
    description: "Operational efficiency and process improvement tracking",
    createdAt: "2025-03-20T11:30:00Z",
    updatedAt: "2025-04-15T13:10:00Z",
    status: "archived",
    members: ["user-2", "user-4"],
  },
];

export const MOCK_WIDGETS: Widget[] = [
  {
    id: "widget-1",
    projectId: "proj-1",
    type: "chart",
    name: "Monthly Sales Trend",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May"],
      datasets: [
        {
          label: "Revenue",
          data: [12500, 13700, 14900, 16200, 17500],
        },
      ],
    },
    createdBy: "user-1",
    createdAt: "2025-03-16T10:30:00Z",
    updatedAt: "2025-05-01T09:23:00Z",
    size: "large",
    config: {
      chartType: "line",
      displayLegend: true,
    },
  },
  {
    id: "widget-2",
    projectId: "proj-1",
    type: "metric",
    name: "Total Sales",
    data: {
      value: 78235,
      trend: 0.12,
      previousValue: 69852,
      format: "currency",
    },
    createdBy: "user-2",
    createdAt: "2025-03-18T14:15:00Z",
    updatedAt: "2025-05-01T09:25:00Z",
    size: "small",
    config: {
      color: "blue",
    },
  },
  {
    id: "widget-3",
    projectId: "proj-1",
    type: "chart",
    name: "Sales by Product Category",
    data: {
      labels: ["Electronics", "Clothing", "Home Goods", "Beauty", "Other"],
      datasets: [
        {
          data: [35, 25, 20, 15, 5],
        },
      ],
    },
    createdBy: "user-3",
    createdAt: "2025-03-20T09:45:00Z",
    updatedAt: "2025-04-28T11:30:00Z",
    size: "medium",
    config: {
      chartType: "pie",
      displayLegend: true,
    },
  },
  {
    id: "widget-4",
    projectId: "proj-2",
    type: "chart",
    name: "Satisfaction Scores",
    data: {
      labels: ["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very Dissatisfied"],
      datasets: [
        {
          data: [45, 30, 15, 7, 3],
        },
      ],
    },
    createdBy: "user-1",
    createdAt: "2025-02-12T13:20:00Z",
    updatedAt: "2025-04-28T14:15:00Z",
    size: "large",
    config: {
      chartType: "bar",
      displayLegend: false,
    },
  },
  {
    id: "widget-5",
    projectId: "proj-2",
    type: "metric",
    name: "NPS Score",
    data: {
      value: 72,
      trend: 0.08,
      previousValue: 67,
      format: "number",
    },
    createdBy: "user-4",
    createdAt: "2025-02-15T15:45:00Z",
    updatedAt: "2025-04-25T10:10:00Z",
    size: "small",
    config: {
      color: "green",
    },
  },
  {
    id: "widget-6",
    projectId: "proj-3",
    type: "table",
    name: "Campaign Performance",
    data: {
      columns: ["Campaign", "Spend", "Revenue", "ROI"],
      rows: [
        ["Facebook Ads", "$5,000", "$12,500", "150%"],
        ["Google Search", "$7,500", "$22,000", "193%"],
        ["LinkedIn", "$3,000", "$5,800", "93%"],
        ["Email", "$1,000", "$7,200", "620%"],
      ],
    },
    createdBy: "user-2",
    createdAt: "2025-01-10T11:30:00Z",
    updatedAt: "2025-04-10T11:20:00Z",
    size: "large",
    config: {
      pagination: true,
      itemsPerPage: 5,
    },
  }
];

export const MOCK_TEAM_MEMBERS: TeamMember[] = [
  {
    id: "user-1",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    projects: ["proj-1", "proj-2", "proj-4"],
  },
  {
    id: "user-2",
    name: "Project Manager",
    email: "pm@example.com",
    role: "project_manager",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    projects: ["proj-1", "proj-3", "proj-5"],
  },
  {
    id: "user-3",
    name: "Analyst User",
    email: "analyst@example.com",
    role: "analyst",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    projects: ["proj-1", "proj-3", "proj-4"],
  },
  {
    id: "user-4",
    name: "Viewer User",
    email: "viewer@example.com",
    role: "viewer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    projects: ["proj-2", "proj-4", "proj-5"],
  },
];
