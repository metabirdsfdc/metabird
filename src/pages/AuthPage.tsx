import clsx from "clsx";
import { Lock, Mail, User } from "lucide-react";
import React, { useState } from "react";

const AuthPage: React.FC = () => {
  const [mode, setMode] = useState<"login" | "signup">("login");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-neutral-950 px-4">
      <div
        className="
          w-full max-w-md
          bg-white dark:bg-black
          border border-gray-300 dark:border-gray-700
          rounded-md p-6
          space-y-6
        "
      >
        {/* Header */}
        <div className="text-center space-y-1">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {mode === "login" ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {mode === "login"
              ? "Sign in to manage deployments"
              : "Sign up to start managing metadata"}
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4">
          {mode === "signup" && (
            <div className="space-y-1">
              <label className="text-xs text-gray-600 dark:text-gray-400">
                Name
              </label>
              <div className="relative">
                <User
                  size={16}
                  className="absolute left-3 top-2.5 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Your name"
                  className="
                    w-full pl-9 pr-3 py-2 text-sm
                    border border-gray-300 dark:border-gray-700
                    rounded-md bg-white dark:bg-black
                    text-gray-900 dark:text-gray-100
                    focus:outline-none focus:ring-1 focus:ring-blue-500
                  "
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs text-gray-600 dark:text-gray-400">
              Email
            </label>
            <div className="relative">
              <Mail
                size={16}
                className="absolute left-3 top-2.5 text-gray-400"
              />
              <input
                type="email"
                placeholder="you@example.com"
                className="
                  w-full pl-9 pr-3 py-2 text-sm
                  border border-gray-300 dark:border-gray-700
                  rounded-md bg-white dark:bg-black
                  text-gray-900 dark:text-gray-100
                  focus:outline-none focus:ring-1 focus:ring-blue-500
                "
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs text-gray-600 dark:text-gray-400">
              Password
            </label>
            <div className="relative">
              <Lock
                size={16}
                className="absolute left-3 top-2.5 text-gray-400"
              />
              <input
                type="password"
                placeholder="••••••••"
                className="
                  w-full pl-9 pr-3 py-2 text-sm
                  border border-gray-300 dark:border-gray-700
                  rounded-md bg-white dark:bg-black
                  text-gray-900 dark:text-gray-100
                  focus:outline-none focus:ring-1 focus:ring-blue-500
                "
              />
            </div>
          </div>

          {/* Action */}
          <button
            type="submit"
            className="
              w-full py-2 text-sm font-medium
              rounded-md
              bg-blue-600 hover:bg-blue-700
              text-white
              transition-colors
            "
          >
            {mode === "login" ? "Sign In" : "Create Account"}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center text-sm">
          <span className="text-gray-500 dark:text-gray-400">
            {mode === "login"
              ? "Don’t have an account?"
              : "Already have an account?"}
          </span>{" "}
          <button
            onClick={() => setMode((m) => (m === "login" ? "signup" : "login"))}
            className={clsx("font-medium", "text-blue-600 hover:underline")}
          >
            {mode === "login" ? "Sign up" : "Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
