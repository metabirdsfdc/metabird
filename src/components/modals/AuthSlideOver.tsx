import axios from "axios";
import clsx from "clsx";
import { Lock, Mail, User, X } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

type AuthSlideOverProps = {
  open: boolean;
  onClose: () => void;
};

type Mode = "login" | "signup";

type AuthForm = {
  fullName: string;
  email: string;
  password: string;
};

const initialForm: AuthForm = {
  fullName: "",
  email: "",
  password: ""
};

const AuthSlideOver: React.FC<AuthSlideOverProps> = ({ open, onClose }) => {
  const [mode, setMode] = useState<Mode>("login");
  const [form, setForm] = useState<AuthForm>(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useContext(AuthContext);

  /* -------------------- Effects -------------------- */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setForm(initialForm);
    setError(null);
  }, [mode, open]);

  /* -------------------- Handlers -------------------- */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const url = mode === "login" ? "/api/auth/login" : "/api/auth/signup";

      const payload =
        mode === "login"
          ? { username: form.email, password: form.password }
          : {
              fullName: form.fullName,
              username: form.email,
              password: form.password
            };

      const { data } = await axios.post(
        `http://localhost:8080${url}`,
        payload,
        { withCredentials: true }
      );

      console.log(data);

      login(data);
      onClose();
      //   window.location.href = "/";
    } catch (err: any) {
      setError(
        err?.response?.data?.message || "Authentication failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  /* -------------------- UI -------------------- */
  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={clsx(
          "fixed inset-0 z-40 bg-black/40 transition-opacity",
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      />

      {/* Slide Panel */}
      <div
        className={clsx(
          "fixed inset-y-0 right-0 z-50 w-full sm:w-[420px]",
          "bg-white dark:bg-black",
          "border-l border-gray-300 dark:border-gray-700",
          "transform transition-transform duration-300 ease-in-out",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex h-full flex-col p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-black dark:text-white">
              {mode === "login" ? "Sign In" : "Create Account"}
            </h2>
            <button className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">
              <X size={18} onClick={onClose} />
            </button>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400">
            {mode === "login"
              ? "Access your Metabird workspace"
              : "Start managing Salesforce metadata"}
          </p>

          {/* Error */}
          {error && (
            <div className="rounded border border-gray-700 bg-gray-900 p-2 text-sm text-white">
              {error}
            </div>
          )}

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {mode === "signup" && (
              <div>
                <label className="text-xs text-gray-700 dark:text-gray-300">
                  Name
                </label>
                <div className="relative mt-1">
                  <User
                    className="absolute left-3 top-2.5 text-gray-500 dark:text-gray-400"
                    size={16}
                  />
                  <input
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="w-full rounded-md border border-gray-300 bg-white py-2 pl-9 text-sm text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:border-gray-700 dark:bg-black dark:text-white"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-xs text-gray-700 dark:text-gray-300">
                Email
              </label>
              <div className="relative mt-1">
                <Mail
                  className="absolute left-3 top-2.5 text-gray-500 dark:text-gray-400"
                  size={16}
                />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-md border border-gray-300 bg-white py-2 pl-9 text-sm text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:border-gray-700 dark:bg-black dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div className="relative mt-1">
                <Lock
                  className="absolute left-3 top-2.5 text-gray-500 dark:text-gray-400"
                  size={16}
                />
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="w-full rounded-md border border-gray-300 bg-white py-2 pl-9 text-sm text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:border-gray-700 dark:bg-black dark:text-white"
                />
              </div>
            </div>

            <button
              disabled={loading}
              className="w-full rounded-md bg-blue-600 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {loading
                ? "Please wait..."
                : mode === "login"
                ? "Sign In"
                : "Create Account"}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-auto text-center text-sm text-gray-700 dark:text-gray-300">
            {mode === "login"
              ? "Don’t have an account?"
              : "Already have an account?"}{" "}
            <button
              onClick={() =>
                setMode((m) => (m === "login" ? "signup" : "login"))
              }
              className="font-medium text-blue-600 hover:underline"
            >
              {mode === "login" ? "Sign up" : "Sign in"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthSlideOver;
