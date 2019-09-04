import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, Switch, Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButton";

import Colors from "../constants/Colors";

import { setFilters } from "../store/actions/meals";
import { useDispatch } from "react-redux";

const FilterSwitch = props => {
  return (
    <View style={styles.filterContainer}>
      <Text style={styles.textTitle}>{props.label}</Text>
      <Switch
        trackColor={{ true: Colors.primaryColor }}
        thumbColor={"white"}
        value={props.state}
        onValueChange={newValue => props.onChange(newValue)}
      ></Switch>
    </View>
  );
};

const FilterScreen = props => {
  const dispatch = useDispatch();

  const { navigation } = props;

  const [isGlutenFree, setIsGluetenFree] = useState(false);
  const [isLactoseFree, setIsLactoseFree] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);

  const saveFilters = useCallback(() => {
    const appliedFilter = {
      glutenFree: isGlutenFree,
      lactoseFree: isLactoseFree,
      vegan: isVegan,
      vegetarian: isVegetarian
    };
    dispatch(setFilters(appliedFilter));
  }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian, dispatch]);

  useEffect(() => {
    navigation.setParams({ save: saveFilters });
  }, [saveFilters]);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Available Filters/Restrictions</Text>
      <FilterSwitch
        label={"Gluten-free"}
        state={isGlutenFree}
        onChange={setIsGluetenFree}
      />
      <FilterSwitch
        label={"Lactose-free"}
        state={isLactoseFree}
        onChange={setIsLactoseFree}
      />
      <FilterSwitch label={"Vegan"} state={isVegan} onChange={setIsVegan} />
      <FilterSwitch
        label={"Vegetarian"}
        state={isVegetarian}
        onChange={setIsVegetarian}
      />
    </View>
  );
};

FilterScreen.navigationOptions = navData => {
  return {
    headerTitle: "Filter Meals",
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => navData.navigation.toggleDrawer()}
        />
      </HeaderButtons>
    ),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName="ios-save"
          onPress={navData.navigation.getParam("save")}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center"
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
    margin: 20,
    textAlign: "center"
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    marginVertical: 15
  },
  textTitle: {
    fontFamily: "open-sans",
    fontSize: 16
  }
});

export default FilterScreen;
