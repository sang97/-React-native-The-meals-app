import React from "react";
import { FlatList, StyleSheet } from "react-native";

import { CATEGORIES } from "../data/dummy-data";
import CategoryGrid from "../components/CategoryGrid";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButton";

const CategoryScreen = props => {
  const navigationToCategoryMealHandle = id => {
    return props.navigation.navigate({
      routeName: "CategoryMeal",
      params: { categoryId: id }
    });
  };

  const renderGridItem = itemData => {
    return (
      <CategoryGrid
        title={itemData.item.title}
        color={itemData.item.color}
        onGridSelect={() => navigationToCategoryMealHandle(itemData.item.id)}
      />
    );
  };

  return (
    <FlatList
      keyExtractor={(item, index) => item.id}
      data={CATEGORIES}
      renderItem={renderGridItem}
      numColumns={2}
    />
  );
};

CategoryScreen.navigationOptions = navData => {
  return {
    headerTitle: "Meal Categories",
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => navData.navigation.toggleDrawer()}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({});

export default CategoryScreen;
