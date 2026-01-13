// app/_layout.tsx
import React from "react";
import { Stack } from "expo-router";
import { GoalsProvider } from "./GoalsContext"; // make sure the path is correct
import { ProgresProvider } from "./ProgressContext";

export default function RootLayout() {
  return (
    <GoalsProvider>
      {/* <ProgresProvider> */}
        <Stack
          screenOptions={{
            headerShown: false, // hides the default header
          }}
        />
      {/* </ProgresProvider> */}
    </GoalsProvider>
  );
}
