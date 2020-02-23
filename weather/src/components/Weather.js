import React, { useState, Fragment} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
} from 'react-native';

import { Stitch, RemoteMongoClient } from "mongodb-stitch-react-native-sdk";


const Weather = ({ weather, loading }) => {

  if (loading) return null;

  let currenyWeather = JSON.parse(weather).slice(0, 4)
  console.log(currenyWeather)

  function writeInDb() {
    const stitchAppClient = Stitch.defaultAppClient;
    const mongoClient = stitchAppClient.getServiceClient(
      RemoteMongoClient.factory,
      "mongodb-atlas"
    );
    const db = mongoClient.db("weatherapp");
    const photos = db.collection("photos")
    // photos.find().asArray().then(data => console.log(data)).catch(err => console.error(err))
    photos.insertOne({
      description: "need to translate english text",
      link: "https://unsplash.com/photos/sHRIto0UraI"
    })
  }  

  return (
      <View style={styles.container}>
        {currenyWeather.map((v, i) => {
          return (
            <View style={styles.square} key={i}>
              <Text>{v.dt_txt.match(/\d+:\d+/)[0]}</Text>
              {/* <CustomIcon name="c3_r2_st" /> */}
              <Text>{v.main.temp.toFixed(1)}</Text>
              <Button
                title="Write in DB"
                onPress={() => writeInDb()}
              />
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
  content: {
    padding: 10,
  },  
  square: {
    flex: 1,
    backgroundColor: 'powderblue',
  }
})

export default Weather