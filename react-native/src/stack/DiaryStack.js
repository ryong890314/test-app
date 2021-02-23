
import React, { useContext, useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import DiaryMainScreen from "../screens/diary/DiaryMainScreen"
import CategoryCreateScreen from "../screens/diary/CategoryCreateScreen"
import CategoryUpdateScreen from "../screens/diary/CategoryUpdateScreen"
import DiaryListScreen from "../screens/diary/DiaryListScreen"
import DiaryCreateScreen from "../screens/diary/DiaryCreateScreen"
import DiaryDetailScreen from "../screens/diary/DiaryDetailScreen"
import DiaryUpdateScreen from "../screens/diary/DiaryUpdateScreen"
import { Button, TouchableOpacity, Text } from "react-native";

import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

const Stack = createStackNavigator();

export const DiaryStack = ( {navigation, route} ) => {

  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName == undefined || routeName == "DiaryMain") {
        navigation.setOptions({tabBarVisible: true});
    }else {
        navigation.setOptions({tabBarVisible: false});
    }
}, [navigation, route]);

  return (
    <Stack.Navigator
    screenOptions={{
      headerBackTitleVisible: false
    }}>
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
            <TouchableOpacity 
              style={{ padding: 20}}
              onPress={() => navigation.navigate('CategoryCreate')}>
              <FontAwesomeIcon icon={ faPlus } color={ '#000000' } size={ 20 }/>
            </TouchableOpacity>
          ),
           }}/>
      <Stack.Screen
        name="CategoryCreate"
        component={CategoryCreateScreen}
        options={{
          title: '나만의 일기',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
          },
          }}/>
      <Stack.Screen
        name="CategoryUpdate"
        component={CategoryUpdateScreen}
        options={{
          title: '나만의 일기',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
          },
          }}/>
      <Stack.Screen
        name="DiaryList"
        component={DiaryListScreen}
        options={{
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
          },
          }}/>
      <Stack.Screen
        name="DiaryCreate"
        component={DiaryCreateScreen}
        options={{
          title: '일기쓰기',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
          },
          }}/>
      <Stack.Screen
        name="DiaryDetail"
        component={DiaryDetailScreen}
        options={{
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
          },
          }}/>
      <Stack.Screen
        name="DiaryUpdate"
        component={DiaryUpdateScreen}
        options={{
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
          },
          }}/>
    </Stack.Navigator>
  )
}
