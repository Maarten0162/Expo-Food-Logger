import { colors } from "@/app/theme/color";
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { CaloriesCard } from "../cards/caloriesCard";
import { NutrientsCard } from "../cards/nutrientsCard";


export const HomeScreen = () => {
  return (
     <ScrollView contentContainerStyle={styles.container} className="w-auto">
      <CaloriesCard caloriesLeft={1500} />
      <NutrientsCard proteinleft={180} carbsleft={200} fatleft={80}></NutrientsCard>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: colors.white,
    fontSize: 24,
  },
});
