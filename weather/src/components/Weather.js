import React, { useState, Fragment} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
} from 'react-native';

import CustomIcon from './CustomIcon.js'

const Weather = ({ weather, loading }) => {

  if (loading) return null;

  let four = JSON.parse(weather).slice(1, 5)
  console.log(four)

  return (
      <View style={styles.container}>
        {four.map((v, i) => {
          return (
            <View style={styles.square} key={i}>
              <Text>{v.dt_txt.match(/\d+:\d+/)[0]}</Text>
              {/* <CustomIcon name="c3_r2_st" /> */}
              <Text>{v.main.feels_like}</Text>
            </View>
          )
        })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    flexDirection: 'row',
  },
  content: {
    padding: 10,
  },  
  square: {
    flex: 1,
    backgroundColor: 'powderblue',
  }
})

export default Weather