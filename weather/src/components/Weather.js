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
        {/* <FlatList
          data={four}
          renderItem={({ item }) => (
            <View style={{ flex: 1, borderColor: 'black',
            borderWidth: 2, backgroundColor: 'powderblue'}}>
            </View>
          )}
          keyExtractor={item => item.dt_txt}
        /> */}
        {four.map((v, i) => {
          return (
            <View style={styles.square} key={i}>
              <View style={styles.content}>
                <Text>{v.dt_txt.match(/\d+:\d+/)[0]}</Text>
                <CustomIcon name="c3_r2" />
                <Text>{((v.main.feels_like - 32) /1.80).toFixed(1)}</Text>
              </View>
            </View>
          )
        })}
        {/* <View style={{flex: 1,backgroundColor: 'powderblue'}} />
        <View style={{flex: 1,backgroundColor: 'skyblue'}} />
        <View style={{flex: 1,backgroundColor: 'steelblue'}} /> */}
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