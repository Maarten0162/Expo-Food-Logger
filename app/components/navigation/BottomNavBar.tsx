import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/app/theme/color";
import { NavItem } from "./NavItem";
import { ScreenKey } from "../screens/types";
import { ScanBarcode } from "lucide-react-native";

type Props = {
  activeTab: ScreenKey;
  onTabChange: (tab: ScreenKey) => void;
};


export const BottomNavBar = ({ activeTab, onTabChange }: Props) => {
  return (
    <View style={styles.container}>
      
      <NavItem active={activeTab === "home"} onPress={() => onTabChange("home")}>
        <Ionicons
          name="home"
          size={26}
          color={activeTab === "home" ? colors.accent : colors.inactive}
        />
      </NavItem>

      <NavItem active={activeTab === "log"} onPress={() => onTabChange("log")}>
        <Ionicons
          name="document-text"
          size={26}
          color={activeTab === "log" ? colors.accent : colors.inactive}
        />
      </NavItem>

      {/* Center Button */}
      <View style={styles.centerButtonWrapper}>
        <NavItem onPress={() => onTabChange("add")}>
          <View style={styles.centerButton}>
            <ScanBarcode></ScanBarcode>
             </View>
        </NavItem>
      </View>

      <NavItem active={activeTab === "search"} onPress={() => onTabChange("search")}>
        <Ionicons
          name="search"
          size={26}
          color={activeTab === "search" ? colors.accent : colors.inactive}
        />
      </NavItem>

      <NavItem active={activeTab === "profile"} onPress={() => onTabChange("profile")}>
        <Ionicons
          name="person"
          size={26}
          color={activeTab === "profile" ? colors.accent : colors.inactive}
        />
      </NavItem>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 70,
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: "#444",
  },
  centerButtonWrapper: {
    marginTop: -25,
  },
  centerButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.accent,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
});
