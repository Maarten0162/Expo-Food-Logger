import { colors } from "@/app/theme/color";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import DateSelector from "../navigation/DateSelector";
import MealSection from "../cards/mealSelection";
import { useState } from "react";
import { FoodItem, useFood } from "@/app/FoodContext";
import { useScreens } from "@/app/ScreenContext";






export const DiaryScreen = () => {
  const { foodItems, addFood, getFoodByDate } = useFood();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [foodList, setFoodList] = useState(getFoodByDate(selectedDate));
  const {setActiveTab} = useScreens();
 

  function onChangeDate(date : Date) {
    setSelectedDate(date);
    const newfood = getFoodByDate(date);
    setFoodList(newfood)

  }
  function onAddFood() {

  setActiveTab("search")
}

  function totalCalories(foodList: FoodItem[]): number {
  return foodList.reduce((total, food) => {
    return total + (Number(food.calories) * Number(food.amount) / 100);
  }, 0);
}


  return (
    <View style={styles.container}>
      <DateSelector selectedDate={selectedDate} onDateChange={onChangeDate}></DateSelector>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
        <MealSection title={"Breakfast"} foods={foodList.Breakfast} totalCalories={totalCalories(foodList.Breakfast)} onAddFood={onAddFood}>

      </MealSection>
      <MealSection title={"Lunch"} foods={foodList.Lunch} totalCalories={totalCalories(foodList.Lunch)} onAddFood={onAddFood}>

      </MealSection>
      <MealSection title={"Dinner"} foods={foodList.Dinner} totalCalories={totalCalories(foodList.Dinner)} onAddFood={onAddFood}>

      </MealSection>
      <MealSection title={"Snacks"} foods={foodList.Snacks} totalCalories={totalCalories(foodList.Snacks)} onAddFood={onAddFood}>

      </MealSection>
      </ScrollView>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  text: {
    color: colors.white,
    fontSize: 24,
  },
});
