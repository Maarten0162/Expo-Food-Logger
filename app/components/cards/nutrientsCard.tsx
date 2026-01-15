import { useGoals } from "@/app/GoalsContext";
import { Droplet, EggFried, Wheat } from 'lucide-react-native';
import { StyleSheet, View } from "react-native";
import { SectionCard } from "../ui/sectionCard";
import { MacroItem } from "./macroItem";
import { colors } from "@/app/theme/color";

type Props = {
    proteinleft: number;
    carbsleft: number;
    fatleft: number;
};

export const NutrientsCard = ({ proteinleft, carbsleft, fatleft }: Props) => {
    const { protein_goal, carb_goal, fat_goal } = useGoals();
    
    const proteinProgress = ((protein_goal - proteinleft) / protein_goal) * 100;
    const carbsProgress = ((carb_goal - carbsleft) / carb_goal) * 100;
    const fatProgress = ((fat_goal - fatleft) / fat_goal) * 100;

    return (
        <SectionCard title="Nutrients">
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                <MacroItem
                    showSpeedometer={true}
                    speedometerColor="#D96262"
                    progress={proteinProgress}
                    iconSize={32}
                    key="protein"
                    icon={<EggFried size={32} color="#D96262" />}
                    label="g Protein"
                    amountleft={proteinleft} />
                <MacroItem
                    showSpeedometer={true}
                    speedometerColor="#7CD962"
                    progress={carbsProgress}
                    iconSize={32}
                    key="carbs"
                    icon={<Wheat size={32} color="#7CD962" />}
                    label="g Carbs"
                    amountleft={carbsleft} />
                <MacroItem
                    showSpeedometer={true}
                    speedometerColor="#D9C962"
                    progress={fatProgress}
                    iconSize={32}
                    key="fat"
                    icon={<Droplet size={32} color="#D9C962" />}
                    label="g Fat"
                    amountleft={fatleft} />
            </View>
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
