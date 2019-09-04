import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";
import MealItem from "../components/MealItem";

const MealList = props => {
  const navigateToMealDetailHandler = (id, title, isFavoriteMeal) => {
    return props.navigation.navigate({
      routeName: "MealDetail",
      params: { mealId: id, mealTitle: title, isFavoriteMeal }
    });
  };

  const favoriteMeals = useSelector(state => state.meals.favoriteMeals);

  const renderMealItem = itemData => {
    const isFavoriteMeal = favoriteMeals.some(
      meal => meal.id === itemData.item.id
    );

    return (
      <MealItem
        title={itemData.item.title}
        duration={itemData.item.duration}
        complexity={itemData.item.complexity}
        affordability={itemData.item.affordability}
        imageUrl={itemData.item.imageUrl}
        onMealSelect={() =>
          navigateToMealDetailHandler(
            itemData.item.id,
            itemData.item.title,
            isFavoriteMeal
          )
        }
      />
    );
  };
  return (
    <View style={styles.list}>
      <FlatList
        keyExtractor={(item, index) => item.id}
        data={props.listData}
        renderItem={renderMealItem}
        style={{ width: "100%", marginHorizontal: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15
  }
});

export default MealList;
