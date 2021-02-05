import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../AuthProvider";
// import { StyleSheet, Text, View, TextInput } from "react-native";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ActivityIndicator } from 'react-native';

import axios from 'axios';

 function CategoryUpdateScreen({ navigation, route }) {

    const { user, logout } = useContext(AuthContext)
    const [categoryDetail, setCategoryDetail] = useState(null);
    const [name, setName] = useState(null);
    const [loading, setLoading] = useState(true);

    function categoryUpdate() {
      axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
  
      axios.post('/api/category/update', {
          category_id: `${route.params?.category_id}`,
          name: `${name}`,
          // start_date: `2020-12-14 17:41:30`,
          // end_date: `2020-12-14 17:41:30`,
          // open_scope: 0,
      })
        .then(response => {
          navigation.navigate('DiaryMain');
        })
        .catch(error => {
          console.log(error.response);
        })
    };

    function categoryDelete() {
      axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
  
      axios.post('/api/category/delete', {
          category_id: `${route.params?.category_id}`,
          // name: `${name}`,
          // start_date: `2020-12-14 17:41:30`,
          // end_date: `2020-12-14 17:41:30`,
          // open_scope: 0,
      })
        .then(response => {
          navigation.navigate('DiaryMain');
        })
        .catch(error => {
          console.log(error.response);
        })
    };

    useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {

      axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
  
      axios.post('/api/category/detail', {
          category_id: `${route.params?.category_id}`,
      })
        .then(response => {
          const categoryResponse = {
            id: response.data.id,
            name: response.data.name,
            category_id : response.data.category_id,
          }
          setCategoryDetail(categoryResponse);
          setLoading(false);
        })
        .catch(error => {
          console.log(error.response);
        })
      });

      return unsubscribe;

    }, [navigation]);

    if (loading) {
      return (<ActivityIndicator />)
    } else {
      return (
        <View>
          <Text>카테고리 이름</Text>
          <TextInput  
            placeholder="카테고리 이름"
            onChangeText={text => setName(text)}
            defaultValue= {categoryDetail.name}
            />
          <Text>{categoryDetail.id} | {categoryDetail.category_id}</Text>
          <TouchableOpacity onPress={() => categoryUpdate()}>
            <Text>업데이트</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => categoryDelete()}>
            <Text>삭제</Text>
          </TouchableOpacity>
        </View>
      );
    }
    
}

export default CategoryUpdateScreen;