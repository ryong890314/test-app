
import React, { useContext, useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import DiaryMainScreen from "../screens/diary/DiaryMainScreen"

const Stack = createStackNavigator();

export const DiaryStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="나만의 일기" component={DiaryMainScreen} />
      {/* <Stack.Screen name="Settings" component={SettingsScreen} /> */}
    </Stack.Navigator>
  )
}
