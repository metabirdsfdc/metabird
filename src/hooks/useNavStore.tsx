import { Building, Layers, Settings } from "lucide-react";
import { create } from "zustand";

const ACTIVE_KEY = "nav_active";

export interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
}

interface NavState {
  items: NavItem[];
  active: string;
  setActive: (id: string) => void;
  getActiveItem: () => NavItem | undefined;
  reset: () => void;
}

export const useNavStore = create<NavState>((set, get) => ({
  items: [
    {
      id: "deployments",
      label: "Deployments",
      icon: <Layers size={18} />,
      path: "/app"
    },
    {
      id: "orgs",
      label: "Manage Orgs",
      icon: <Building size={18} />,
      path: "/app/orgs"
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings size={18} />,
      path: "/app/settings"
    }
  ],

  active: localStorage.getItem(ACTIVE_KEY) || "dashboard",

  setActive: (id) => {
    localStorage.setItem(ACTIVE_KEY, id);
    set({ active: id });
  },

  getActiveItem: () => {
    const { items, active } = get();
    return items.find((i) => i.id === active);
  },

  reset: () => {
    localStorage.removeItem(ACTIVE_KEY);
    set({ active: "dashboard" });
  }
}));

// {
//   id: "personalization",
//   label: "Personalization",
//   icon: <Palette size={18} />,
//   path: "/app/personalization"
// },
// {
//   id: "help",
//   label: "Help & About",
//   icon: <HelpCircle size={18} />,
//   path: "/app/help"
// }
