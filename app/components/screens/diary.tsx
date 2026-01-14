import { colors } from "@/app/theme/color";
import { View, Text, StyleSheet } from "react-native";
import DateSelector from "../navigation/DateSelector";
import MealSection from "../cards/mealSelection";
import { useState } from "react";


function onAddFood(){

}

export const DiaryScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  

  return (
    <View style={styles.container}>
      <DateSelector selectedDate={selectedDate} onDateChange={setSelectedDate}></DateSelector>
      <MealSection title={"Breakfast"} foods={[]} totalCalories={0} onAddFood={onAddFood}>

    </MealSection>
    <MealSection title={"Lunch"} foods={[]} totalCalories={0} onAddFood={onAddFood}>

    </MealSection>
    <MealSection title={"Dinner"} foods={[]} totalCalories={0} onAddFood={onAddFood}>

    </MealSection>
    <MealSection title={"Snacks"} foods={[]} totalCalories={0} onAddFood={onAddFood}>

    </MealSection>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: colors.white,
    fontSize: 24,
  },
});
