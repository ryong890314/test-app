import React, { useContext, useState, useEffect } from "react";
import { FlatList, StyleSheet,ListItem, Text, View, Button, TouchableOpacity } from 'react-native';
import { AuthContext } from "../../AuthProvider";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'

import axios from 'axios';

axios.defaults.baseURL = 'http://192.168.0.39';

function DiaryListScreen( {navigation, route} ) {

  const { user, logout } = useContext(AuthContext)
  const [diaryList, setDiaryList] = useState(null);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title:`${route.params?.name}`,
    });
  }, [navigation]);

  useEffect(() => {

    const unsubscribe = navigation.addListener('focus', () => {

    axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;

    axios.post('/api/diary', {
      category_id: `${route.params?.category_id}`,
    })
      .then(response => {
        setDiaryList(response.data);
      })
      .catch(error => {
        console.log(error.response);
      })

    });

    return unsubscribe;

  }, [navigation]);

  return (
    <View style={styles.container}>

      <FlatList
        style= {{paddingLeft: 10, paddingRight: 10}}
        data= {diaryList}
        // ListHeaderComponent={
        //   <View style={styles.flatlistHeader}>
        //     <Text style={styles.flatlistHeaderText}>
        //       <Text style={{fontWeight: "bold"}}>{categoryCount} 권 </Text>
        //       의 일기를</Text>
        //     <Text style={styles.flatlistHeaderText}>기록하고 있습니다.</Text>
        //   </View>
        // }
        renderItem={({item}) =>
          <TouchableOpacity
            style={styles.flatlistItem}
            onPress={() => navigation.navigate('DiaryDetail', {diary_id: item.diary_id, name: route.params?.name})}>
              <View  style={{width:"100%", padding: 10}}>
            <Text style={{fontSize: 18, fontWeight: "bold"}}>{item.title}</Text>
              </View>
            <View  style={{width:"100%", padding: 10}}>
              <Text style={{fontSize: 16}}>{item.diary_date} | {item.weather} | {item.emotion_no} | {item.open_scope}</Text>
            </View>
            
            {/* <Text style={{fontSize: 16}}>시작날짜 | {item.start_date}</Text>
            <Text style={{fontSize: 16}}>목표날짜 | {item.end_date}</Text>
            <Text style={{fontSize: 16, paddingTop: 25, paddingBottom: 10, paddingRight: 10, alignSelf: 'flex-end'}}>{item.end_page} Page</Text> */}
          </TouchableOpacity>
        }
        ListFooterComponent={
          <View style={{height: 20}}></View>
        }
        keyExtractor={item => item.diary_id.toString()}
        />

          <TouchableOpacity
            style={{
              backgroundColor:"#015697",
              height:50,
              alignItems:"center",
              justifyContent:"center",
            }}
            onPress={() => navigation.navigate('DiaryCreate', {category_id: route.params?.category_id})}>
            <Text style={{color: "#ffffff", fontSize: 16}}>일기쓰기</Text>
          </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  flatlistHeader: {
    paddingTop: 15,
  },
  flatlistHeaderText: {
    color: "#000",
    fontSize: 20,
    paddingTop: 5,
    paddingLeft: 10,
  },
  flatlistItem: {
    backgroundColor: '#efefef',
    width:"100%",
    borderRadius:5,
    marginTop:20,
    padding:10,
    alignItems: 'center',
  },
  
});

export default DiaryListScreen;