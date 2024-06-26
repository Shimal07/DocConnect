import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { signOut } from "firebase/auth";
import { auth } from './../../firebase';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation(); // Get navigation object

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('User signed out');
        navigation.navigate('Login'); // Navigate to the Login screen directly
      })
      .catch((error) => {
        console.error('Sign-out failed:', error);
      });
  };

  return (
    <TouchableOpacity style={styles.signOutBtn} onPress={handleSignOut}>
      <Text style={styles.signOutText}>Sign Out</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  signOutBtn: {
    position: 'absolute',
    bottom: 20,
    width: '80%',
    backgroundColor: '#e74c3c', // Red color
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  signOutText: {
    color: '#fff', // White color
    fontSize: 16,
  },
});

export default ProfileScreen;
