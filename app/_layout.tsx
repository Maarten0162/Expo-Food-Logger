// app/_layout.tsx
import React from "react";
import { Stack } from "expo-router";
import { GoalsProvider } from "./GoalsContext"; // make sure the path is correct
import { ProgresProvider } from "./ProgressContext";
import { FoodProvider } from "./FoodContext";
import { ScreenProvider } from "./ScreenContext"

export default function RootLayout() {
  return (
    <ScreenProvider>
      <GoalsProvider>
        <ProgresProvider>
          <FoodProvider>
            <Stack
              screenOptions={{
                headerShown: false, // hides the default header
              }}
            />
          </FoodProvider>
        </ProgresProvider>
      </GoalsProvider>
    </ScreenProvider>
  );
}
