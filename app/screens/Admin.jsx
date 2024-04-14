import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { signOut } from "firebase/auth";
import { auth } from './../../firebase';

const Admin = ({ navigation }) => {
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('User signed out');
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }], // Navigate to the login page
        });
      })
      .catch((error) => {
        console.error('Sign-out failed:', error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Admin Page</Text>
      <TouchableOpacity style={styles.signOutBtn} onPress={handleSignOut}>
        <Text style={styles.signOutText}>Sign Out</Text>
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
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff', // White color
    marginBottom: 20,
  },
  signOutBtn: {
    width: '80%',
    backgroundColor: '#e74c3c', // Red color
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signOutText: {
    color: '#fff', // White color
    fontSize: 16,
  },
});

export default Admin;
