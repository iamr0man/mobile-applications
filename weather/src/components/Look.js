import React,{ useState  } from 'react';
import {
  View,
  StyleSheet,
  Image
} from 'react-native';

const Look = () => {
  return (
    <View>
      <Image
        source={require('../../assets/images/look.jpg')}
        style={styles.container}
      />  
    </View>
  );  
}

const styles = StyleSheet.create({
  container: {
    flex: 8,
  }
})

export default Look