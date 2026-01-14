// app/components/screens/FoodDetailScreen.tsx
import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable, ScrollView } from "react-native";
import { Droplet, EggFried, Wheat, Zap } from "lucide-react-native";
import { FoodItem, MealType, useFood } from "@/app/FoodContext";
import { useFoodFlow } from "@/app/FoodFlowProvider";
import { colors } from "@/app/theme/color";
import axios from "axios";


async function logfood({ foodItem, amount, mealType, date }: { foodItem: FoodItem, amount: number, mealType: MealType, date: Date }) {
  try {
    const response = await axios.post(`https://food-logger-backend-one.vercel.app/api/log-food`, {
      food: {
        name: foodItem.name,
        energy_kcal: foodItem.calories,
        protein_g: foodItem.protein,
        fat_g: foodItem.fat,
        carbs_g: foodItem.carbs,
      },
      amount,
      mealType,
      date, // optional, defaults to today on backend
    });

    console.log("Food logged successfully:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error logging food:", error.response?.data ?? error.message);
    return null;
  }
}

export const FoodDetailScreen = () => {
  const { foodItem } = useFoodFlow();

  if (!foodItem) {
    return <Text style={styles.notFoundText}>Food not found!</Text>;
  }

  const [amount, setAmount] = useState("100"); // default amount in grams
  const [mealType, setMealType] = useState<MealType>("Breakfast");

  const calories = Number(foodItem.calories) * (Number(amount) / 100);
  const protein = Number(foodItem.protein) * (Number(amount) / 100);
  const carbs = Number(foodItem.carbs) * (Number(amount) / 100);
  const fat = Number(foodItem.fat) * (Number(amount) / 100);

  const handleLogFood = () => {
    alert(`${foodItem.name} logged for ${mealType}`);
    logfood({
      foodItem,
      amount: Number(amount),
      mealType,
      date: new Date(), // call the constructor
    });

  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{foodItem.name}</Text>

      {/* Amount input card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Amount (grams)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
      </View>

      {/* Nutrients card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Nutrients (for selected amount)</Text>
        <View style={styles.nutrientsGrid}>
          <View style={styles.macro}>
            <Zap color="#6EC6FF" />
            <Text style={styles.macroText}>{calories.toFixed(0)} kcal</Text>
          </View>
          <View style={styles.macro}>
            <EggFried color="#D96262" />
            <Text style={styles.macroText}>{protein.toFixed(1)} g Protein</Text>
          </View>
          <View style={styles.macro}>
            <Wheat color="#7CD962" />
            <Text style={styles.macroText}>{carbs.toFixed(1)} g Carbs</Text>
          </View>
          <View style={styles.macro}>
            <Droplet color="#D9C962" />
            <Text style={styles.macroText}>{fat.toFixed(1)} g Fat</Text>
          </View>
        </View>
      </View>


      {/* Meal Type card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Meal Type</Text>
        <View style={styles.mealTypeContainer}>
          {["Breakfast", "Lunch", "Dinner", "Snacks"].map((type) => (
            <Pressable
              key={type}
              onPress={() => setMealType(type as MealType)}
              style={[
                styles.mealButton,
                mealType === type && { backgroundColor: colors.accent },
              ]}
            >
              <Text
                style={[
                  styles.mealText,
                  mealType === type && { color: colors.background },
                ]}
              >
                {type}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Log button */}
      <Pressable style={styles.logButton} onPress={handleLogFood}>
        <Text style={styles.logButtonText}>Log Food</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    width: "100%",
    backgroundColor: colors.background,
  },
  notFoundText: {
    color: "#f9fafb",
    fontSize: 18,
    textAlign: "center",
    marginTop: 40,
  },
  title: {
    marginTop: 12,
    fontSize: 22,
    fontWeight: "600",
    color: "#f9fafb",
    marginBottom: 16,
    textAlign: "center",
  },
  card: {
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  cardTitle: {
    color: "#f9fafb",
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 12,
  },
  input: {
    backgroundColor: "#4CAF50", // subtle green-gray
    color: "#f9fafb",
    padding: 12,
    borderRadius: 12,
    fontSize: 16,
    textAlign: "center",
  },
  macroContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginTop: 8,
  },
  macro: {
    width: "48%", // 2 items per row
    alignItems: "center",
    marginVertical: 8,
  },
  macroText: {
    marginTop: 6,
    color: "#f9fafb",
    fontWeight: "500",
    fontSize: 14,
    textAlign: "center",
  },
  mealTypeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "center",
    marginTop: 8,
  },
  mealButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.accent,
    marginBottom: 6,
  },
  mealText: {
    color: "#7CD962",
    fontWeight: "600",
  },
  logButton: {
    marginTop: 20,
    backgroundColor: colors.accent,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
  },
  logButtonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: "600",
  },
  nutrientsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 8,
  },

});
