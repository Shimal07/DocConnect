import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { signOut } from "firebase/auth";
import { auth } from './../../firebase';
import { useNavigation } from '@react-navigation/native';

const AppointmentManagementScreen = () => {
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
    <View style={styles.container}>
      <Text>Appointment Management Screen</Text>
      <TouchableOpacity style={styles.signOutBtn} onPress={handleSignOut}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signOutBtn: {
    marginTop: 20,
    backgroundColor: '#e74c3c',
    borderRadius: 25,
    height: 50,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signOutText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default AppointmentManagementScreen;
