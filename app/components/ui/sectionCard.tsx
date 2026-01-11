import { colors } from "@/app/theme/color";
import { View, Text, StyleSheet } from "react-native";
import { Card } from "./card";

type Props = {
  title: string;
  children: React.ReactNode;
};

export const SectionCard = ({ title, children }: Props) => {
  return (
    <Card>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.content}>{children}</View>
    </Card>
  );
};

const styles = StyleSheet.create({
  title: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    textAlign: "center",
  },
  content: {
    alignItems: "center",
  },
});
