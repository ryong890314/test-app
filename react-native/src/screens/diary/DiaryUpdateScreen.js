import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../AuthProvider";
// import { StyleSheet, Text, View, TextInput } from "react-native";
import { Text, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';

import axios from 'axios';

export default function DiaryUpdateScreen({ navigation, route }) {

  const date = new Date();

    const { user, logout } = useContext(AuthContext);
    const [title, setTitle] = useState('');
    const [diaryDate, setDiaryDate] = useState(date.getFullYear() + "-" + ("00" + (date.getMonth()+1)).slice(-2) + "-" + ("00" + date.getDate()).slice(-2));
    const [updateDate, setUpdateDate] = useState(date.getFullYear() + "-" + ("00" + (date.getMonth()+1)).slice(-2) + "-" + ("00" + date.getDate()).slice(-2));
    const [weather, setWeather] = useState('1');
    const [emotionNo, setEmotionNo] = useState('1');
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');
    const [openScope, setOpenScope] = useState('1');

    const [diaryDetail, setDiaryDetail] = useState(null);

    const [loading, setLoading] = useState(true);

    React.useLayoutEffect(() => {
      navigation.setOptions({
        title:`${route.params?.name}`,
        headerRight: () => (
          <TouchableOpacity 
            style={{ paddingRight: 20 }}
            onPress={() => diaryUpdate()}>
            <Text style={{ fontSize: 16 }}>완료</Text>
          </TouchableOpacity>
        ),
      });
    }, [navigation, title, content]);

    function diaryDelete() {
      axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
  
      axios.post('/api/diary/delete', {
          diary_id: `${route.params?.diary_id}`,
      })
        .then(response => {
          navigation.navigate('DiaryList');
        })
        .catch(error => {
          console.log(error.response);
        })
    };

    function diaryUpdate() {
      axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
  
      axios.post('/api/diary/update', {
          diary_id: `${route.params?.diary_id}`,
          title: `${title}`,
          // diary_date: `${diaryDate}`,
          // weather: `${weather}`,
          // emotion_no: `${emotionNo}`,
          content: `${content}`,
          // image: `${image}`,
          // open_scope: `${openScope}`,
      })
        .then(response => {
          navigation.navigate('DiaryDetail', {diary_id: route.params?.diary_id, name: route.params?.name});
        })
        .catch(error => {
          console.log(error.response);
        })
    };

    useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {

      axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
  
      axios.post('/api/diary/detail', {
          diary_id: `${route.params?.diary_id}`,
      })
        .then(response => {
          const diaryResponse = {
            diary_id: response.data.diary_id,
            category_id : response.data.category_id,
            title: response.data.title,
            diary_date: response.data.diary_date,
            content: response.data.content,
          }
          setDiaryDetail(diaryResponse);
          setTitle(diaryResponse.title);
          setContent(diaryResponse.content);
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
            <Text style={{fontSize: 14, color: "#666666", padding: 20, paddingBottom: 0}}>일기제목</Text>
            <TextInput  
            style={{fontSize: 20, fontWeight: "bold", borderBottomWidth: 1, borderBottomColor: "#666666", padding: 5, marginLeft: 20, marginRight: 20}}
            defaultValue= {diaryDetail.title}
              onChangeText={text => setTitle(text)}
              />

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
              defaultValue= {diaryDetail.content}
            onChangeText={text => setContent(text)}
            
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
              onPress={() => diaryDelete()}>
              <Text style={{color: "#ffffff", fontSize: 16}}>일기삭제</Text>
            </TouchableOpacity>

          </View>
        );
      }
}