import { BarcodeScanningResult, CameraView, useCameraPermissions } from "expo-camera";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Vibration } from "react-native";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { FoodItem } from "@/app/FoodContext";
import { useScreens } from "@/app/ScreenContext";
import { useFoodFlow } from "@/app/FoodFlowProvider";

interface Nutriments {
  carbohydrates_100g?: number;
  proteins_100g?: number;
  fat_100g?: number;
  "energy-kcal_100g"?: number;
  sugars_100g?: number;
  salt_100g?: number;
  saturated_fat_100g?: number;
}

export interface ProductData {
  code: string;
  product: {
    id: string;
    product_name: string;
    brands?: string;
    ingredients_text?: string;
    nutriments: Nutriments;
    categories_tags?: string[];
    serving_size?: string;
  };
}


export const ScannerScreen = () => {
  const router = useRouter(); // ✅ CORRECT PLACE
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  const {activeTab, setActiveTab} = useScreens();
  const {setFoodItem} = useFoodFlow();

  useEffect(() => {
    if (permission && !permission.granted) {
      requestPermission();
    }
  }, [permission]);

  if (!permission) {
    return <Text>Checking camera permission...</Text>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text>Camera permission is required</Text>
        <TouchableOpacity onPress={requestPermission}>
          <Text style={{ color: "blue" }}>Grant permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const fetchProduct = async (barcode: string): Promise<ProductData | null> => {
    try {
      const response = await fetch(
        `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
      );
      return await response.json();
    } catch {
      return null;
    }
  };

  const handleScan = async (result: BarcodeScanningResult) => {
    if (scanned) return;
    setScanned(true);

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    Vibration.vibrate(200);

    const productData = await fetchProduct(result.data);
    const product = productData!.product;


    

    if (productData) {
      const fooditem : FoodItem = {
        id: productData!.code,
        name: product.product_name || "Unknown Product",
        calories: product.nutriments?.["energy-kcal_100g"] ?? 0,
        protein: product.nutriments?.proteins_100g ?? 0,
        carbs: product.nutriments?.carbohydrates_100g ?? 0,
        fat: product.nutriments?.fat_100g ?? 0,
        amount: "100",
        date: new Date().toISOString(),
        mealtype: "Breakfast", // default, user can change later
      };
      setFoodItem(fooditem);
      setActiveTab("detail"); // move to detail screen
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <CameraView
        style={StyleSheet.absoluteFill}
        onBarcodeScanned={handleScan}
        barcodeScannerSettings={{
          barcodeTypes: ["ean13", "ean8", "upc_a", "upc_e"],
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
