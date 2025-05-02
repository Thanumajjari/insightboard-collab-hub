
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import PrivateRoute from "@/components/auth/PrivateRoute";
import MainLayout from "@/components/layout/MainLayout";
import Index from "./pages/Index";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import TeamPage from "./pages/TeamPage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <MainLayout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              
              <Route 
                path="/dashboard" 
                element={
                  <PrivateRoute>
                    <DashboardPage />
                  </PrivateRoute>
                } 
              />
              
              <Route 
                path="/projects" 
                element={
                  <PrivateRoute>
                    <ProjectsPage />
                  </PrivateRoute>
                } 
              />
              
              <Route 
                path="/projects/:projectId" 
                element={
                  <PrivateRoute>
                    <ProjectDetailPage />
                  </PrivateRoute>
                } 
              />
              
              <Route 
                path="/team" 
                element={
                  <PrivateRoute allowedRoles={["admin", "project_manager"]}>
                    <TeamPage />
                  </PrivateRoute>
                } 
              />
              
              <Route 
                path="/settings" 
                element={
                  <PrivateRoute allowedRoles={["admin"]}>
                    <SettingsPage />
                  </PrivateRoute>
                } 
              />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </MainLayout>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
