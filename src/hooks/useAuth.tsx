
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/sonner";

type Role = "admin" | "project_manager" | "analyst" | "viewer";

interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: Role) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demo purposes
const MOCK_USERS = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    password: "password",
    role: "admin" as Role,
  },
  {
    id: "2",
    name: "Project Manager",
    email: "pm@example.com",
    password: "password",
    role: "project_manager" as Role,
  },
  {
    id: "3",
    name: "Analyst User",
    email: "analyst@example.com",
    password: "password",
    role: "analyst" as Role,
  },
  {
    id: "4",
    name: "Viewer User",
    email: "viewer@example.com",
    password: "password",
    role: "viewer" as Role,
  },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // Check for existing user session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("insightboard_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("insightboard_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API request delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user in mock data (in real app, this would be an API call)
      const foundUser = MOCK_USERS.find(
        (u) => u.email === email && u.password === password
      );
      
      if (!foundUser) {
        throw new Error("Invalid email or password");
      }
      
      // Create user object without password
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      
      // Store user in localStorage (in real app, would store JWT token)
      localStorage.setItem("insightboard_user", JSON.stringify(userWithoutPassword));
      
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to login");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, role: Role) => {
    setIsLoading(true);
    
    try {
      // Simulate API request delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists (in real app, this would be an API call)
      const existingUser = MOCK_USERS.find((u) => u.email === email);
      
      if (existingUser) {
        throw new Error("User with this email already exists");
      }
      
      // Create new user (in real app, this would be saved to the database)
      const newUser = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        email,
        role,
      };
      
      setUser(newUser);
      
      // Store user in localStorage (in real app, would store JWT token)
      localStorage.setItem("insightboard_user", JSON.stringify(newUser));
      
      toast.success("Registration successful!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to register");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("insightboard_user");
    setUser(null);
    navigate("/");
    toast.info("Logged out successfully");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
