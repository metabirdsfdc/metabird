import clsx from "clsx";
import { X } from "lucide-react";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useNavStore } from "../hooks/useNavStore";
import { useSidebarStore } from "../hooks/useSidebarStore";

const Sidebar: React.FC = () => {
  const { isOpen, toggle } = useSidebarStore();
  const { items, active, setActive } = useNavStore();
  const navigate = useNavigate();

  const { logout } = useContext(AuthContext);
  return (
    <div
      className={clsx(
        "fixed left-0 top-0 h-screen bg-white dark:bg-black border-r border-gray-200 dark:border-gray-800 flex flex-col z-50 transition-all duration-300 ease-in-out",
        isOpen ? "w-64" : "w-16"
      )}
    >
      <div className="flex flex-col h-full overflow-hidden">
        <div className="relative p-4 flex items-center space-x-3">
          {isOpen && (
            <button
              onClick={toggle}
              className="absolute right-0 top-4 flex items-center justify-center w-8 h-8 rounded-full bg-gray-900 text-gray-100 hover:bg-gray-800 transition-all duration-200"
            >
              <X size={14} />
            </button>
          )}

          <div
            className={clsx(
              "flex items-center overflow-hidden transition-all duration-300",
              isOpen ? "h-16 gap-2" : "h-16 justify-center"
            )}
          >
            <div
              role="button"
              className={clsx(
                "rounded-full bg-gray-300 dark:bg-blue-700 flex-shrink-0 transition-all duration-300 cursor-pointer",
                isOpen ? "w-10 h-10" : "w-8 h-8"
              )}
              onClick={() => {
                if (!isOpen) toggle();
              }}
            />

            <div
              className={clsx(
                "transition-all duration-300 transform",
                isOpen
                  ? "opacity-100 translate-x-0 relative w-auto h-auto"
                  : "opacity-0 -translate-x-4 absolute w-0 h-0 overflow-hidden pointer-events-none"
              )}
            >
              <p className="font-medium text-sm text-gray-900 dark:text-gray-100">
                Pavan Kalyan
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Admin</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-2 space-y-1 mt-2">
          {items.slice(0, 4).map((item) => (
            <SidebarItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              isOpen={isOpen}
              active={active === item.id}
              onClick={() => {
                setActive(item.id);
                navigate(item.path);
              }}
            />
          ))}
        </nav>

        <div className="px-2 py-4 border-t border-gray-200 dark:border-gray-800 space-y-1">
          {items.slice(4).map((item) => (
            <SidebarItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              isOpen={isOpen}
              active={active === item.id}
              onClick={() => {
                setActive(item.id);
                navigate(item.path);
              }}
            />
          ))}
        </div>

        <div className="flex items-center justify-center">
          <button
            onClick={logout}
            className="
      px-3 py-1.5
      text-sm font-medium
      rounded-md
      border border-gray-300
      text-gray-700
      hover:bg-gray-100
      transition
      dark:border-gray-700
      dark:text-gray-300
      dark:hover:bg-gray-900
    "
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  isOpen: boolean;
  active: boolean;
  onClick: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  label,
  isOpen,
  active,
  onClick
}) => {
  return (
    <div
      onClick={onClick}
      className={clsx(
        "flex items-center rounded-md cursor-pointer px-3 py-2 transition-colors",
        active
          ? "bg-blue-600 text-white"
          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900"
      )}
    >
      <div className="flex items-center justify-center w-6 text-sm">{icon}</div>

      <span
        className={clsx(
          "ml-3 text-sm font-medium whitespace-nowrap transform transition-all duration-300",
          isOpen
            ? "opacity-100 translate-x-0"
            : "opacity-0 -translate-x-4 pointer-events-none"
        )}
      >
        {label}
      </span>
    </div>
  );
};
