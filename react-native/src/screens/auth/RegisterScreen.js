import * as React from 'react';
import { Text, View, Button } from 'react-native';
import { AuthContext } from "../../AuthProvider";

export default function RegisterScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff'}}>
      <Text>회원가입 화면</Text>
      <Button title="Go to Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
}