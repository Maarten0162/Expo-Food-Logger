// app/TabContext.tsx
import React, { createContext, useState, useContext, ReactNode } from "react";
import { ScreenKey } from "./components/screens/types";

interface ScreenContextType {
  activeTab: ScreenKey;
  setActiveTab: (tab: ScreenKey) => void;
}

interface ScreenProviderProps {
  children: ReactNode;
}

const ScreenContext = createContext<ScreenContextType | undefined>(undefined);

export const ScreenProvider = ({ children }: ScreenProviderProps) => {
  const [activeTab, setActiveTab] = useState<ScreenKey>("home");

  

  return (
    <ScreenContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </ScreenContext.Provider>
  );
};

// 5️⃣ Custom hook for consuming context
export const useScreens = () => {
  const context = useContext(ScreenContext);
  if (!context) {
    throw new Error("useTab must be used inside a TabProvider");
  }
  return context;
};
