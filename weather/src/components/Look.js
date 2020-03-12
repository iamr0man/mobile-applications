import React,{ useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text
} from 'react-native';

import { Stitch, RemoteMongoClient } from "mongodb-stitch-react-native-sdk";

const Look = ({ weather }) => {

  const [numberLook, setNumberLook] = useState('')
  const [tempLooks, setTempLooks] = useState([])
  const [currentWeather, setCurrentWeather] = useState([])

  useEffect(() => {
    setCurrentWeather('7')
    getLook()
  }, [])
  
  const APP_ID = "weatherapp-xsodn"

  async function getLook(){
    const stitchApp = Stitch.hasAppClient(APP_ID)
    ? Stitch.getAppClient(APP_ID)
    : Stitch.initializeAppClient(APP_ID);

    const db = stitchApp.getServiceClient(RemoteMongoClient.factory, "mongodb-atlas").db("weatherapp")
    
    db.collection("photos").find().asArray()
      .then(docs => {
        setTempLooks(docs.filter(v => v.weather.match(currentWeather.toString())))
        setNumberLook('0')
      })
      .catch(err => console.error(`Failed to find document: ${err}`))
  }

  function changeLook(){
    +numberLook+1 < tempLooks.length ? setNumberLook((+numberLook+1).toString()) : setNumberLook('0')
  }

  function selectLook(){
    console.log(numberLook)
    return tempLooks[numberLook] ? {uri: tempLooks[numberLook].link } : require('../../assets/images/loader.png')
  }

  return (
    <TouchableOpacity activeOpacity={.5} style={styles.main} onPress={changeLook}>
      <Image
        source={selectLook()}
        style={numberLook ? styles.look : styles.preload}
      />  
    </TouchableOpacity>
  );  
}

const styles = StyleSheet.create({
  main: {
    flex: 11,
    justifyContent: 'center',
    alignItems: 'center'
  },
  look: {
    width: '100%',
    height: '100%'
  },
  preload: {
    width: 10,
    height: 10,
  }
})

export default Look