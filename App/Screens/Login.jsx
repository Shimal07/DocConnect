import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from './../../firebase'; 
import { Button, TextBtn } from '../Components/Button';
import InputField from '../Components/InputField';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Sign in functionality
  const handleSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Retrieve user data from Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log("User Data:", userData); // Log user data for debugging
        if (userData.isAdmin) {
          console.log("User is Admin. Redirecting to Admin Page.");
          navigation.reset({
            index: 0,
            routes: [{ name: 'AdminTabs' }], // Navigate to the admin page
          });
        } else {
          console.log("User is not Admin. Redirecting to Home Page.");
          navigation.reset({
            index: 0,
            routes: [{ name: 'Main' }], // Navigate to the home page
          });
        }
      }
    } catch (error) {
      console.error("Sign-in failed:", error);
      // Display alert for incorrect username or password
      Alert.alert('Error', 'Invalid email or password. Please try again.');
    }
  };

  // Navigate to signup Page 
  const handleSignupNavigation = () => {
    navigation.navigate('Signup');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Your App Name</Text>
      <InputField
        style={styles.inputText}
        placeholder="Email"
        placeholderTextColor="#003f5c"
        onChangeText={(text) => setEmail(text)}
      />
      <InputField
        style={styles.inputText}
        placeholder="Password"
        placeholderTextColor="#003f5c"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />
      <Button onPress={handleSignIn} buttonText="Login" />
      <TextBtn onPress={handleSignupNavigation} buttonText="Register now" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50', // Darker background color
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#00b894', // Green color
    marginBottom: 40,
  },
});

export default LoginScreen;
