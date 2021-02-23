import React, { useContext, useState } from "react";
import { AuthContext } from "../../AuthProvider";
// import { StyleSheet, Text, View, TextInput } from "react-native";
import { Text, View, TextInput, TouchableOpacity } from 'react-native';

import axios from 'axios';

export default function DiaryCreateScreen({ navigation, route }) {

  const date = new Date();

    const { user, logout } = useContext(AuthContext);
    const [title, setTitle] = useState('');
    const [diaryDate, setDiaryDate] = useState(date.getFullYear() + "-" + ("00" + (date.getMonth()+1)).slice(-2) + "-" + ("00" + date.getDate()).slice(-2));
    const [createDate, setCreateDate] = useState(date.getFullYear() + "-" + ("00" + (date.getMonth()+1)).slice(-2) + "-" + ("00" + date.getDate()).slice(-2));
    const [weather, setWeather] = useState('1');
    const [emotionNo, setEmotionNo] = useState('1');
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');
    const [openScope, setOpenScope] = useState('1');

    React.useLayoutEffect(() => {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity 
            style={{ paddingRight: 20 }}
            onPress={() => diaryCreate()}>
            <Text style={{ fontSize: 16 }}>완료</Text>
          </TouchableOpacity>
        ),
      });
    }, [navigation, title, content]);

    function diaryCreate() {
        axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
    
        axios.post('/api/diary/create', {
            category_id: `${route.params?.category_id}`,
            title: `${title}`,
            diary_date: `${diaryDate}`,
            create_date: `${createDate}`,
            // update_date: `${endPage}`,
            weather: `${weather}`,
            emotion_no: `${emotionNo}`,
            content: `${content}`,
            image: `${image}`,
            open_scope: `${openScope}`,
        })
          .then(response => {
            // console.log(response);
            navigation.navigate('DiaryList');
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
          {/* <View style={{paddingTop: 15,}}>
            <Text style={{color: "#000", fontSize: 20, paddingTop: 5, paddingLeft: 20, lineHeight: 30}}>
              새로운 카테고리를{"\n"}만듭니다.</Text>
          </View> */}
          <Text style={{fontSize: 14, color: "#666666", padding: 20, paddingBottom: 0}}>일기제목</Text>
          <TextInput  
          style={{fontSize: 20, fontWeight: "bold", borderBottomWidth: 1, borderBottomColor: "#666666", padding: 5, marginLeft: 20, marginRight: 20}}
            placeholder="일기제목을 입력하세요."
            onChangeText={text => setTitle(text)}
            />

          {/* <Text style={{fontSize: 14, color: "#666666", padding: 20, paddingBottom: 0}}>공개범위 설정</Text> */}
          <Text style={{fontSize: 14, color: "#666666", padding: 20, paddingBottom: 0}}>일기날짜</Text>
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
            {diaryDate}</Text>
          <Text style={{fontSize: 14, color: "#666666", padding: 20, paddingBottom: 0}}>일기내용</Text>
          <TextInput
          style={{
            fontSize: 16,
            color: "#000",
            borderBottomWidth: 1,
            borderBottomColor: "#666666",
            padding: 5,
            marginLeft: 20,
            marginRight: 20}}
            placeholder="일기내용을 입력하세요."
          onChangeText={text => setContent(text)}
          
            />
          {/* <Text style={{fontSize: 14, color: "#666666", padding: 20, paddingBottom: 0}}>페이지 설정</Text> */}

        </View>
      );
}