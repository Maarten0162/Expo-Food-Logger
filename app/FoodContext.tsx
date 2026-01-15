// app/FoodContext.tsx
import axios from "axios";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

export type MealType = "Breakfast" | "Lunch" | "Dinner" | "Snacks";

export interface FoodItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  amount: string;
  date: string;
  mealtype: MealType;
}

interface FoodContextType {
  foodItems: FoodItem[];
  addFood: (food: FoodItem) => void;
  getFoodByDate: (date: Date) => FoodByMeal;
  refetchDiary: () => Promise<void>;
}

interface FoodByMeal {
  Breakfast: FoodItem[];
  Lunch: FoodItem[];
  Dinner: FoodItem[];
  Snacks: FoodItem[];
}

interface FoodProviderProps {
  children: ReactNode;
}

export const FoodItemsContext = createContext<FoodContextType | undefined>(
  undefined
);

export const FoodProvider = ({ children }: FoodProviderProps) => {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);

  const fetchFoodItems = async () => {
    try {
      const response = await axios.get<FoodItem[]>(
        "https://food-logger-backend-one.vercel.app/api/user-foods"
      );
      setFoodItems(response.data);
    } catch (error) {
      console.error("Failed to fetch food items:", error);
    }
  };

  useEffect(() => {
    fetchFoodItems();
  }, []);

  const addFood = (food: FoodItem) => {
    setFoodItems((prev) => [...prev, food]);
  };

  const getFoodByDate = (date: Date): FoodByMeal => {
    const selectedDate = date.toISOString().split("T")[0];

    const result: FoodByMeal = {
      Breakfast: [],
      Lunch: [],
      Dinner: [],
      Snacks: [],
    };

    foodItems.forEach((f) => {
      const foodDate = new Date(f.date).toISOString().split("T")[0];

      if (foodDate === selectedDate) {
        result[f.mealtype].push(f);
      }
    });

    return result;
  };

  return (
    <FoodItemsContext.Provider value={{ foodItems, addFood, getFoodByDate, refetchDiary: fetchFoodItems }}>
      {children}
    </FoodItemsContext.Provider>
  );
};

export function useFood() {
  const context = useContext(FoodItemsContext);
  if (!context) {
    throw new Error("useFood must be used inside FoodProvider");
  }
  return context;
}
