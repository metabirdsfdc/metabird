import { Moon, Sun } from "lucide-react";
import { useThemeStore } from "../hooks/useThemeStore";

const Theme = () => {
  const { theme, toggle } = useThemeStore();

  return (
    <button className="text-white" onClick={toggle}>
      {theme === "light" ? <Moon /> : <Sun />}
    </button>
  );
};

export default Theme;
