import { Bird, Cloud, Layers, ShieldCheck } from "lucide-react";
import React, { useState } from "react";
import AuthSlideOver from "./modals/AuthSlideOver";

const MetabirdLanding: React.FC = () => {
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-black">
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bird className="text-blue-600" size={22} />
            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              Metabird
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setAuthOpen(true)}
              className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-700 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900"
            >
              Login / Sign Up
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
              Salesforce Metadata Deployments,
              <br />
              Made Simple
            </h1>

            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Metabird helps teams retrieve, deploy, and track Salesforce
              metadata with clarity, enabling Salesforce employees to manage
              deployments efficiently and with confidence.
            </p>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setAuthOpen(true)}
                className="px-5 py-2 text-sm rounded-md bg-blue-600 hover:bg-blue-700 text-white"
              >
                Get Started
              </button>
              <button
                onClick={() => setAuthOpen(true)}
                className="px-5 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900"
              >
                Login
              </button>
            </div>
          </div>
        </section>

        <section className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
          <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Layers size={22} />,
                title: "Metadata Control",
                desc: "Deploy and retrieve metadata with precise component selection."
              },
              {
                icon: <Cloud size={22} />,
                title: "Org Connectivity",
                desc: "Securely connect multiple Salesforce organizations."
              },
              {
                icon: <ShieldCheck size={22} />,
                title: "Safe Deployments",
                desc: "Track failures, successes, and rollback behavior clearly."
              },
              {
                icon: <Bird size={22} />,
                title: "Developer First",
                desc: "Designed for admins and developers who value clarity."
              }
            ].map((item, idx) => (
              <div
                key={idx}
                className="border border-gray-300 dark:border-gray-700 rounded-md p-4"
              >
                <div className="text-blue-600 dark:text-blue-400 mb-2">
                  {item.icon}
                </div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {item.title}
                </h3>
                <p className="text-xs mt-1 text-gray-600 dark:text-gray-400">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-600 dark:text-gray-400 flex flex-col sm:flex-row items-center gap-2">
            <span>
              © {new Date().getFullYear()} Metabird. All rights reserved.
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="font-medium text-gray-800 dark:text-gray-200">
              Developed by Suddala Pavan Kalyan
            </span>
            <a
              href="https://www.linkedin.com/in/suddala-pavan-kalyan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              LinkedIn
            </a>
          </div>

          <div className="flex gap-6 text-sm text-gray-600 dark:text-gray-400">
            <button className="hover:text-gray-800 dark:hover:text-gray-200">
              Privacy
            </button>
            <button className="hover:text-gray-800 dark:hover:text-gray-200">
              Terms
            </button>
            <button className="hover:text-gray-800 dark:hover:text-gray-200">
              Support
            </button>
          </div>
        </div>
      </footer>

      <AuthSlideOver open={authOpen} onClose={() => setAuthOpen(false)} />
    </div>
  );
};

export default MetabirdLanding;
