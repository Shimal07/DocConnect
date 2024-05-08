
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from './../../firebase';


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // Redirect user based on role
        checkUserRole(user.uid);
      }
    });
    return unsubscribe;
  }, []); // Empty dependency array to ensure useEffect runs only once


  const checkUserRole = async (userId) => {
    try {
      const userDoc = await getDoc(doc(db, "users", userId));
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
            routes: [{ name: 'Main', params: { fullName: userData.fullName } }], // Navigate to the home page
          });
        }
      }
    } catch (error) {
      console.error("Failed to retrieve user data:", error);
      Alert.alert('Error', 'Failed to retrieve user data. Please try again.');
    }
  };

  const handleSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      checkUserRole(user.uid);
    } catch (error) {
      console.error("Sign-in failed:", error);

      let errorMessage = 'An error occurred during sign-in. Please try again.';
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        errorMessage = 'Invalid email or password. Please try again.';
      }
      Alert.alert('Error', errorMessage);

    }
  };

  // Navigate to signup Page 
  const handleSignupNavigation = () => {
    navigation.navigate('Signup');
  };

  return (
    <View style={styles.container}>

       <Image
        source={require('../../assets/logo.png')}
        style={styles.loginImage}
      />
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={handleSignIn}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSignupNavigation}>
        <Text style={styles.signupText}>Register now</Text>
      </TouchableOpacity>

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

  inputView: {
    width: '80%',
    backgroundColor: '#f2f2f2', // Light gray background
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  inputText: {
    height: 50,
    color: '#003f5c', // Dark green color
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#00b894', // Green color
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  loginText: {
    color: '#fff', 
  },
  signupText: {
    color: '#00b894', 
    marginTop: 10,
  },
  loginImage: {
    width: '100%',
    height: "20%",
    marginTop: '20%',
    marginBottom:50
},
});

export default LoginScreen;
