import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { format, addDays, subDays, isToday, isYesterday, isTomorrow } from "date-fns";
import { colors } from "@/app/theme/color";

interface DateSelectorProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

const DateSelector = ({ selectedDate, onDateChange }: DateSelectorProps) => {
  const getDateLabel = (date: Date) => {
    if (isToday(date)) return "Today";
    if (isYesterday(date)) return "Yesterday";
    if (isTomorrow(date)) return "Tomorrow";
    return format(date, "EEEE, MMM d");
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => onDateChange(subDays(selectedDate, 1))}
        style={styles.button}
      >
        <ChevronLeft width={20} height={20} color="#e5e7eb" />
      </Pressable>

      <View style={styles.center}>
        <Text style={styles.title}>{getDateLabel(selectedDate)}</Text>
        {!isToday(selectedDate) && !isYesterday(selectedDate) && !isTomorrow(selectedDate) && (
          <Text style={styles.subtitle}>{format(selectedDate, "yyyy")}</Text>
        )}
      </View>

      <Pressable
        onPress={() => onDateChange(addDays(selectedDate, 1))}
        style={styles.button}
      >
        <ChevronRight width={20} height={20} color="#e5e7eb" />
      </Pressable>
    </View>
  );
};

export default DateSelector;

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.background,
    borderRadius: 12,
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#374151", // slightly lighter dark for buttons
    alignItems: "center",
    justifyContent: "center",
  },
  center: {
    alignItems: "center",
  },
  title: {
    color: "#f9fafb", // light text
    fontSize: 16,
    fontWeight: "600",
  },
  subtitle: {
    color: "#9ca3af", // muted gray
    fontSize: 12,
  },
});
