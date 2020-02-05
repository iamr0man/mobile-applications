import React,{ useState  } from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';

const Weather = ({ weather }) => {

  const four = weather.slice(1, 4);
  console.log(four)

  return (
    <View>
        <Text>Testing...</Text>
    </View>
  );  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

export default Weather