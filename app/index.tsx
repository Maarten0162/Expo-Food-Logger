import axios from "axios";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Button, Image, Text, View } from "react-native";

import { StyleSheet } from "react-native";
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://food-logger-backend-one.vercel.app/api/food"
        );
        setFood(response.data);
      } catch (err: any) {
        console.error("Error fetching food:", err.message);
        setError(err.response?.data?.error || err.message);
      } finally {
        setLoading(false);
      }
    };

    //getfood();
    //fetchData();
  }, []);

  return (
    // <View
    //   style={{
    //     flex: 1,
    //     justifyContent: "center",
    //     alignItems: "center",
    //     padding: 20,
    //     gap: 20,
    //   }}
    // >
    //   {/* ⬇️ Navigation button */}
    //   <Button title="Go to scanner" onPress={() => router.push("/scanner")} />

    //   {loading ? (
    //     <ActivityIndicator size="large" color="#0000ff" />
    //   ) : error ? (
    //     <Text style={{ color: "red", textAlign: "center" }}>
    //       ⚠️ Error: {error}
    //     </Text>
    //   ) : (
    //     <>
    //       <Text style={{ fontSize: 18, marginBottom: 10 }}>Food data:</Text>
    //       {food.length === 0 ? (
    //         <Text>No food items found.</Text>
    //       ) : (
    //         food.map((item) => (
    //           <Text key={item.id}>
    //             🍎 {item.foodname} - {item.calories} kcal
    //           </Text>
    //         ))
    //       )}
    //     </>
    //   )}

    //   <Image
    //     source={require("../assets/images/icon.png")}
    //     style={{ width: 200, height: 200, marginTop: 20 }}
    //   />
    // </View>
    <View style={styles.container}>
      <View style={styles.content}>
        <ScreenRenderer activeTab={activeTab} />
      </View>

      <BottomNavBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
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
  },
});

async function getfood() {
  const response = await fetch(
    "https://food-logger-backend-one.vercel.app/api/food"
  );
  const data = await response.json();
  console.log(data);
}

