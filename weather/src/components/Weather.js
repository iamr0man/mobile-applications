import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
} from 'react-native';

const Weather = ({ weather }) => {

  let currentWeather = JSON.parse(weather).slice(0, 4)
  return (
      <View style={styles.container}>
        {currentWeather.map((v, i) => {
          return (
            <View style={styles.square} key={i}>
              <Text style={styles.content}>{v.dt_txt.match(/\d+:\d+/)[0]}</Text>
              <Image style={styles.icon} source={{uri:`http://openweathermap.org/img/wn/${v.weather[0].icon}@2x.png`}} />
              <Text style={styles.content}>{v.main.temp.toFixed(1)}</Text>
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
  icon: {
    width: 40,
    height: 50
  },
  content: {
    fontSize: 17,
  },  
  square: {
    flex: 1,
    height: 120,
    padding: 10,
    backgroundColor: 'powderblue',
    borderColor: 'black',
    borderLeftWidth: 4,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderRightWidth: 4,
    borderBottomWidth: 8,
    borderRadius: 20
  }
})

export default Weather