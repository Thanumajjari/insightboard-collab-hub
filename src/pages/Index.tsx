
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // If user is already authenticated, redirect to dashboard
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero section */}
      <div className="flex-grow flex flex-col items-center justify-center text-center px-4 py-16 bg-gradient-to-r from-insight-50 to-insight-100">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-insight-700 to-insight-900">
          InsightBoard
        </h1>
        <p className="text-xl md:text-2xl max-w-3xl mb-8 text-gray-700">
          A collaborative dashboard platform for teams to share insights, analytics, and make data-driven decisions together.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/login">
            <Button className="text-lg px-8 py-6 bg-insight-600 hover:bg-insight-700">
              Sign In
            </Button>
          </Link>
          <Link to="/register">
            <Button variant="outline" className="text-lg px-8 py-6">
              Create Account
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Features section */}
      <div className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-insight-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">Role-Based Access</h3>
              <p className="text-gray-700">
                Customize permissions based on roles: Admin, Project Manager, Analyst, and Viewer.
              </p>
            </div>
            <div className="bg-insight-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">Analytics Widgets</h3>
              <p className="text-gray-700">
                Create and share powerful visualization widgets for project data.
              </p>
            </div>
            <div className="bg-insight-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">Real-Time Collaboration</h3>
              <p className="text-gray-700">
                Work together with your team in real-time with instant updates.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-100 py-8 px-4 text-center">
        <p className="text-gray-600">
          © {new Date().getFullYear()} InsightBoard | Collaborative Dashboard Platform
        </p>
        <p className="text-sm text-gray-500 mt-2">
          For internal use only
        </p>
      </footer>
    </div>
  );
};

export default Index;
