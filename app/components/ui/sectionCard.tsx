import { colors } from "@/app/theme/color";
import { View, Text, StyleSheet, ViewStyle } from "react-native";
import { Card } from "./card";

type Props = {
  title: string;
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[]; // allow external styling
};

export const SectionCard = ({ title, children, style }: Props) => {
  return (
    <Card style={[styles.card, { width: "100%", alignItems: "center" }]} >
      <Text style={styles.title}>{title}</Text>
      <View style={styles.content}>{children}</View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",          // allow full width of parent
    marginBottom: 8,       // spacing between cards
    padding: 18,            // optional padding inside card
  },
  title: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    textAlign: "left",      // left-align title for better UX
  },
  content: {
    alignItems: "flex-start", // children stretch to full width
  },
});
