// app/GoalsContext.tsx
import React, { createContext, useState, useEffect, ReactNode, useContext } from "react";
import axios from "axios";

export interface Goal {
  calorie_goal: number;
  protein_goal: number;
  carb_goal: number;
  fat_goal: number;
}

interface GoalsContextType extends Goal {}

interface GoalsProviderProps {
  children: ReactNode;
}

// Default values
export const GoalsContext = createContext<GoalsContextType| undefined>(undefined);

export const GoalsProvider = ({ children }: GoalsProviderProps ) => {
  const [goals, setGoals] = useState<Goal>({
    calorie_goal: 0,
    protein_goal: 0,
    carb_goal: 0,
    fat_goal: 0,
  });

  useEffect(() => {
    axios
      .get<Goal[]>("https://food-logger-backend-one.vercel.app/api/user-goals")
      .then((response) => {
        if (response.data.length > 0) {
          setGoals(response.data[0]); // take the first goal
        }
      })
      .catch((error) => {
        console.error("Failed to fetch goals:", error);
      });
  }, []);

  return <GoalsContext.Provider value={goals}>{children}</GoalsContext.Provider>;
};

export function useGoals() {
    const context = useContext(GoalsContext);
    if (context === undefined) {
        throw new Error(" Undifined");
         
    }
    return context;
}