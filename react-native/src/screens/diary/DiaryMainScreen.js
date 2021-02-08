import React, { useContext, useState, useEffect } from "react";
import { FlatList, StyleSheet,ListItem, Text, View, Button, TouchableOpacity } from 'react-native';
import { AuthContext } from "../../AuthProvider";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'

import axios from 'axios';

axios.defaults.baseURL = 'http://192.168.0.39';

function DiaryMainScreen( {navigation, route} ) {

  const { user, logout } = useContext(AuthContext)
  const [categoryList, setCategoryList] = useState(null);
  const [categoryCount, setCategoryCount] = useState(null);

  useEffect(() => {

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
    <View style={styles.container}>

      <FlatList
        style= {{paddingLeft: 10, paddingRight: 10}}
        data= {categoryList}
        ListHeaderComponent={
          <View style={styles.flatlistHeader}>
            <Text style={styles.flatlistHeaderText}>
              <Text style={{fontWeight: "bold"}}>{categoryCount} 권 </Text>
              의 일기를</Text>
            <Text style={styles.flatlistHeaderText}>기록하고 있습니다.</Text>
          </View>
        }
        renderItem={({item}) =>
          <View style={styles.flatlistItem}>
            <View  style={{width:"100%", padding: 25}}>
              <Text style={{alignSelf: 'flex-start', position: 'absolute', padding: 10}}>공개범위 | {item.open_scope}</Text>
              <TouchableOpacity 
                style={{alignSelf: 'flex-end', position: 'absolute', padding: 10}}
                onPress={() => navigation.navigate('CategoryUpdate', {category_id: item.category_id})}>
                <FontAwesomeIcon icon={ faEllipsisH } color={ '#999999' } size={ 20 }/>
              </TouchableOpacity>
            </View>
            <Text style={{fontSize: 20, fontWeight: "bold", padding: 20}}>{item.name}</Text>
            <Text style={{fontSize: 16}}>시작날짜 | {item.start_date}</Text>
            <Text style={{fontSize: 16}}>목표날짜 | {item.end_date}</Text>
            <Text style={{paddingTop: 25, paddingRight: 10, alignSelf: 'flex-end'}}>{item.end_page} Page</Text>
          </View>
        }
        ListFooterComponent={
          <View style={{height: 20}}></View>
        }
        keyExtractor={item => item.category_id.toString()}
        />

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
    height:240,
    marginTop:20,
    padding:10,
    alignItems: 'center',
  },
  
});

export default DiaryMainScreen;