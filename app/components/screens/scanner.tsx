import { BarcodeScanningResult, CameraView, useCameraPermissions } from "expo-camera";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Vibration } from "react-native";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";

interface Nutriments {
  carbohydrates_100g?: number;
  proteins_100g?: number;
  fat_100g?: number;
}

interface ProductData {
  code: string;
  product: {
    brands: string;
    ingredients_text: string;
    nutriments: Nutriments;
  };
}

export const ScannerScreen = () => {
  const router = useRouter(); // ✅ CORRECT PLACE
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

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

    if (productData) {
      router.push({
        pathname: "/components/screens/AddFood",
        params: {
          product: JSON.stringify(productData),
        },
      });
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
