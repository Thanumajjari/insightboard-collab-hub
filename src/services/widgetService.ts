
import { MOCK_WIDGETS, Widget } from "@/lib/mockData";

// Get widget by ID
export const getWidgetById = async (id: string): Promise<Widget | undefined> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return MOCK_WIDGETS.find(widget => widget.id === id);
};

// Create a new widget
export const createWidget = async (widget: Omit<Widget, 'id' | 'createdAt' | 'updatedAt'>): Promise<Widget> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  const now = new Date().toISOString();
  const newWidget: Widget = {
    ...widget,
    id: `widget-${Math.random().toString(36).substring(2, 11)}`,
    createdAt: now,
    updatedAt: now,
  };
  
  // In a real app, this would save to the database
  // For now we just return the created widget
  return newWidget;
};

// Update widget
export const updateWidget = async (id: string, updates: Partial<Widget>): Promise<Widget> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const widgetIndex = MOCK_WIDGETS.findIndex(widget => widget.id === id);
  if (widgetIndex === -1) {
    throw new Error("Widget not found");
  }
  
  // In a real app, this would update the database
  const updatedWidget: Widget = {
    ...MOCK_WIDGETS[widgetIndex],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  
  return updatedWidget;
};

// Delete widget
export const deleteWidget = async (id: string): Promise<boolean> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400));
  
  // In a real app, this would delete from the database
  return true;
};
