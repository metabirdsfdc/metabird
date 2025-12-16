import { Lock, Mail, User, X } from "lucide-react";
import React, { useState } from "react";

export type AuthModalProps = {
  open: boolean;
  onClose: () => void;
};

const AuthModal: React.FC<AuthModalProps> = ({ open, onClose }) => {
  const [mode, setMode] = useState<"login" | "signup">("login");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div
        className="
          relative z-10 w-full max-w-md
          bg-white dark:bg-black
          border border-gray-300 dark:border-gray-700
          rounded-md p-6
          space-y-6
        "
      >
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {mode === "login" ? "Sign In" : "Create Account"}
          </h1>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X size={18} />
          </button>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          {mode === "login"
            ? "Access your deployment dashboard"
            : "Get started with metadata management"}
        </p>

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
            className="font-medium text-blue-600 hover:underline"
          >
            {mode === "login" ? "Sign up" : "Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
