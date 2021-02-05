import React, { useState } from 'react';
// import { AsyncStorage } from 'react-native';

import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

axios.defaults.baseURL = 'http://192.168.0.39';

export const AuthContext = React.createContext({});

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        error,
        login: (email, password) => {
          axios.post('/api/sanctum/token', {
            email,
            password,
            device_name: 'mobile',
          })
          .then(response => {
            const userResponse = {
              email: response.data.user.email,
              id : response.data.user.id,
              token: response.data.token,
            }
            setUser(userResponse);
            setError(null);
            SecureStore.setItemAsync('user', JSON.stringify(userResponse));
          })
          .catch(error => {
            const key = Object.keys(error.response.data.errors)[0];
            setError(error.response.data.errors[key][0]);
          })
        },
        logout: () => {
          axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;

          const tokenId = user.token.split('|')[0];
          
          axios.post('/api/logout', {
            tokenId: tokenId,
          })
          .then(response => {
            setUser(null);
            SecureStore.deleteItemAsync('user');

          })
          .catch(error => {
            console.log(error.response);
          })
        },

        // 리셋
        reset: () => {
          SecureStore.deleteItemAsync('user');
          console.log('reset');
        },
        //
        
      }}>
      {children}
    </AuthContext.Provider>
  );
}
