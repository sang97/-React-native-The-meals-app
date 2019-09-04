import React from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator,
  createDrawerNavigator
} from "react-navigation";

import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

import CategoryScreen from "../screens/CategoryScreen";
import CategoryMealScreen from "../screens/CategoryMealScreen";
import MealDetailScreen from "../screens/MealDetailScreen";
import FavoriteScreen from "../screens/FavoriteScreen";
import FilterScreen from "../screens/FilterScreen";

import { Platform } from "react-native";
import Colors from "../constants/Colors";

const defaultStackNavigationOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primaryColor : ""
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold"
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans"
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primaryColor,
  headerTitle: "A Screen"
};

const MealNavigator = createStackNavigator(
  {
    Category: {
      screen: CategoryScreen
    },
    CategoryMeal: {
      screen: CategoryMealScreen
    },
    MealDetail: {
      screen: MealDetailScreen
    }
  },
  {
    // mode: "model",
    defaultNavigationOptions: defaultStackNavigationOptions
  }
);

const FavoriteNavigator = createStackNavigator(
  {
    FavoriteMeal: {
      screen: FavoriteScreen,
      navigationOptions: {
        headerTitle: "Your Favorites"
      }
    },
    mealDetail: {
      screen: MealDetailScreen
    }
  },
  {
    defaultNavigationOptions: defaultStackNavigationOptions
  }
);

const tabConfig = {
  Meals: {
    screen: MealNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return (
          <Ionicons
            name="ios-restaurant"
            size={28}
            color={tabInfo.tintColor}
          />
        );
      },
      tabBarColor: Colors.primaryColor
    }
  },
  Favorites: {
    screen: FavoriteNavigator,
    navigationOptions: {
      tabBarLabel: "Favorite Recipes",
      tabBarIcon: tabInfo => {
        return (
          <Ionicons name="ios-star" size={28} color={tabInfo.tintColor} />
        );
      },
      tabBarColor: Colors.accent
    }
  }
};

const MealFavoriteTabNavigator =
  Platform.OS == "android"
    ? createMaterialBottomTabNavigator(tabConfig, {
        activeTintColor: "white",
        shifting: true
      })
    : createBottomTabNavigator(tabConfig, {
        tabBarOptions: {
          labelStyle: {
            fontFamily: "open-sans-bold"
          },
          activeTintColor: Colors.primaryColor
        }
      });

const FilterNavigator = createStackNavigator(
  {
    Filter: FilterScreen
  },
  {
    navigationOptions: {
      drawerLabel: "Filters"
    },
    defaultNavigationOptions: defaultStackNavigationOptions
  }
);

const MainNavigator = createDrawerNavigator(
  {
    MealFavorite: {
      screen: MealFavoriteTabNavigator,
      navigationOptions: {
        drawerLabel: "Meals"
      }
    },
    Filter: FilterNavigator
  },
  {
    contentOptions: {
      activeTintColor: Colors.primaryColor,
      labelStyle: {
        fontFamily: "open-sans-bold"
      }
    }
  }
);

export default createAppContainer(MainNavigator);
