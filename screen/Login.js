import React from 'react';
import { AsyncStorage } from 'react-native';
import { StyleSheet, Text, View,TextInput,Button,ScrollView, Alert } from 'react-native';
 
import { useEffect } from 'react';
import useFormValidation from "../Auth/useFormValidation";
import validateLogin from "../Auth/validateLogin";
import firebase from "../firebase/firebase";
import Drawer from '../screen/Drawer';
import * as SQLite from 'expo-sqlite';


export default function Login({navigation}) {
  

    function savedate(user1)
    {
 
      AsyncStorage.setItem('userId',JSON.stringify(user1));
  }
    const {
		handleSubmit,
		handleBlur,
		handleChange,
		values,
		errors,
		isSubmitting
	} = useFormValidation( validateLogin, authenticateUser);

    const [firebaseError, setFirebaseError] = React.useState(null);
    const [fname, setFname] = React.useState(null);
    const [lname, setLname] = React.useState(null);
    const [country, setCountry] = React.useState(null);
    const [password, setPassword] = React.useState(null);
    const [email, setEmail] = React.useState(null);
    const [loggedIn, setLoggedIn] = React.useState(null);
  async  function  authenticateUser() {
  
      
 let name = fname;

    
       try {
       
           if (!login) {
               const user1 =  await firebase.login(email, password)
              let userId;
              
                   
              savedate(user1);
              
              

               AsyncStorage.getItem('userId')
                   .then(results => {
                       if (results === null) {
                           Alert.alert(results)
                       }
                       else {
                           Alert.alert(results)
                       }
                   })
           
            //    localStorage.setItem("IsUser", user1.user.uid)
            //    localStorage.setItem("IsAdmin", user1.user.photoURL)
               //console.log(user1)
                
               const linkRef =   firebase.db.collection('users').where("uid", "==", user1.user.uid)
                   .get()
                   .then(function (querySnapshot) {
                       querySnapshot.forEach(function (doc) {

                           // doc.data() is never undefined for query doc snapshots
                          //  console.log(doc.id, " => ", doc.data());
                          //  localStorage.setItem("IsRC", )	
                           AsyncStorage.setItem('IsRC', JSON.stringify(doc.data().SignUpStep.address));
                          //  localStorage.setItem("GPA", doc.data().SignUpStep.GPA)
                           AsyncStorage.setItem('GPA', JSON.stringify(doc.data().SignUpStep.GPA));
                          //  console.log(doc.data.SignUpStep.GPA)
                          //  localStorage.setItem("DocId", doc.id)
                       });
                   })
                   .catch(function (error) {
                       console.log("Error getting documents: ", error);
                   });
              
               navigation.navigate('Home');
           }
           else
           {
               const user1 =  await firebase.register(name, email, password);
Alert.alert(email)
               const newLink = {

                   uid:user1.user.aa.W,
                   email: email,
                   fname: fname,
                   lname: lname,
                   country: country,
                   SignUpStep: [],	 
               };
               const user12 = firebase.db.collection("users").add(newLink);
              setLogin(false)
           
            //    Alert.alert("Signed up successfully! Please login now!")
               setFirebaseError("");
            
               }
            
           
           }
           //const newLink = {

           //	postedBy: {
           //		id: user.uid,
           //		name: user.displayName
           //	},

           //};
    catch (err) {
           console.error("Authentication Error", err);
           setFirebaseError(err.message);
       }
   }
  
  const [login, setLogin] = React.useState(false);

  return (
  
  
  <>
  
  <Drawer/>
  <ScrollView>
    <View>
    <View style={{marginLeft:'10%',marginRight:'10%',padding:'5%',borderRadius:30,alignItems:'center',marginTop:!login? '20%':'0%'}}>
      <Text style={{fontSize:20,fontWeight:'300',color:'black'}}>{!login ? "Login" : "Create Account"}</Text>
      
{
login?
 <>
      <TextInput placeholder="First Name"   onChangeText={(text) => setFname(text)} style={{borderBottomWidth:1,borderColor:'#8797ff',padding:'2%', width:'75%',marginTop:'10%'}}/>
      <TextInput placeholder="Last Name"   onChangeText={(text) => setLname(text)}  style={{borderBottomWidth:1,borderColor:'#8797ff',padding:'2%', width:'75%',marginTop:'10%'}}/>
     </> 
 
: <Text></Text>}




      <TextInput placeholder="Email"  onChangeText={(text) => setEmail(text)}   style={{borderBottomWidth:1,borderColor:'#8797ff',padding:'2%', width:'75%',marginTop:'10%'}}/>
   
   
   
   
   
      <TextInput placeholder="Password"  onChangeText={(text) => setPassword(text)}  style={{borderBottomWidth:1,borderColor:'#8797ff',padding:'2%', width:'75%',marginTop:'3%',marginBottom:'4%'}}/>
      {
login?
 <>
      <TextInput placeholder="Confirm Password" style={{borderBottomWidth:1,borderColor:'#8797ff',padding:'2%', width:'75%',marginTop:'10%'}}/>
      <TextInput placeholder="Country"  onChangeText={(text) => setCountry(text)}  style={{borderBottomWidth:1,borderColor:'#8797ff',padding:'2%', width:'75%',marginTop:'10%',marginBottom:'4%'}}/>
     </> 
 
: <Text></Text>}
   {!login? <Button  onPress={authenticateUser} style={{}} title="Login"/> :  <Button onPress={authenticateUser}  style={{}} title="Signup"/> }
  <Text style={{fontSize:12,marginTop:'5%',marginBottom:'5%'}} > <Text style={{fontSize:12}}>Forget Password</Text><Text>  |  </Text>{!login ?<Text  style={{fontSize:12}} onPress={() => setLogin(true)}> Create Account</Text> : <Text  style={{fontSize:12}} onPress={() => setLogin(false)}> Already have an Account?</Text>} </Text>
 {!login?  <Button   title="Login With Google"/> : <Button   title="Signup With Google"/>}
   
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
