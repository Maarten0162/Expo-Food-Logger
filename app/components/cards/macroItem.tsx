import { colors } from "@/app/theme/color";
import { StyleSheet, Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

type Props = {
  icon: React.ReactNode;
  label: string;
  amountleft: number;
  progress?: number;
  showSpeedometer?: boolean;
  iconSize?: number;
  speedometerColor?: string;
};

export const MacroItem = ({
  amountleft,
  icon,
  label,
  progress = 50,
  showSpeedometer = false,
  iconSize = 48,
  speedometerColor = "#6EC6FF"
}: Props) => {
  const padding = iconSize * 0.29; // Dynamic padding based on icon size
  const gap = iconSize * 0.1; // Dynamic gap (10% of icon size)
  const radius = iconSize / 2 + padding + gap;
  const strokeWidth = iconSize * 0.17; // Dynamic stroke width (8/48 ≈ 0.17)
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        {showSpeedometer && (
          <Svg
            width={radius * 2 + strokeWidth * 2}
            height={radius * 2 + strokeWidth * 2}
            style={styles.svg}
          >
            <Circle
              cx={radius + strokeWidth}
              cy={radius + strokeWidth}
              r={radius}
              stroke="#333333"
              strokeWidth={strokeWidth}
              fill="none"
            />
            <Circle
              cx={radius + strokeWidth}
              cy={radius + strokeWidth}
              r={radius}
              stroke={speedometerColor}
              strokeWidth={strokeWidth}
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              transform={`rotate(-90 ${radius + strokeWidth} ${radius + strokeWidth})`}
            />
          </Svg>
        )}
        <View style={[styles.iconWrapper, { padding }]}>{icon}</View>
      </View>
      <Text style={styles.label}>{amountleft + label}</Text>
      <Text style={styles.label2}>{"left"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: 100,
  },
  iconContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  svg: {
    position: "absolute",
  },
  iconWrapper: {
    backgroundColor: colors.white,
    borderRadius: 50,
    zIndex: 10,
  },
  label: {
    color: colors.white,
    fontSize: 12,
    textAlign: "center",
    marginTop: 3
  },label2: {
    color: colors.white,
    fontSize: 12,
    textAlign: "center",
  },
});
