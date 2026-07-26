import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function readInitialTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  const attr = document.documentElement.getAttribute("data-theme");
  return attr === "light" ? "light" : "dark";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(readInitialTheme);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const current = document.documentElement.getAttribute("data-theme");
      if (current === "light" || current === "dark") setTheme(current);
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    const apply = () => {
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
      setTheme(next);
    };
    // biome-ignore lint/suspicious/noExplicitAny: View Transitions API not in default TS lib
    const doc = document as any;
    if (typeof doc.startViewTransition !== "function") {
      apply();
      return;
    }
    document.documentElement.style.setProperty(
      "--transition-x",
      `${e.clientX}px`,
    );
    document.documentElement.style.setProperty(
      "--transition-y",
      `${e.clientY}px`,
    );
    doc.startViewTransition(apply);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      suppressHydrationWarning
    >
      <span suppressHydrationWarning>
        {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
      </span>
    </button>
  );
}
