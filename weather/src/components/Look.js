import React,{ useState  } from 'react';
import {
  View,
  StyleSheet,
  Image
} from 'react-native';

const Look = () => {
  return (
    <View style={styles.main}>
      <Image
        source={require('../../assets/images/look.jpg')}
        style={styles.container}
      />  
    </View>
  );  
}

const styles = StyleSheet.create({
  main: {
    flex: 8,
    // width: 300,
    // height: 600
  }
})

export default Look