import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from './../../firebase'; 
import InputField from '../Components/InputField';
import { Button, TextBtn } from '../Components/Button';

const SignupScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    // Email format validation using regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }

    if (password !== confirmPassword) {
      console.error('Passwords do not match');
      Alert.alert('Error', 'Passwords do not match. Please make sure your passwords match.');
      // Clear password fields
      setPassword('');
      setConfirmPassword('');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        console.log('User registered:', user.uid);

        // Create a new document in Firestore for the user
        await setDoc(doc(db, "users", user.uid), {
          fullName: fullName,
          email: email,
          isAdmin: false // Set isAdmin to default value (false)
        });

        navigation.navigate('Login');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Sign-up failed:', errorCode, errorMessage);
      });
  };

  const goToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Register</Text>
      <InputField
        style={styles.inputText}
        placeholder="Full Name"
        placeholderTextColor="#003f5c"
        onChangeText={(text) => setFullName(text)}
      />
      <InputField
        style={styles.inputText}
        placeholder="Email"
        placeholderTextColor="#003f5c"
        onChangeText={(text) => setEmail(text)}
      />
      <InputField
        secureTextEntry
        style={styles.inputText}
        placeholder="Password"
        placeholderTextColor="#003f5c"
        onChangeText={(text) => setPassword(text)}
      />
      <InputField
        secureTextEntry
        style={styles.inputText}
        placeholder="Confirm Password"
        placeholderTextColor="#003f5c"
        onChangeText={(text) => setConfirmPassword(text)}
      />
      <Button onPress={handleSignUp} buttonText="SIGN UP" />
      <TextBtn onPress={goToLogin} buttonText="Already have an account? Login" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#00b894', 
    marginBottom: 40,
  },
});

export default SignupScreen;
