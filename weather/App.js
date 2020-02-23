import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Button,
  PermissionsAndroid
} from 'react-native';

import { Stitch, AnonymousCredential, RemoteMongoClient } from "mongodb-stitch-react-native-sdk";
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import Geolocation from 'react-native-geolocation-service';

import instance from './src/api/instance'

// import Header from './src/components/Header'
import Look from './src/components/Look'
import Weather from './src/components/Weather'

const App = () => {

  const [loading, setLoading] = useState(true)
  const [client, setClient] = useState({})
  const [currentUserId, setCurrentUserId] = useState({})
  const [weather, setWeather] = useState('[]')

  useEffect(() => {
    async function wrapperRequestLocationPermission() {
      // _loadClient();
      await requestLocationPermission();
      setLoading(false)      
    }
    wrapperRequestLocationPermission();
  }, [])

  function _loadClient() {
    Stitch.initializeDefaultAppClient("weatherapp-xsodn").then(client => {
      setClient(client);
      client.auth
        .loginWithCredential(new AnonymousCredential())
        .then(user => {
          console.log(`Successfully logged in as user ${user.id}`);
          setCurrentUserId(user.id);
          setCurrentUserId(client.auth.user.id);
      }).catch(err => {
          console.error(err)
      })
    })
  }

  async function requestLocationPermission() {

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if(granted){
      RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({interval: 10000, fastInterval: 5000})
      .then(data => {
        if(data !== 'already-enabled'){
          alert(data);
        }
      }).catch(err => {
        alert("Error " + err.message + ", Code : " + err.code);
      });

      Geolocation.getCurrentPosition((position) => {
          const { latitude, longitude} = position.coords;
          instance.get(`/forecast?lat=${latitude}&lon=${longitude}&APPID=51720aa0345184980178f697081d8bd8&units=metric`)
            .then(response => setWeather(JSON.stringify(response.data.list)))
        },
        (error) => {
            console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 5000}
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