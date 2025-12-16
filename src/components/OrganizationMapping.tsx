import React from "react";
import { useOrganizationMappingStore } from "../hooks/useOrganizationMapping";
import {
  useOrganizations,
  type SalesforceSession
} from "../hooks/useOrganizations";

const OrganizationMapping: React.FC = () => {
  const { sourceOrg, targetOrg, setSource, setTarget } =
    useOrganizationMappingStore();

  const { organizationList } = useOrganizations();

  return (
    <section
      className="
        w-full sm:w-[calc(50%-0.5rem)] lg:w-full
        bg-white dark:bg-black
        border border-gray-300 dark:border-gray-700
        rounded-md p-4 space-y-3
        transition-colors
        hover:border-gray-400 dark:hover:border-gray-600
      "
    >
      <h2 className="text-xs font-semibold text-gray-900 dark:text-gray-100">
        Organization Mapping
      </h2>

      <div className="space-y-3">
        <OrgSelect
          label="Source Organization"
          value={sourceOrg}
          onChange={setSource}
          organizations={organizationList}
        />

        <div className="text-center text-xs text-gray-400">→</div>

        <OrgSelect
          label="Target Organization"
          value={targetOrg}
          onChange={setTarget}
          organizations={organizationList}
        />
      </div>
    </section>
  );
};

export default OrganizationMapping;

type OrgSelectProps = {
  label: string;
  value: string | null;
  onChange: (id: string) => void;
  organizations: SalesforceSession[];
};

const OrgSelect: React.FC<OrgSelectProps> = ({
  label,
  value,
  onChange,
  organizations
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;

    console.log("[OrgSelect] Change detected", {
      label,
      previousValue: value,
      nextValue: selectedValue
    });

    onChange(selectedValue);
  };

  return (
    <div>
      <p className="text-[11px] text-gray-500 dark:text-gray-400 mb-1">
        {label}
      </p>

      <select
        value={value ?? ""}
        onChange={handleChange}
        className="
          w-full px-2.5 py-2 text-xs
          bg-white dark:bg-black
          text-gray-900 dark:text-gray-100
          border border-gray-300 dark:border-gray-700
          rounded-md
          focus:outline-none
          focus:ring-2 focus:ring-blue-600/30
          focus:border-blue-600
          transition-colors
        "
      >
        <option value="">Select organization</option>

        {organizations.map((org) => (
          <option key={org.userId} value={org.userId}>
            {org.organizationName}
          </option>
        ))}
      </select>
    </div>
  );
};
