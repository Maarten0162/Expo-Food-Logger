import axios from "axios";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View, StyleSheet } from "react-native";

import { colors } from "./theme/color";
import { BottomNavBar } from "./components/navigation/BottomNavBar";
import { ScreenKey } from "./components/screens/types";
import { ScreenRenderer } from "./components/screens/ScreenRenderer";

export default function Index() {
  const router = useRouter(); 
  const [activeTab, setActiveTab] = useState<ScreenKey>("home");

  const [food, setFood] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ Fetch food once when the component mounts
const [goals, setGoals] = useState<any[]>([]);
    
     useEffect(() => {
    // This runs only once when the component mounts
    const fetchGoals = async () => {
      try {
        const response = await axios.get(
          "https://food-logger-backend-one.vercel.app/api/user-goals"
        );
        setGoals(response.data);
      } catch (error) {
        console.error("Failed to fetch goals:", error);
      }
    };

    fetchGoals();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
  
        <ScreenRenderer activeTab={activeTab} />
      </View>

      <BottomNavBar activeTab={activeTab} onTabChange={setActiveTab} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: 20,
  },
});
