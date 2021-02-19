import React, { useContext, useState } from "react";
import { AuthContext } from "../../AuthProvider";
// import { StyleSheet, Text, View, TextInput } from "react-native";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

import axios from 'axios';

export default function CategoryCreateScreen({ navigation }) {

    const { user, logout } = useContext(AuthContext)
    const [name, setName] = useState('');
    const [endPage, setEndPage] = useState('50');
    const [openScope, setOpenScope] = useState('0');

    React.useLayoutEffect(() => {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity 
                style={{ paddingRight: 20 }}
                onPress={() => categoryCreate()}>
                <Text style={{ fontSize: 16 }}>완료</Text>
              </TouchableOpacity>
        ),
      });
    }, [navigation, name]);

    function categoryCreate() {
        axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
    
        axios.post('/api/category/create', {
            id: `${user.id}`,
            name: `${name}`,
            start_date: `2020-12-14`,
            end_date: `2020-12-15`,
            end_page: `${endPage}`,
            open_scope: `${openScope}`,
        })
          .then(response => {
            // console.log(response);
            navigation.navigate('DiaryMain');
          })
          .catch(error => {
            console.log(error.response);
          })
    
      };

      

    return (
        <View style={{
          flex: 1,
          backgroundColor: '#fff',
        }}>
          <Text style={{fontSize: 14, color: "#666666", padding: 20, paddingBottom: 0}}>카테고리 이름</Text>
          <TextInput  
          style={{fontSize: 20, fontWeight: "bold", borderBottomWidth: 1, borderBottomColor: "#666666", padding: 5, marginLeft: 20, marginRight: 20}}
            placeholder="카테고리 이름을 입력하세요."
            onChangeText={text => setName(text)}/>

          <Text style={{fontSize: 14, color: "#666666", padding: 20, paddingBottom: 0}}>공개범위 설정</Text>
          <Text style={{fontSize: 14, color: "#666666", padding: 20, paddingBottom: 0}}>시작날짜</Text>
          <Text style={{fontSize: 14, color: "#666666", padding: 20, paddingBottom: 0}}>목표날짜</Text>
          <Text style={{fontSize: 14, color: "#666666", padding: 20, paddingBottom: 0}}>페이지 설정</Text>

        </View>
      );
}