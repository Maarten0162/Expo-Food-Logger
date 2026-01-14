import { colors } from "@/app/theme/color";
import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { CaloriesCard } from "../cards/caloriesCard";
import { NutrientsCard } from "../cards/nutrientsCard";
import { GoalsContext, useGoals } from "@/app/GoalsContext";


export const HomeScreen = () => {
    const { calorie_goal, protein_goal, carb_goal, fat_goal } = useGoals();
    return (
        <ScrollView
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}
        >
            <CaloriesCard caloriesLeft={calorie_goal} />
            <NutrientsCard
                proteinleft={protein_goal}
                carbsleft={carb_goal}
                fatleft={fat_goal}
            />
        </ScrollView>

    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        width: "100%",          // make content take full screen width
        alignItems: "flex-start", // allow children to stretch
    },
});
