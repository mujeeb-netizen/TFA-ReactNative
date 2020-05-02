import React from 'react';
import { StyleSheet, Text, View,TextInput,Button,ScrollView } from 'react-native';
import SplashScreen from 'react-native-splash-screen'
import {decode, encode} from 'base-64'


import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './screen/Login';
import Home from './screen/Home';
const Stack = createStackNavigator();
export default function App() {
 if (!global.btoa) {  global.btoa = encode }

if (!global.atob) { global.atob = decode }
  const [drawer, setDrawer] = React.useState(false);
  return (
  <>
     
    <NavigationContainer>
      
           <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{title: 'Login'}}
                  />

                  <Stack.Screen
          name="Home"
          component={Home}
          options={{title: 'Home'}}
        />
       
      </Stack.Navigator>
    </NavigationContainer>
  
  
 
  </>);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
