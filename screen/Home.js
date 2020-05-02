import React from 'react';
import { AsyncStorage } from 'react-native';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, Alert } from 'react-native';
 
import { useEffect } from 'react';
import useFormValidation from "../Auth/useFormValidation";
import validateLogin from "../Auth/validateLogin";
import firebase from "../firebase/firebase";
import Drawer from '../screen/Drawer';
import Login from '../screen/Login';
 
//import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
//const Tab = createMaterialBottomTabNavigator();

//function MyTabs() {
//    return (
//        <Tab.Navigator>
//            <Tab.Screen name="Home" component={Login} />
//            <Tab.Screen name="Settings" component={Drawer} />
//        </Tab.Navigator>
//    );
//}

export default function Home({ navigation }) {
 
    AsyncStorage.getItem('userId')
        .then(results => {
            if (results === null) {
                Alert.alert(results)
            }
            else {
                Alert.alert(results)
            }
        })

    function savedate(user1) {

        AsyncStorage.setItem('userId', JSON.stringify(user1));
    }


    function authenticateUser() {
    }
    const {
        handleSubmit,
        handleBlur,
        handleChange,
        values,
        errors,
        isSubmitting
    } = useFormValidation(validateLogin, authenticateUser);

    const [firebaseError, setFirebaseError] = React.useState(null);
    const [fname, setFname] = React.useState(null);
    const [lname, setLname] = React.useState(null);
    const [country, setCountry] = React.useState(null);
    const [password, setPassword] = React.useState(null);
    const [email, setEmail] = React.useState(null);
    const [loggedIn, setLoggedIn] = React.useState(null);
  

    const [login, setLogin] = React.useState(false);

    return (


        <>

            <Drawer />
            <ScrollView>
                <View>
                    <View style={{ marginLeft: '10%', marginRight: '10%', padding: '5%', borderRadius: 30, alignItems: 'center', marginTop: !login ? '20%' : '0%' }}>
                        <Text style={{ fontSize: 20, fontWeight: '300', color: 'black' }}>Complete Sign Up</Text>
                    </View>
                </View>
            </ScrollView>
 
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
