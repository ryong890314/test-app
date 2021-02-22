import React, { useContext, useState } from "react";
import { AuthContext } from "../../AuthProvider";
// import { StyleSheet, Text, View, TextInput } from "react-native";
import { Text, View, TextInput, TouchableOpacity } from 'react-native';

import axios from 'axios';

export default function CategoryCreateScreen({ navigation }) {

  const date = new Date();

    const { user, logout } = useContext(AuthContext)
    const [name, setName] = useState('');
    const [startDate, setStartDate] = useState(date.getFullYear() + "-" + ("00" + (date.getMonth()+1)).slice(-2) + "-" + ("00" + date.getDate()).slice(-2));
    const [endDate, setEndDate] = useState(date.getFullYear()+1 + "-" + ("00" + (date.getMonth()+1)).slice(-2) + "-" + ("00" + date.getDate()).slice(-2));
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
            start_date: `${startDate}`,
            end_date: `${endDate}`,
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
          <View style={{paddingTop: 15,}}>
            <Text style={{color: "#000", fontSize: 20, paddingTop: 5, paddingLeft: 20, lineHeight: 30}}>
              새로운 카테고리를{"\n"}만듭니다.</Text>
          </View>
          <Text style={{fontSize: 14, color: "#666666", padding: 20, paddingBottom: 0}}>카테고리 이름</Text>
          <TextInput  
          style={{fontSize: 20, fontWeight: "bold", borderBottomWidth: 1, borderBottomColor: "#666666", padding: 5, marginLeft: 20, marginRight: 20}}
            placeholder="카테고리 이름을 입력하세요."
            onChangeText={text => setName(text)}/>

          {/* <Text style={{fontSize: 14, color: "#666666", padding: 20, paddingBottom: 0}}>공개범위 설정</Text> */}
          <Text style={{fontSize: 14, color: "#666666", padding: 20, paddingBottom: 0}}>시작날짜</Text>
          <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center",
            borderBottomWidth: 1,
            borderBottomColor: "#666666",
            padding: 5,
            marginLeft: 20,
            marginRight: 20}}>
            {startDate}</Text>
          <Text style={{fontSize: 14, color: "#666666", padding: 20, paddingBottom: 0}}>목표날짜</Text>
          <TextInput
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "#000",
            textAlign: "center",
            borderBottomWidth: 1,
            borderBottomColor: "#666666",
            padding: 5,
            marginLeft: 20,
            marginRight: 20}}
          defaultValue= {endDate}
          onChangeText={text => setEndDate(text)}
          keyboardType= "number-pad"
            />
          {/* <Text style={{fontSize: 14, color: "#666666", padding: 20, paddingBottom: 0}}>페이지 설정</Text> */}

        </View>
      );
}