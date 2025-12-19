import { Building2, Pencil, Plus, Trash2 } from "lucide-react";
import React from "react";
import AddOrganizationModal from "../components/modals/AddOrganizationModal";
import { useOrganizationStore } from "../hooks/useOrganizationStore";
import { useOrganizations } from "../hooks/useOrganizations";

const Organizations: React.FC = () => {
  const { openAddModal } = useOrganizationStore();

  const {
    organizationList,
    isLoadingOrganizations,
    loadError,
    create,
    deleteOrg
  } = useOrganizations();

  return (
    <div className="space-y-5 relative">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Manage Organizations
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Add, remove or configure your connected Salesforce orgs.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition"
        >
          <Plus size={16} />
          Add Organization
        </button>
      </div>

      {isLoadingOrganizations && (
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Loading organizations...
        </div>
      )}

      {loadError && (
        <div className="text-sm text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2">
          {loadError}
        </div>
      )}

      <div className="space-y-3">
        {Array.isArray(organizationList) &&
          organizationList.map((org) => (
            <div
              key={org.userEmail}
              className="
              flex items-center justify-between
              bg-white dark:bg-black
              border border-gray-200 dark:border-gray-800
              rounded-md px-4 py-3
              transition hover:bg-gray-50 dark:hover:bg-gray-900
            "
            >
              <div className="flex items-center gap-3">
                <Building2
                  size={22}
                  className="text-blue-600 dark:text-blue-400"
                />

                <div className="leading-tight">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {org.organizationName}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {org.organizationId === "sandbox"
                      ? "Sandbox"
                      : "Production"}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    {org.userEmail}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                  onClick={openAddModal}
                >
                  <Pencil
                    size={16}
                    className="text-gray-600 dark:text-gray-300"
                  />
                </button>

                <button
                  onClick={() => deleteOrg(org.userEmail)}
                  className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                  <Trash2
                    size={16}
                    className="text-gray-600 dark:text-gray-300"
                  />
                </button>
              </div>
            </div>
          ))}
      </div>

      {!isLoadingOrganizations &&
        Array.isArray(organizationList) &&
        organizationList.length === 0 && (
          <div className="text-center py-16 text-sm text-gray-500 dark:text-gray-400">
            No organizations added yet.
          </div>
        )}

      <AddOrganizationModal create={create} />
    </div>
  );
};

export default Organizations;
