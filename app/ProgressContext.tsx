// app/ProgresContext.tsx
import React, { createContext, useState, useEffect, ReactNode, useContext } from "react";
import axios from "axios";

export interface Progres {
  total_calories: number;
  total_protein: number;
  total_carbs: number;
  total_fat: number;
  calories_left: number;
  protein_left: number;
  carbs_left: number;
  fat_left: number;
}

interface ProgresContextType extends Progres {
  refetch: () => Promise<void>;
}

interface ProgresProviderProps {
  children: ReactNode;
}

// Default values
export const ProgresContext = createContext<ProgresContextType | undefined>(undefined);

export const ProgresProvider = ({ children }: ProgresProviderProps) => {
  const [progres, setProgres] = useState<Progres>({
    total_calories: 0,
    total_protein: 0,
    total_carbs: 0,
    total_fat: 0,
    calories_left: 0,
    protein_left: 0,
    carbs_left: 0,
    fat_left: 0,
  });

  const fetchProgress = async () => {
    try {
      const response = await axios.get<Progres>(
        "https://food-logger-backend-one.vercel.app/api/user-progress"
      );

      // Convert strings to numbers
      const data = response.data;
      setProgres({
        total_calories: Number(data.total_calories),
        total_protein: Number(data.total_protein),
        total_carbs: Number(data.total_carbs),
        total_fat: Number(data.total_fat),
        calories_left: Number(data.calories_left),
        protein_left: Number(data.protein_left),
        carbs_left: Number(data.carbs_left),
        fat_left: Number(data.fat_left),
      });
    } catch (err) {
      console.error("Failed to fetch progress:", err);
    }
  };

  useEffect(() => {
    fetchProgress();
  }, []);

  return (
    <ProgresContext.Provider value={{ ...progres, refetch: fetchProgress }}>
      {children}
    </ProgresContext.Provider>
  );
};

export function useProgres() {
    const context = useContext(ProgresContext);
    if (context === undefined) {
        throw new Error("progresscontext Undefined");
    }
    return context;
}