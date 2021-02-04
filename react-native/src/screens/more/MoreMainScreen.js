import React, { useContext } from 'react';
import { Text, View, Button } from 'react-native';
import { AuthContext } from "../../AuthProvider";


function MoreMainScreen() {

  const { user, logout, reset } = useContext(AuthContext);
  

  // useEffect(() => {
  //   axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;

  //   axios.get('/api/user')
  //     .then(response => {
  //       setName(response.data.name);
  //     })
  //     .catch(error => {
  //       console.log(error.response);
  //     })

  // }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>User : {user.id} | {user.email}</Text>
      <Button title="Logout" onPress={() => logout()} />
      
      <Button title="reset" onPress={() => reset()} />

    </View>
  );
}

export default MoreMainScreen;