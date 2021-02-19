import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAtlas, faBook, faEllipsisH, faFileAlt, faSearch } from '@fortawesome/free-solid-svg-icons'

import { DiaryStack } from './stack/DiaryStack';

// import ExDiaryStack from './stack/ExDiaryStack';
// import FeedStack from './stack/FeedStack';
// import SearchStack from './stack/SearchStack';
import { MoreStack} from './stack/MoreStack';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
    return (
      <Tab.Navigator
        initialRouteName="Diary"
        tabBarOptions={{
          showLabel: false,
          activeTintColor: '#015697',
          style: { 
            // borderTopWidth: 0,
            // elevation: 0,
          },
        }}
      >
        <Tab.Screen
          name="Diary"
          component={ DiaryStack }
          options={{
            tabBarLabel: 'Diary',
            tabBarIcon: ({color}) => (
              <FontAwesomeIcon icon={ faBook } color={color} size={ 24 }/>
            ),
          }
        }
        />
         {/* <Tab.Screen
          name="ExDiary"
          component={ ExDiaryStack }
          options={{
            tabBarLabel: 'ExDiary',
            tabBarIcon: ({color}) => (
              <FontAwesomeIcon icon={ faAtlas } color={color} size={ 24 }/>
            ),
          }}
        />
         <Tab.Screen
          name="Feed"
          component={ FeedStack }
          options={{
            tabBarLabel: 'Feed',
            tabBarIcon: ({color}) => (
              <FontAwesomeIcon icon={ faFileAlt } color={color} size={ 24 }/>
            ),
          }}
        />
         <Tab.Screen
          name="Search"
          component={ SearchStack }
          options={{
            tabBarLabel: 'Search',
            tabBarIcon: ({color}) => (
              <FontAwesomeIcon icon={ faSearch } color={color} size={ 24 }/>
            ),
          }}
        /> */}
         <Tab.Screen
          name="More"
          component={ MoreStack }
          options={{
            tabBarLabel: 'More',
            tabBarIcon: ({color}) => (
              <FontAwesomeIcon icon={ faEllipsisH } color={color} size={ 24 }/>
            ),
          }}
        />
      </Tab.Navigator>
    );
  }