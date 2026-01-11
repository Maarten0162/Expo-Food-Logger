import { colors } from "@/app/theme/color";
import { View, Text, StyleSheet } from "react-native";

type Props = {
  icon: React.ReactNode;
  label: string;
  amountleft: number;
};

export const MacroItem = ({amountleft, icon, label }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>{icon}</View>
      <Text style={styles.label}>{amountleft + label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: 100,
  },
  iconWrapper: {
    backgroundColor: colors.white,
    borderRadius: 50,
    padding: 14,
    marginBottom: 6,
  },
  label: {
    color: colors.white,
    fontSize: 12,
    textAlign: "center",
  },
});
