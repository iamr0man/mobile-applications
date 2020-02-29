import React,{ useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions
} from 'react-native';

import { Stitch, AnonymousCredential, RemoteMongoClient } from "mongodb-stitch-react-native-sdk";

const Look = ({ weather }) => {

  const [lookUri, setLookUri] = useState('')

  useEffect(() => {
    async function wrapperGetLook(){
      await getLook()
    }
    wrapperGetLook()
  }, [])

  function getLook(){
    const stitchApp = Stitch.initializeDefaultAppClient("weatherapp-xsodn");
    const mongodb = stitchApp.getServiceClient(RemoteMongoClient.factory, "mongodb-atlas");
    const photos = mongodb.db("weatherapp").collection("photos");

    let query = {};
    console.log(currentWeather[0].main.temp.toFixed(1))
    if(currentWeather[0].main.temp.toFixed(1) < 7){
      query = { id: 9}
    }

    photos.findOne(query).then(result => {
        if(result) {
          console.log(result)
        } else {
          console.log('No document matches the provided query.')
        }
      })
      .catch(err => console.error(`Failed to find document: ${err}`))
  }

  return (
    <View style={styles.main}>
      <Image
        source={require('../../assets/images/winter.jpg')}
        style={styles.look}
      />  
    </View>
  );  
}

const styles = StyleSheet.create({
  main: {
    flex: 11,
  },
  look: {
    // width: screenWidth,
    // height: screenHeight
  }
})

export default Look