import { View, Text, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";


export default function ProductDetails() {
    const params = useLocalSearchParams();
 const productString = Array.isArray(params.product)
    ? params.product[0]
    : params.product;

  const product = productString ? JSON.parse(productString) : null;

    if (!product) {
        return <Text>No product data!</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Product: {product.product.brands}</Text>
            <Text>Protein: {product.product.nutriments?.proteins_100g ?? "N/A"} g</Text>
            <Text>Carbs: {product.product.nutriments?.carbohydrates_100g ?? "N/A"} g</Text>
            <Text>Fat: {product.product.nutriments?.fat_100g ?? "N/A"} g</Text>
            <Text>Ingredients: {product.product.ingredients_text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
});
