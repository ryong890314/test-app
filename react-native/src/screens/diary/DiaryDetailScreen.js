import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../AuthProvider";
// import { StyleSheet, Text, View, TextInput } from "react-native";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ActivityIndicator } from 'react-native';

import axios from 'axios';

 function DiaryDetailScreen({ navigation, route }) {

    const { user, logout } = useContext(AuthContext)
    const [diaryDetail, setDiaryDetail] = useState(null);
    const [loading, setLoading] = useState(true);

    React.useLayoutEffect(() => {
      navigation.setOptions({
        title:`${route.params?.name}`,
        headerRight: () => (
          <TouchableOpacity 
                style={{ paddingRight: 20 }}
                onPress={() => navigation.navigate('DiaryUpdate', {diary_id: route.params?.diary_id, name: route.params?.name})}
                >
                <Text style={{ fontSize: 16 }}>편집</Text>
              </TouchableOpacity>
        ),
      });
    }, [navigation]);

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
          <Text style={{fontSize: 20, fontWeight: "bold", padding: 20, paddingBottom: 0}}>{diaryDetail.title}</Text>
          <Text style={{fontSize: 14, color: "#666666", padding: 20, paddingBottom: 0}}>{diaryDetail.diary_date}</Text>
          <Text style={{fontSize: 14, color: "#666666", padding: 20, paddingBottom: 0}}>{diaryDetail.content}</Text>
          
        </View>
      );
    }
    
}

export default DiaryDetailScreen;