import { useFood } from "@/app/FoodContext";
import { useProgres } from "@/app/ProgressContext";
import React, { useState } from "react";
import { RefreshControl, ScrollView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CaloriesCard } from "../cards/caloriesCard";
import { NutrientsCard } from "../cards/nutrientsCard";

export const HomeScreen = () => {
    const { calories_left, protein_left, fat_left, carbs_left, refetch } = useProgres();
    const {refetchDiary} = useFood();
    const [refreshing, setRefreshing] = useState(false);
    const insets = useSafeAreaInsets();

    const onRefresh = async () => {
        setRefreshing(true);
        await refetch();
        await refetchDiary();
        setRefreshing(false);
    };

    return (
        <ScrollView
            contentContainerStyle={[styles.container, { paddingBottom: insets.bottom + 80 }]}
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
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
        width: "100%",
        alignItems: "flex-start",
    },
});
