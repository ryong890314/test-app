
import React, { useContext, useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import DiaryMainScreen from "../screens/diary/DiaryMainScreen"
import CategoryCreateScreen from "../screens/diary/CategoryCreateScreen"
import { Button, TouchableOpacity } from "react-native";

const Stack = createStackNavigator();

export const DiaryStack = ( {navigation} ) => {

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DiaryMain"
        component={DiaryMainScreen}
        options={{ 
          title: '나만의 일기',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
          },
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('CategoryCreate')}>
              <FontAwesomeIcon icon={ faPlus } color={ '#999999' } size={ 20 }/>
            </TouchableOpacity>
          ),
           }}/>
      <Stack.Screen
        name="CategoryCreate"
        component={CategoryCreateScreen}
        options={{
          title: '나만의 일기'
          }}/>
    </Stack.Navigator>
  )
}
