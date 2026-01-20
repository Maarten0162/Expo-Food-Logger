import { StyleSheet, View } from "react-native";
import { colors } from "@/app/theme/color";
import { SectionCard } from "../ui/sectionCard";
import { MacroItem } from "./macroItem";
import { Droplet, EggFried, Wheat } from 'lucide-react-native';


type Props = {
    proteinleft: number;
    carbsleft: number;
    fatleft: number;
};


export const NutrientsCard = ({ proteinleft, carbsleft, fatleft }: Props) => {
    return (
        <SectionCard title="Nutrients">
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                <MacroItem
                    key="protein"
                    icon={<EggFried color="#D96262" />}
                    label="g Protein left"
                    amountleft={proteinleft} />
                <MacroItem
                    key="carbs"
                    icon={<Wheat color="#7CD962" />}
                    label="g Carbs left"
                    amountleft={carbsleft} />
                <MacroItem
                    key="fat"
                    icon={<Droplet color="#D9C962" />}
                    label="g Fat left"
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
