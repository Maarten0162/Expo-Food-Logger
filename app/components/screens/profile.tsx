import { colors } from "@/app/theme/color";
import { View, Text, StyleSheet } from "react-native";


export const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>To be implemented</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: colors.white,
    fontSize: 24,
  },
});
