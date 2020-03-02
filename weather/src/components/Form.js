import React, { useState, Fragment} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Button
} from 'react-native';

import { Stitch, RemoteMongoClient } from "mongodb-stitch-react-native-sdk";

const Form = ({ currentUserId }) => {

  const [id, setId] = React.useState("0");
  const [link, setLink] = React.useState('');
  const [season, setSeason] = React.useState('spring');

  async function writeLookToDB(){
    const APP_ID = "weatherapp-xsodn"

    const stitchApp = Stitch.hasAppClient(APP_ID)
    ? Stitch.getAppClient(APP_ID)
    : Stitch.initializeAppClient(APP_ID);

    console.log("stitchApp: " + stitchApp)
    console.log("currentUserId: " + currentUserId)

    const db = stitchApp.getServiceClient(RemoteMongoClient.factory, "mongodb-atlas").db("weatherapp")
    
    db.collection("photos")
      .insertOne({ owner_id: currentUserId, id, link, season})
      .then(() => db.collection('photos').find().asArray()
      .then(docs => console.log(docs))
      .catch(err => console.error(err)))
  }

  return (
      <View style={styles.container}>
        <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 10 }}
            onChangeText={text => setId(text)}
            value={id}
        />
        <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 10 }}
            onChangeText={text => setLink(text)}
            value={link}
        />
        <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 10 }}
            onChangeText={text => setSeason(text)}
            value={season}
        />
         <Button
            title="Apply"
            onPress={writeLookToDB}
        />
    </View>
  );
}

const styles = StyleSheet.create({

})

export default Form