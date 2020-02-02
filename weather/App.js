import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Button,
  PermissionsAndroid
} from 'react-native';

import Geolocation from 'react-native-geolocation-service';

// import Header from './src/components/Header'
// import Look from './src/components/Look'

const App = () => {

  // useEffect(() => {
  //   requestLocationPermission();
  // }, [])

  async function requestLocationPermission(msg) {

    console.log(msg)

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    console.log(granted)

    if(granted){
      Geolocation.getCurrentPosition(
        (position) => {
            console.log(position);
        },
        (error) => {
            // See error code charts below.
            console.log(error.code, error.message);
        },
      );
    }
  }
  
  // toggleSwitch = (value) => {
  //   setSwitchValue(value)
  // }


  return (
    <View style={styles.container}>
      {/* <Header /> */}
      <Button
        title="Press me"
        onPress={() => requestLocationPermission('crypto')}
      />
      {/* <Look /> */}
    </View>
  );  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

export default App
