import { colors } from "@/app/theme/color";
import { TouchableOpacity, StyleSheet } from "react-native";


type Props = {
  children: React.ReactNode;
  active?: boolean;
  onPress: () => void;
};

export const NavItem = ({ children, active, onPress }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        active && styles.activeContainer,
      ]}
    >
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  activeContainer: {
    borderTopWidth: 2,
    borderTopColor: colors.accent,
  },
});
