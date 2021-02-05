import React, { useContext, useState, useEffect } from "react";
import { FlatList, ListItem, Text, View, Button, TouchableOpacity } from 'react-native';
import { AuthContext } from "../../AuthProvider";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'

import axios from 'axios';

axios.defaults.baseURL = 'http://192.168.0.39';

function DiaryMainScreen( {navigation, route} ) {

  const { user, logout } = useContext(AuthContext)
  const [categoryList, setCategoryList] = useState(null);
  const [categoryCount, setCategoryCount] = useState(null);

  useEffect(() => {

    const unsubscribe = navigation.addListener('focus', () => {

    axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;

    axios.post('/api/category', {
        id: `${user.id}`,
    })
      .then(response => {
        setCategoryList(response.data);
        setCategoryCount(Object.values(response.data).length);
      })
      .catch(error => {
        console.log(error.response);
      })

    });

    return unsubscribe;

  }, [navigation]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff'}}>
      <Text>{categoryCount}권의 일기를</Text>
      <Text>기록하고 있습니다.</Text>

      <FlatList
        data= {categoryList}
        renderItem={({item}) =>
        <View>
          <Text>{item.category_id} | {item.id} | {item.name} | {item.open_scope}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('CategoryUpdate', {category_id: item.category_id})}>
              <FontAwesomeIcon icon={ faEllipsisH } color={ '#999999' } size={ 20 }/>
            </TouchableOpacity>
        </View>
        }
        keyExtractor={item => item.category_id.toString()}
        />

    </View>
  );
}

export default DiaryMainScreen;