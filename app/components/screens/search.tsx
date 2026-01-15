import { colors } from "@/app/theme/color";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Pressable,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { FoodItem } from "@/app/FoodContext";
import { useFoodFlow } from "@/app/FoodFlowProvider";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { useScreens } from "@/app/ScreenContext";

interface OFFSearchProduct {
  code: string;
  product_name?: string;
  brands?: string;
  nutriments?: {
    "energy-kcal_100g"?: number;
    proteins_100g?: number;
    fat_100g?: number;
    carbohydrates_100g?: number;
  };
}


export const SearchScreen = () => {
    const [query, setQuery] = useState("");
  const [results, setResults] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(false);

  const { setFoodItem } = useFoodFlow();
  const {activeTab, setActiveTab} = useScreens()
  
  const router = useRouter();

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(() => {
      searchFood(query);
    }, 400);

    return () => clearTimeout(timeout);
  }, [query]);

  const searchFood = async (text: string) => {
    try {
      setLoading(true);
      console.log("Searching for:", text);


      const res = await axios.get(
  "https://world.openfoodfacts.org/cgi/search.pl",
  {
    params: {
      search_terms: text,
      search_simple: 1,
      action: "process",
      json: 1,
      page_size: 20,
    },
  }
);




      const mapped = (res.data.products ?? []).map(mapOFFToFoodItem);
      setResults(mapped);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectFood = (food: FoodItem) => {
    setFoodItem(food);
    setActiveTab("detail")
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Food</Text>

      <TextInput
        style={styles.input}
        placeholder="Search for food..."
        placeholderTextColor="#9ca3af"
        value={query}
        onChangeText={setQuery}
      />

      {loading && <ActivityIndicator style={{ marginTop: 12 }} />}

      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ gap: 12, paddingTop: 16 }}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() => handleSelectFood(item)}
          >
            <Text style={styles.foodName}>{item.name}</Text>
            <View style={styles.macros}>
              <Text style={styles.macro}>{item.calories} kcal</Text>
              <Text style={styles.macro}>{item.protein}g P</Text>
              <Text style={styles.macro}>{item.carbs}g C</Text>
              <Text style={styles.macro}>{item.fat}g F</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
};

function mapOFFToFoodItem(product: OFFSearchProduct): FoodItem {
  return {
  id: product.code,
  name: product.product_name ?? "Unknown",
  calories: Math.round(product.nutriments?.["energy-kcal_100g"] ?? 0),
  protein: Number(product.nutriments?.proteins_100g ?? 0),
  fat: Number(product.nutriments?.fat_100g ?? 0),
  carbs: Number(product.nutriments?.carbohydrates_100g ?? 0),
  amount: "100",
  date: new Date().toDateString(),
  mealtype: "Breakfast"
};
}

/* ---------------- Styles ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: "#f9fafb",
    marginBottom: 12,
    textAlign: "center",
  },
  input: {
    backgroundColor: colors.card, // greenish dark gray
    borderRadius: 14,
    padding: 14,
    fontSize: 16,
    color: "#f9fafb",
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "#1f2937",
  },
  foodName: {
    color: "#f9fafb",
    fontSize: 16,
    fontWeight: "600",
  },
  brand: {
    color: "#9ca3af",
    fontSize: 13,
    marginTop: 2,
  },
  macros: {
    flexDirection: "row",
    gap: 10,
    marginTop: 8,
    flexWrap: "wrap",
  },
  macro: {
    color: "#16a34a", // green accent
    fontSize: 13,
    fontWeight: "500",
  },
});
