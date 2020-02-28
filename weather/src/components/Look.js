import React,{ useState  } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions
} from 'react-native';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const Look = () => {
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
    // width: 300,
    // height: 600
  },
  look: {
    width: screenWidth,
    height: screenHeight
  }
})

export default Look