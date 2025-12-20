import { ArrowRight, LogOut, User as UserIcon } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const Settings: React.FC = () => {
  const { authState, logout } = useContext(AuthContext);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    if (authState.user) {
      setFullName(authState.user.fullName);
      setEmail(authState.user.username);
    }
  }, [authState.user]);

  useEffect(() => {
    if (!authState.user) return;

    setDirty(
      fullName !== authState.user.fullName || email !== authState.user.username
    );
  }, [fullName, email, authState.user]);

  const handleUpdate = () => {
    const updatedUser = {
      ...authState.user!,
      fullName,
      email
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));
    setDirty(false);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
        Settings
      </h1>

      <section className="bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-md p-6 space-y-6">
        <div className="flex items-center gap-3">
          <UserIcon className="text-blue-600 dark:text-blue-400" size={22} />
          <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
            Account & Security
          </h2>
        </div>

        <div className="space-y-4 border-b border-gray-200 dark:border-gray-700 pb-4">
          <div>
            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
              Full Name
            </label>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="text-black w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-black w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm"
            />
          </div>

          {dirty && (
            <div className="flex justify-end">
              <button
                onClick={handleUpdate}
                className="text-sm text-blue-600 dark:text-blue-400 flex items-center gap-1"
              >
                Update Profile <ArrowRight size={14} />
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-3">
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              Change Password
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Update your account password.
            </p>
          </div>
          <button className="text-sm text-blue-600 dark:text-blue-400 flex items-center gap-1">
            Change <ArrowRight size={14} />
          </button>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              Sign out
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Log out from this device.
            </p>
          </div>
          <button
            onClick={logout}
            className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1"
          >
            Logout <LogOut size={14} />
          </button>
        </div>
      </section>
    </div>
  );
};

export default Settings;

{
  /** 
   
     <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Email Preferences
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Manage how you receive notifications.
              </p>
            </div>
            <button className="text-sm text-blue-600 dark:text-blue-400 flex items-center gap-1">
              Update <ArrowRight size={14} />
            </button>
          </div>
     <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Two-Factor Authentication
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Add an extra layer of protection.
              </p>
            </div>
            <button className="text-sm text-blue-600 dark:text-blue-400 flex items-center gap-1">
              Configure <ArrowRight size={14} />
            </button>
          </div>
 <section className="bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-md p-6 space-y-6">
        <div className="flex items-center gap-3">
          <Bell className="text-blue-600 dark:text-blue-400" size={22} />
          <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
            Notifications
          </h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-3">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Deploy Alerts
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Receive alerts when deployments complete or fail.
              </p>
            </div>
            <button className="text-sm text-blue-600 dark:text-blue-400 flex items-center gap-1">
              Manage <ArrowRight size={14} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Metadata Changes
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Stay updated about metadata modifications.
              </p>
            </div>
            <button className="text-sm text-blue-600 dark:text-blue-400 flex items-center gap-1">
              Configure <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-md p-6 space-y-6">
        <div className="flex items-center gap-3">
          <Globe className="text-blue-600 dark:text-blue-400" size={22} />
          <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
            General Preferences
          </h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-3">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Language
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Set your preferred language.
              </p>
            </div>
            <button className="text-sm text-blue-600 dark:text-blue-400 flex items-center gap-1">
              Change <ArrowRight size={14} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Timezone
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Adjust display times to your location.
              </p>
            </div>
            <button className="text-sm text-blue-600 dark:text-blue-400 flex items-center gap-1">
              Update <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-md p-6 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Reset your dashboard and personalization preferences. This action
          cannot be undone.
        </p>
        <button className="mt-4 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
          <Trash2 size={16} />
          Reset Settings
        </button>
      </section>
    
*/
}
