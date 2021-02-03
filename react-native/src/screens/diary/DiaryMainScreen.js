import * as React from 'react';
import { Text, View } from 'react-native';

function DiaryMainScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff'}}>
      <Text>0권의 일기를</Text>
      <Text>기록하고 있습니다.!</Text>
    </View>
  );
}

export default DiaryMainScreen;