import { Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/app/theme/color";
import { SectionCard } from "../ui/sectionCard";
import { MacroItem } from "./macroItem";

type Props = {
  caloriesLeft: number;
};

export const CaloriesCard = ({ caloriesLeft }: Props) => {
  return (
    <SectionCard title="Calories">
        <MacroItem
            key="protein"
            icon={      <Ionicons name="flash" size={48} color="#6EC6FF" />}
            label=" kcal left"
            amountleft={caloriesLeft} />
    </SectionCard>
  );
};

const styles = StyleSheet.create({
  text: {
    marginTop: 8,
    color: colors.white,
    fontSize: 16,
  },
});
