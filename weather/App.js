/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React,{ useState } from 'react';
import {
  View,
  Text,
  Switch,
  StyleSheet
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const App = () => {
  const [switchValue, setSwitchValue] = useState(true)
  toggleSwitch = (value) => {
      setSwitchValue(value)
   }
  return (
    <View style={styles.container}>
      <Text>{switchValue?'Switch is ON':'Switch is OFF'}</Text>
      <Switch
        style={{marginTop:30}}
        onValueChange = {toggleSwitch}
        value = {switchValue}/>
    </View>
  );  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default App
