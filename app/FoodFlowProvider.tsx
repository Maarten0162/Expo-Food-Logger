// FoodFlowProvider.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import { FoodItem } from "@/app/FoodContext";

interface FoodFlowContextType {
  foodItem: FoodItem | null;
  setFoodItem: (item: FoodItem | null) => void;
}

const FoodFlowContext = createContext<FoodFlowContextType | undefined>(undefined);

export const FoodFlowProvider = ({ children }: { children: ReactNode }) => {
  const [foodItem, setFoodItem] = useState<FoodItem | null>(null);

  return (
    <FoodFlowContext.Provider value={{ foodItem, setFoodItem }}>
      {children}
    </FoodFlowContext.Provider>
  );
};

export const useFoodFlow = () => {
  const context = useContext(FoodFlowContext);
  if (!context) throw new Error("useFoodFlow must be used inside FoodFlowProvider");
  return context;
};
