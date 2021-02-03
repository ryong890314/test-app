import React, { useContext, useState } from "react";
import { AuthContext } from "../../AuthProvider";
// import { StyleSheet, Text, View, TextInput } from "react-native";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard } from 'react-native';

export default function LoginScreen({ navigation }) {
    const { login, error } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={styles.container}>
          <Text style={styles.logo}>피플로그</Text>
          <View style={styles.emailInputView} >
            <TextInput  
              style={styles.inputText}
              placeholder="이메일" 
              placeholderTextColor="#666666"
              textContentType="emailAddress"
              onChangeText={text => setEmail(text)}/>
          </View>
          <View style={styles.passwordInputView} >
            <TextInput  
              secureTextEntry
              style={styles.inputText}
              placeholder="비밀번호"
              placeholderTextColor="#666666"
              secureTextEntry={true}
              onChangeText={text => setPassword(text)}/>
          </View>
          <Text>
            { error && <Text style={{ color: 'red'}}>{ error }</Text> }
          </Text>
          <TouchableOpacity onPress={() => login(email, password)} style={styles.loginBtn}>
            <Text style={styles.loginText}>로그인</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerText}>회원가입</Text>
          </TouchableOpacity>
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo:{
      fontWeight:"bold",
      fontSize:50,
      color:"#015697",
      marginBottom:40
    },
    emailInputView:{
      width:"80%",
      backgroundColor:"#efefef",
      borderRadius:5,
      height:50,
      marginBottom:20,
      justifyContent:"center",
      padding:20
    },
    passwordInputView:{
      width:"80%",
      backgroundColor:"#efefef",
      borderRadius:5,
      height:50,
      marginBottom:10,
      justifyContent:"center",
      padding:20
    },
    inputText:{
      height:50,
      color:"#666666"
    },
    loginBtn:{
      width:"80%",
      backgroundColor:"#015697",
      borderRadius:5,
      height:50,
      alignItems:"center",
      justifyContent:"center",
      marginTop:10,
      marginBottom:20
    },
    loginText:{
      color:"#ffffff"
    },
    registerText:{
      color:"#666666"
    }
  });