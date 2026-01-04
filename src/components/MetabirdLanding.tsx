import { Bird, Cloud, Layers, ShieldCheck } from "lucide-react";
import React, { useState } from "react";
import AuthSlideOver from "./modals/AuthSlideOver";

const features = [
  {
    icon: Layers,
    title: "Metadata Precision",
    desc: "Select, retrieve, and deploy metadata with absolute control."
  },
  {
    icon: Cloud,
    title: "Multi-Org Access",
    desc: "Securely connect and deploy across multiple Salesforce orgs."
  },
  {
    icon: ShieldCheck,
    title: "Deployment Safety",
    desc: "Clear visibility into failures, successes, and rollbacks."
  },
  {
    icon: Bird,
    title: "Built for Teams",
    desc: "Designed for admins and developers working together."
  }
];

const MetabirdLanding: React.FC = () => {
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0E1110] text-[#1F2937] dark:text-white transition-colors">
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-[#0E1110]/80 backdrop-blur border-b border-[#E5E7EB] dark:border-[#1F2A25]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-sm tracking-[0.3em] font-bold">METABIRD</span>

          <button
            onClick={() => setAuthOpen(true)}
            className="
              px-5 py-2 rounded-full
              text-sm font-semibold
              border border-[#2F6F59]
              text-[#1F2937]
              hover:bg-[#2F6F59] hover:text-white
              dark:border-white dark:text-white
              dark:hover:bg-white dark:hover:text-[#0E1110]
              transition
            "
          >
            Sign in
          </button>
        </div>
      </header>

      <main>
        <section className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <span
              className="
                inline-flex w-fit
                px-4 py-2 rounded-full
                text-xs font-medium tracking-wide
                border border-[#DADCE0]
                text-[#6B7280]
                dark:border-[#2A332E] dark:text-gray-400
              "
            >
              Salesforce Deployment Platform
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight tracking-tight">
              Metadata deployments
              <br />
              without uncertainty
            </h1>

            <p className="text-lg text-[#6B7280] dark:text-gray-400 max-w-xl leading-relaxed">
              Metabird helps Salesforce teams deploy metadata with clarity,
              predictability, and confidence across environments.
            </p>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setAuthOpen(true)}
                className="
                  px-6 py-3 rounded-full
                  bg-[#2F6F59] text-white
                  text-sm font-semibold
                  hover:opacity-90
                  transition
                "
              >
                Get started
              </button>

              <button
                onClick={() => setAuthOpen(true)}
                className="
                  px-6 py-3 rounded-full
                  border border-[#DADCE0]
                  text-sm font-medium
                  text-[#1F2937]
                  hover:bg-[#F6F7F6]
                  dark:border-[#2A332E] dark:text-white
                  dark:hover:bg-[#151917]
                  transition
                "
              >
                Login
              </button>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="
                    p-8 rounded-3xl
                    border border-[#E5E7EB]
                    bg-[#F6F7F6]
                    dark:bg-[#151917]
                    dark:border-[#2A332E]
                    transition
                  "
                >
                  <div
                    className="
                      mb-6 h-10 w-10 rounded-full
                      flex items-center justify-center
                      bg-white
                      dark:bg-[#0E1110]
                    "
                  >
                    <Icon className="w-5 h-5 text-[#2F6F59]" />
                  </div>

                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>

                  <p className="text-sm text-[#6B7280] dark:text-gray-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <footer className="border-t border-[#E5E7EB] dark:border-[#1F2A25] py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-xs text-[#6B7280] dark:text-gray-500">
          © {new Date().getFullYear()} Metabird · Built by Suddala Pavan Kalyan
        </div>
      </footer>

      <AuthSlideOver open={authOpen} onClose={() => setAuthOpen(false)} />
    </div>
  );
};

export default MetabirdLanding;
