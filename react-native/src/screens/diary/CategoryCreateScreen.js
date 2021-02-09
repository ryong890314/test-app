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

          <TextInput  
            placeholder="카테고리 이름"
            onChangeText={text => setName(text)}/>

          <TouchableOpacity onPress={() => categoryCreate()}>
            <Text>만들기</Text>
          </TouchableOpacity>

        </View>
      );
}