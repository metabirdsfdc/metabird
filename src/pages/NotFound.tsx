import { AlertTriangle, Home } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black px-4">
      <div className="w-full max-w-md bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-md p-6 space-y-5 text-center">
        <div className="flex justify-center">
          <AlertTriangle
            size={36}
            className="text-yellow-500 dark:text-yellow-400"
          />
        </div>

        <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          404 – Page Not Found
        </h1>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          The page you’re looking for doesn’t exist or was moved.
        </p>

        <button
          onClick={() => navigate("/", { replace: true })}
          className="w-full flex items-center justify-center gap-2 rounded-md border border-gray-300 dark:border-gray-700 py-2 text-sm font-medium text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-900 transition"
        >
          <Home size={16} />
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
