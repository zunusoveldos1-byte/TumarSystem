"use client";

import { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "tumar_sidebar_collapsed";

type SidebarContextValue = {
  isCollapsed: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = createContext<SidebarContextValue | null>(null);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setIsCollapsed(localStorage.getItem(STORAGE_KEY) === "true");
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const toggleSidebar = () => {
    setIsCollapsed((current) => {
      const next = !current;
      localStorage.setItem(STORAGE_KEY, String(next));
      return next;
    });
  };

  return <SidebarContext.Provider value={{ isCollapsed, toggleSidebar }}>{children}</SidebarContext.Provider>;
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) throw new Error("useSidebar must be used inside SidebarProvider");
  return context;
}
