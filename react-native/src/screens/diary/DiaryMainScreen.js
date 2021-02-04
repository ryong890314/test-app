import React, { useContext, useState, useEffect } from "react";
import { FlatList, ListItem, Text, View, Button } from 'react-native';
import { AuthContext } from "../../AuthProvider";
import axios from 'axios';

axios.defaults.baseURL = 'http://192.168.0.39';

function DiaryMainScreen( {navigation} ) {

  const { user, logout } = useContext(AuthContext)
  const [categoryList, setCategoryList] = useState(null);
  const [categoryCount, setCategoryCount] = useState(null);

  useEffect(() => {

    // 화면전환 refrash
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
          <Text>{item.id} | {item.name} | {item.open_scope}</Text>
        </View>
        }
        keyExtractor={item => item.category_id.toString()}
        />

    </View>
  );
}

export default DiaryMainScreen;