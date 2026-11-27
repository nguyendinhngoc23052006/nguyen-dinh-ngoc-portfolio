import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

// The page passes its links and labels in its own language.
interface Props {
  links: { href: string; label: string }[];
  openLabel: string;
  closeLabel: string;
  navLabel: string;
}

export default function MobileNav({
  links,
  openLabel,
  closeLabel,
  navLabel,
}: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label={open ? closeLabel : openLabel}
        className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>
      {open && (
        <div className="absolute inset-x-0 top-14 z-50 border-b border-border/40 bg-background/95 px-6 py-4 backdrop-blur-lg">
          <nav className="flex flex-col gap-3" aria-label={navLabel}>
            {links.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
