
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import MoreMainScreen from "../screens/more/MoreMainScreen"

const Stack = createStackNavigator();

export const MoreStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="더보기" component={MoreMainScreen} />
      {/* <Stack.Screen name="Settings" component={SettingsScreen} /> */}
    </Stack.Navigator>
  )
}
