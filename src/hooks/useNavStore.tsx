import {
  Building,
  Gauge,
  HelpCircle,
  History,
  Layers,
  Palette,
  Settings
} from "lucide-react";
import { create } from "zustand";

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
      id: "dashboard",
      label: "Dashboard",
      icon: <Gauge size={18} />,
      path: "/"
    },
    {
      id: "deployments",
      label: "Deployments",
      icon: <Layers size={18} />,
      path: "/deployments"
    },
    {
      id: "history",
      label: "History",
      icon: <History size={18} />,
      path: "/history"
    },
    {
      id: "orgs",
      label: "Manage Orgs",
      icon: <Building size={18} />,
      path: "/organizations"
    },

    // Bottom section
    {
      id: "settings",
      label: "Settings",
      icon: <Settings size={18} />,
      path: "/settings"
    },
    {
      id: "personalization",
      label: "Personalization",
      icon: <Palette size={18} />,
      path: "/personalization"
    },
    {
      id: "help",
      label: "Help & About",
      icon: <HelpCircle size={18} />,
      path: "/help"
    }
  ],

  active: "dashboard",

  setActive: (id) => set({ active: id }),

  getActiveItem: () => {
    const state = get();
    return state.items.find((i) => i.id === state.active);
  },

  reset: () => set({ active: "dashboard" })
}));
