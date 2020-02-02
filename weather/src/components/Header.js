import React, { useState  } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';


const Header = () => {
  return (
    <View style={styles.container}>
      <Icon name="sharealt" size={30} color="teal" />
    </View>
  );  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-end'
  }
})

export default Header