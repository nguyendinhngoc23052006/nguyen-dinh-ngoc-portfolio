import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    setMounted(true);
    const current =
      (document.documentElement.getAttribute("data-theme") as
        | "light"
        | "dark") || "dark";
    setTheme(current);
  }, []);

  const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const next = theme === "dark" ? "light" : "dark";
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

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground"
      >
        <span style={{ width: 20, height: 20, display: "inline-block" }} />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
