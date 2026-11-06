import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

const THEME_KEY = "nexo-theme";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const getInitialTheme = (): Theme => {
  if (typeof document === "undefined") return "light";
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    localStorage.setItem(THEME_KEY, theme);
    window.dispatchEvent(new CustomEvent("nexo-theme-change"));
  }, [theme]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (event: MediaQueryListEvent) => {
      if (!localStorage.getItem(THEME_KEY)) {
        setTheme(event.matches ? "dark" : "light");
      }
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme: () =>
          setTheme((current) => (current === "light" ? "dark" : "light")),
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("ThemeToggle must be used inside ThemeProvider");
  const dark = context.theme === "dark";

  return (
    <button
      type="button"
      className={`theme-toggle ${className}`}
      onClick={context.toggleTheme}
      aria-label={dark ? "Activar modo claro" : "Activar modo oscuro"}
      title={dark ? "Activar modo claro" : "Activar modo oscuro"}
    >
      {dark ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
      <span>{dark ? "Modo claro" : "Modo oscuro"}</span>
    </button>
  );
}
