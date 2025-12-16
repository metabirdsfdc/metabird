import { BookOpen, Mail, Search } from "lucide-react";
import React, { useState } from "react";

const Help: React.FC = () => {
  const [query, setQuery] = useState("");

  const faqs = [
    {
      q: "How do I connect a Salesforce org?",
      a: "Go to Manage Organizations → Add Organization and follow the OAuth flow or provide credentials as configured."
    },
    {
      q: "How do I retrieve metadata?",
      a: "Open a metadata type from the Dashboard or Metadata page and use Retrieve. Check logs in History for status."
    },
    {
      q: "Why did my deploy fail?",
      a: "Check the deploy error details in the History page. Common causes: missing dependencies, validation errors, or incompatible API versions."
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Help & Support
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Search docs, browse FAQs or contact support for assistance.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2">
            <Search size={16} className="text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search documentation..."
              className="ml-2 w-64 bg-transparent outline-none text-sm text-gray-700 dark:text-gray-200"
            />
          </div>

          <a
            href="/help/docs"
            className="inline-flex items-center gap-2 px-3 py-2 text-sm bg-white text-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-md"
          >
            <BookOpen size={16} />
            Docs
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <section className="bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-md p-4">
            <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-3">
              Frequently Asked Questions
            </h2>

            <div className="space-y-3">
              {faqs
                .filter(
                  (f) =>
                    query.trim() === "" ||
                    (f.q + f.a).toLowerCase().includes(query.toLowerCase())
                )
                .map((f, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-md bg-gray-50 dark:bg-gray-900"
                  >
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {f.q}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {f.a}
                    </p>
                  </div>
                ))}
            </div>
          </section>

          <section className="bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-md p-4">
            <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-3">
              Troubleshooting
            </h2>
            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 space-y-2">
              <li>
                Confirm your session and metadata API endpoint version match.
              </li>
              <li>
                Ensure SOAPAction header is present when using SOAP clients.
              </li>
              <li>
                Check History for detailed deploy/retrieve logs and errors.
              </li>
            </ul>
          </section>
        </div>

        <aside className="space-y-4">
          <div className="bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-md p-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Contact Support
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Open a support ticket and we will respond within one business day.
            </p>
            <a
              href="mailto:support@metabird.app"
              className="mt-3 inline-flex items-center gap-2 px-3 py-2 text-sm bg-blue-600 text-white rounded-md"
            >
              <Mail size={16} />
              Email Support
            </a>
          </div>

          <div className="bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-md p-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Resources
            </h3>
            <ul className="text-sm space-y-2">
              <li>
                <a
                  className="text-blue-600 dark:text-blue-400"
                  href="/help/docs"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  className="text-blue-600 dark:text-blue-400"
                  href="/help/api"
                >
                  API Reference
                </a>
              </li>
              <li>
                <a
                  className="text-blue-600 dark:text-blue-400"
                  href="/help/faq"
                >
                  Full FAQ
                </a>
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-md p-4 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Need immediate help?
            </p>
            <a
              className="mt-2 inline-block px-3 py-2 text-sm bg-blue-600 text-white rounded-md"
              href="/help/chat"
            >
              Live Chat
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Help;
