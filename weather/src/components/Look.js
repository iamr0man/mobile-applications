import React,{ useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Image,
} from 'react-native';

import { Stitch, RemoteMongoClient } from "mongodb-stitch-react-native-sdk";

const Look = ({ weather, loading }) => {

  const [currentPhoto, setCurrentLook] = useState('')
  const [tempLooks, setTempLooks] = useState([])
  const [currentWeather, setCurrentWeather] = useState([])

  useEffect(() => {
    async function wrapperGetLook(){
      setCurrentWeather(parseInt(JSON.parse(weather)[0].main.temp))
      await getLook()
    }
    wrapperGetLook()
  }, [])
  
  const APP_ID = "weatherapp-xsodn"

  async function getLook(){
    const stitchApp = Stitch.hasAppClient(APP_ID)
    ? Stitch.getAppClient(APP_ID)
    : Stitch.initializeAppClient(APP_ID);

    const db = stitchApp.getServiceClient(RemoteMongoClient.factory, "mongodb-atlas").db("weatherapp")
    
    db.collection("photos").find().asArray()
      .then(docs => {
        setTempLooks(docs.filter(v => v.weather.match(currentWeather)))
        setCurrentLook(tempLooks[0].link)
      })
      .catch(err => console.error(`Failed to find document: ${err}`))
  }

  return (!loading ? 
    (
    <View style={styles.main}>
      <Image
        source={currentPhoto ? {uri: currentPhoto } : require('../../assets/images/loader.png')}
        style={currentPhoto ? styles.look : styles.preload}
      />  
    </View>
    ) : null
  );  
}

const styles = StyleSheet.create({
  main: {
    flex: 11,
  },
  look: {
    width: '100%',
    height: '100%'
  },
  preload: {
    width: '24px'
  }
})

export default Look