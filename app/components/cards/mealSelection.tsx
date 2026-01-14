import { View, Text, Pressable, StyleSheet } from "react-native";
import { Plus, Coffee, Sun, Moon, Cookie } from "lucide-react-native";
import { colors } from "@/app/theme/color";
import { FoodItem, MealType } from "@/app/FoodContext";


interface MealSectionProps {
  title: MealType;
  foods: FoodItem[];
  totalCalories: number;
  onAddFood: () => void;
}

const mealIcons = {
  Breakfast: Coffee,
  Lunch: Sun,
  Dinner: Moon,
  Snacks: Cookie,
};

const MealSection = ({
  title,
  foods,
  totalCalories,
  onAddFood,
}: MealSectionProps) => {
  const Icon = mealIcons[title];

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.iconWrapper}>
            <Icon width={20} height={20} color="#9ca3af" />
          </View>

          <View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{totalCalories} kcal</Text>
          </View>
        </View>

        <Pressable style={styles.addButton} onPress={onAddFood}>
          <Plus width={20} height={20} color={colors.background} />
        </Pressable>
      </View>

      {/* Food items */}
      {foods.length > 0 ? (
        <View>
          {foods.map((food, index) => (
            <View
              key={food.id}
              style={[
                styles.foodRow,
                index !== foods.length - 1 && styles.divider,
              ]}
            >
              <View style={styles.foodLeft}>
                <Text style={styles.foodName}>{food.name}</Text>
                <Text style={styles.foodAmount}>{food.amount}</Text>
              </View>

              <View style={styles.foodRight}>
                <Text style={styles.foodCalories}>
                  {food.calories} kcal
                </Text>
                <Text style={styles.foodMacros}>
                  P: {food.protein}g · C: {food.carbs}g · F: {food.fat}g
                </Text>
              </View>
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No foods logged yet</Text>
        </View>
      )}
    </View>
  );
};

export default MealSection;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    overflow: "hidden",
    width: "100%",
    marginBottom: 8
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#374151",
  },

  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#374151",
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 16,
  },

  subtitle: {
    color: "#9ca3af",
    fontSize: 12,
  },

  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#6EFF4E",
    alignItems: "center",
    justifyContent: "center",
  },

  foodRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },

  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#374151",
  },

  foodLeft: {
    flex: 1,
    paddingRight: 8,
  },

  foodName: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "500",
  },

  foodAmount: {
    color: "#9ca3af",
    fontSize: 12,
  },

  foodRight: {
    alignItems: "flex-end",
  },

  foodCalories: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "500",
  },

  foodMacros: {
    color: "#9ca3af",
    fontSize: 12,
  },

  emptyState: {
    padding: 24,
    alignItems: "center",
  },

  emptyText: {
    color: "#9ca3af",
    fontSize: 14,
  },
});
