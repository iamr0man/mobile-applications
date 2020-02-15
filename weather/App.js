// import React, {Component} from 'react';
// import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
// import RNAndroidLocationEnabler from 'react-native-android-location-enabler';

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

// export default class App extends Component {

  // onLocationPressed = () => {
  //   if (Platform.OS === 'android') {
  //     RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({interval: 10000, fastInterval: 5000})
  //     .then(data => {
  //       alert(data);
  //     }).catch(err => {
  //       // The user has not accepted to enable the location services or something went wrong during the process
  //       // "err" : { "code" : "ERR00|ERR01|ERR02", "message" : "message"}
  //       // codes : 
  //       //  - ERR00 : The user has clicked on Cancel button in the popup
  //       //  - ERR01 : If the Settings change are unavailable
  //       //  - ERR02 : If the popup has failed to open
  //       alert("Error " + err.message + ", Code : " + err.code);
  //     });
  //   }
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//       <TouchableOpacity onPress={this.onLocationPressed}><Text>Click me !</Text></TouchableOpacity>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });

import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Button,
  PermissionsAndroid
} from 'react-native';

import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import Geolocation from 'react-native-geolocation-service';

import instance from './src/api/instance'

// import Header from './src/components/Header'
import Look from './src/components/Look'
import Weather from './src/components/Weather'

const App = () => {

  const [loading, setLoading] = useState(true)
  const [weather, setWeather] = useState('[]')

  useEffect(() => {
    async function wrapperRequestLocationPermission() {
      await requestLocationPermission();
      setLoading(false)      
    }
    wrapperRequestLocationPermission();
  }, [])

  async function requestLocationPermission() {

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if(granted){
      Geolocation.getCurrentPosition((position) => {
          const { latitude, longitude} = position.coords;
          instance.get(`/forecast?lat=${latitude}&lon=${longitude}&APPID=51720aa0345184980178f697081d8bd8&units=metric`)
            .then(response => setWeather(JSON.stringify(response.data.list)))
        },
        (error) => {
            console.log(error.code, error.message);
        },
      ); 
    }
  }

  return (
    <View style={styles.container}>
      <Weather
        loading={loading}
        weather={weather}/>
      <Look />
    </View>
  );  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

export default App
