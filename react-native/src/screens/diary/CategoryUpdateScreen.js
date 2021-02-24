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

    React.useLayoutEffect(() => {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity 
                style={{ paddingRight: 20 }}
                onPress={() => categoryUpdate()}>
                <Text style={{ fontSize: 16 }}>완료</Text>
              </TouchableOpacity>
        ),
      });
    }, [navigation, name]);

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
          setName(categoryResponse.name);
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
        <View style={{
          flex: 1,
          backgroundColor: '#fff',
        }}>
          <View style={{paddingTop: 15,}}>
            <Text style={{color: "#000", fontSize: 20, paddingTop: 5, paddingLeft: 20, lineHeight: 30}}>
              카테고리 설정을{"\n"}변경합니다.</Text>
          </View>
          <Text style={{fontSize: 14, color: "#666666", padding: 20, paddingBottom: 0}}>카테고리 이름</Text>
          <TextInput
            style={{fontSize: 20, fontWeight: "bold", borderBottomWidth: 1, borderBottomColor: "#666666", padding: 5, marginLeft: 20, marginRight: 20}}  
            placeholder="카테고리 이름"
            onChangeText={text => setName(text)}
            defaultValue= {categoryDetail.name}
            />
          
          <TouchableOpacity
            style={{
              backgroundColor:"#E71D36",
              borderRadius:2,
              height:50,
              alignItems:"center",
              justifyContent:"center",
              margin: 20
            }}
            onPress={() => categoryDelete()}>
            <Text style={{color: "#ffffff", fontSize: 16}}>카테고리 삭제</Text>
          </TouchableOpacity>
        </View>
      );
    }
    
}

export default CategoryUpdateScreen;