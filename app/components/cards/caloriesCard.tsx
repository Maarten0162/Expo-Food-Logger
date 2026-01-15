import { Text, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/app/theme/color";
import { SectionCard } from "../ui/sectionCard";
import { MacroItem } from "./macroItem";

type Props = {
  caloriesLeft: number;
};

export const CaloriesCard = ({ caloriesLeft }: Props) => {
  return (
    <SectionCard title="Calories" style={styles.card}>
      <MacroItem
        showSpeedometer={true}
        key="calories"
        icon={<Ionicons name="flash" size={48} color="#6EC6FF" />}
        label=" kcal"
        amountleft={caloriesLeft}
      />
    </SectionCard>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",      // make SectionCard take full width of parent
    marginBottom: 16,   // optional spacing between cards
  },
  text: {
    marginTop: 8,
    color: colors.white,
    fontSize: 16,
  },
});
