import React, { useState } from "react";

import { useOrganizationStore } from "../../hooks/useOrganizationStore";
import PageSpinner from "./PageSpinner";

export type OAuthCredRequest = {
  name: string;
  orgType: "sandbox" | "production";
  username: string;
  password: string;
  securityToken: string;
};

type Props = {
  create: (session: OAuthCredRequest) => Promise<void>;
};
const AddOrganizationModal: React.FC<Props> = ({ create }) => {
  const { isAddModalOpen, closeAddModal } = useOrganizationStore();

  const [form, setForm] = useState<OAuthCredRequest>({
    name: "",
    orgType: "production",
    username: "",
    password: "",
    securityToken: ""
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isAddModalOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const clearForm = () => {
    setForm({
      name: "",
      orgType: "sandbox",
      username: "",
      password: "",
      securityToken: ""
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      await create(form);
      closeAddModal();
      clearForm();
    } catch {
      setErrorMessage("Failed to add organization. Check credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 transition-opacity"
        onClick={!isLoading ? closeAddModal : undefined}
      />

      <div
        className="
          relative w-full max-w-md
          bg-white dark:bg-black
          border border-gray-300 dark:border-gray-700
          rounded-lg
          px-6 py-5
        "
      >
        {isLoading && <PageSpinner />}

        <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
          Add Organization
        </h2>

        <div className="mt-5 space-y-4">
          <Field label="Organization Name">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="form-input"
              disabled={isLoading}
            />
          </Field>

          <Field label="Organization Type">
            <select
              name="orgType"
              value={form.orgType}
              onChange={handleChange}
              className="form-input"
              disabled={isLoading}
            >
              <option value="sandbox">Sandbox</option>
              <option value="production">Production</option>
            </select>
          </Field>

          <Field label="Username">
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="form-input"
              disabled={isLoading}
            />
          </Field>

          <Field label="Password">
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="form-input"
              disabled={isLoading}
            />
          </Field>

          <Field label="Security Token">
            <input
              type="password"
              name="securityToken"
              value={form.securityToken}
              onChange={handleChange}
              className="form-input"
              disabled={isLoading}
            />
          </Field>

          {errorMessage && (
            <div className="text-xs text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2">
              {errorMessage}
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={closeAddModal}
            disabled={isLoading}
            className="
              px-4 py-2 text-sm
              text-gray-700 dark:text-gray-300
              border border-gray-300 dark:border-gray-700
              rounded-md
              hover:bg-gray-100 dark:hover:bg-gray-900
              transition-colors
              disabled:opacity-50
            "
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="
              px-4 py-2 text-sm font-medium
              bg-blue-600 text-white
              rounded-md
              hover:bg-blue-700
              transition-colors
              disabled:opacity-50
            "
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddOrganizationModal;

const Field: React.FC<{ label: string; children: React.ReactNode }> = ({
  label,
  children
}) => (
  <div className="space-y-1.5">
    <label className="text-xs font-medium text-gray-700 dark:text-gray-400">
      {label}
    </label>
    {children}
  </div>
);
