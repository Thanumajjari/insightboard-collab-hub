
import { Link } from "react-router-dom";
import LoginForm from "@/components/auth/LoginForm";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-insight-700">InsightBoard</h1>
        <p className="text-muted-foreground">Collaborative Dashboard Platform</p>
      </div>
      <LoginForm />
      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>
          © {new Date().getFullYear()} InsightBoard. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
