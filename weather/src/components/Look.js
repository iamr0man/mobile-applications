import React,{ useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions
} from 'react-native';

import { Stitch, RemoteMongoClient } from "mongodb-stitch-react-native-sdk";

const Look = ({ weather,  currentUserId, link }) => {

  const [lookUri, setLookUri] = useState('')

  useEffect(() => {
    async function wrapperGetLook(){
      await getLook()
    }
    wrapperGetLook()
  }, [])

  const APP_ID = "weatherapp-xsodn"

  async function getLook(){
    // const stitchApp = Stitch.getAppClient("weatherapp-xsodn");
    const stitchApp = Stitch.hasAppClient(APP_ID)
    ? Stitch.getAppClient(APP_ID)
    : Stitch.initializeAppClient(APP_ID);

    console.log("stitchApp: " + stitchApp)
    console.log("client: " + client)
    console.log("currentUserId: " + currentUserId)

    const db = stitchApp.getServiceClient(RemoteMongoClient.factory, "mongodb-atlas").db("weatherapp")
    
    db.collection("photos")
      .insertOne({ owner_id: currentUserId, link: 'http://'})
      .then(() => db.collection('photos').find().asArray())
      .then(docs => console.log(docs))
      .catch(err => console.error(err))

    // photos.find().then(doc => console.log(doc)).catch(err => console.error(err))
    //   let query = {};
  //   console.log(weather)
  //   if(currentWeather[0].main.temp.toFixed(1) < 7){
  //     query = { id: 9}
  //   }

  //   photos.findOne(query).then(result => {
  //       if(result) {
  //         console.log(result)
  //       } else {
  //         console.log('No document matches the provided query.')
  //       }
  //     })
  //     .catch(err => console.error(`Failed to find document: ${err}`))
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