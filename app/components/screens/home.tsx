import { colors } from "@/app/theme/color";
import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { CaloriesCard } from "../cards/caloriesCard";
import { NutrientsCard } from "../cards/nutrientsCard";
import { GoalsContext, useGoals } from "@/app/GoalsContext";
import { useProgres } from "@/app/ProgressContext";


export const HomeScreen = () => {
    const { calorie_goal, protein_goal, carb_goal, fat_goal } = useGoals();
    const { calories_left, protein_left, fat_left, carbs_left } = useProgres();
    return (
        <ScrollView
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}
        >
            <CaloriesCard caloriesLeft={calories_left} />
            <NutrientsCard
                proteinleft={protein_left}
                carbsleft={carbs_left}
                fatleft={fat_left}
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
