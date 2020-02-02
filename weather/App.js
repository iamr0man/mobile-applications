import React,{ useState } from 'react';
import {
  View,
  StyleSheet
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Header from './src/components/Header'
import Image from './src/components/Image'

const App = () => {
  const [switchValue, setSwitchValue] = useState(true)
  toggleSwitch = (value) => {
      setSwitchValue(value)
   }
  return (
    <View style={styles.container}>
      {/* <Text>{switchValue? '12':'24'}</Text> */}
      {/* <Switch
        style={{marginTop:30}}
        onValueChange = {toggleSwitch}
        value = {switchValue}/> */}
      <Header />
      <Image />
    </View>
  );  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

export default App
