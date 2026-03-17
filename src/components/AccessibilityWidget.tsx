import { useState, useEffect, useRef } from "react";
import { Accessibility } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const STORAGE_KEY = "aiga-accessibility";

interface A11yState {
  contrast: boolean;
  largeText: boolean;
  colorblind: boolean;
  reduceMotion: boolean;
}

const defaults: A11yState = { contrast: false, largeText: false, colorblind: false, reduceMotion: false };

const classMap: Record<keyof A11yState, string> = {
  contrast: "a11y-contrast",
  largeText: "a11y-large-text",
  colorblind: "a11y-colorblind",
  reduceMotion: "a11y-reduce-motion",
};

const AccessibilityWidget = () => {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<A11yState>(defaults);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as A11yState;
        setState(parsed);
        applyClasses(parsed);
      }
    } catch {}
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const applyClasses = (s: A11yState) => {
    const el = document.documentElement;
    (Object.keys(classMap) as (keyof A11yState)[]).forEach((key) => {
      el.classList.toggle(classMap[key], s[key]);
    });
  };

  const toggle = (key: keyof A11yState) => {
    const next = { ...state, [key]: !state[key] };
    setState(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    applyClasses(next);
  };

  const options: { key: keyof A11yState; label: string }[] = [
    { key: "contrast", label: "High Contrast" },
    { key: "largeText", label: "Large Text" },
    { key: "colorblind", label: "Colorblind Mode" },
    { key: "reduceMotion", label: "Reduce Motion" },
  ];

  return (
    <div
      ref={ref}
      className="fixed bottom-6 right-6 z-40"
      style={{ fontSize: "16px", filter: "none" }}
    >
      {open && (
        <div
          className="absolute bottom-14 right-0 w-[280px] rounded-xl border border-border bg-card shadow-lg p-4 mb-2"
          style={{ fontSize: "16px", filter: "none" }}
        >
          <p className="text-sm font-semibold text-foreground mb-3">Toegankelijkheid</p>
          <div className="space-y-3">
            {options.map(({ key, label }) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-sm text-foreground">{label}</span>
                <Switch checked={state[key]} onCheckedChange={() => toggle(key)} />
              </div>
            ))}
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Toegankelijkheidsinstellingen"
        className="h-12 w-12 rounded-full border-2 border-primary bg-foreground text-primary flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
        style={{ fontSize: "16px", filter: "none" }}
      >
        <Accessibility size={22} />
      </button>
    </div>
  );
};

export default AccessibilityWidget;
