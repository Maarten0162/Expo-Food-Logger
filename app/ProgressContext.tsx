// app/ProgresContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

export interface Progres {
  calorie_progress: number;
  protein_progress: number;
  carb_progress: number;
  fat_progress: number;
}

interface ProgresContextType extends Progres {}

interface ProgresProviderProps {
  children: ReactNode;
}

// Default values
export const ProgresContext = createContext<ProgresContextType | undefined>(undefined);

export const ProgresProvider = ({ children }: ProgresProviderProps) => {
  const [progres, setProgres] = useState<Progres>({
    calorie_progress: 0,
    protein_progress: 0,
    carb_progress: 0,
    fat_progress: 0,
  });

  useEffect(() => {
    axios
      .get<Progres[]>("https://food-logger-backend-one.vercel.app/api/user-progress")
      .then((response) => {
        if (response.data.length > 0) {
          setProgres(response.data[0]); // take the first item
        }
      })
      .catch((error) => {
        console.error("Failed to fetch progress:", error);
      });
  }, []);

  return <ProgresContext.Provider value={progres}>{children}</ProgresContext.Provider>;
};
