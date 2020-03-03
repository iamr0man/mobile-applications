import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Image,
  PermissionsAndroid
} from 'react-native';

import { Stitch, AnonymousCredential, RemoteMongoClient } from "mongodb-stitch-react-native-sdk";
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import Geolocation from 'react-native-geolocation-service';

import instance from './src/api/instance'
import MainService from './src/services/preview'

import Look from './src/components/Look'
import Weather from './src/components/Weather'
import Form from './src/components/Form'

const App = () => {

  const [loading, setLoading] = useState(true)
  const [client, setClient] = useState({})
  const [currentUserId, setCurrentUserId] = useState({})
  const [weather, setWeather] = useState('[]')

  useEffect(() => {
    MainService.load(v => setLoading(false))
    async function wrapperRequestLocationPermission() {
      // _loadClient();
      await requestLocationPermission();
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

  return !loading ? 
    (
    <View style={styles.container}>
      {/* <Form currentUserId={currentUserId} /> */}
      <Weather
        loading={loading}
        weather={weather} />
      <Look 
        client={client}
        currentUserId={currentUserId}
        weather={weather} />
    </View>
  ) : <Image 
        source={require('./assets/images/preview.jpg')}
        style={styles.preview}/>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    width: '100%',
    height: '100%'
  }
})

export default App
