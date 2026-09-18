"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type SosContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const SosContext = createContext<SosContextValue | null>(null);

export function SosProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const value = useMemo(() => ({ open, setOpen }), [open]);
  return <SosContext.Provider value={value}>{children}</SosContext.Provider>;
}

export function useSos() {
  const ctx = useContext(SosContext);
  if (!ctx) {
    throw new Error("useSos must be used within SosProvider");
  }
  return ctx;
}
