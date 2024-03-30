import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { auth } from '../../firebase'; // Import Firebase authentication object
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
    const navigation = useNavigation();

    const handleSignOut = () => {
        auth.signOut()
            .then(() => {
                navigation.navigate('Login');
                console.log('User signed out successfully');
            })
            .catch((error) => {
                console.error('Sign-out failed:', error);
            });
    }

    return (
        <View style={styles.container}>
            <View style={styles.profileHeader}>
                <Image
                    source={require('../../assets/logo.png')}
                    style={styles.profileImage}
                />
                <Text style={styles.title}>Test</Text>
                <Text style={styles.subtitle}>test@gmail.com</Text>
            </View>
            <View style={styles.profileDetails}>
                <TouchableOpacity style={styles.detailItem}>
                    <Text style={styles.detailText}>Edit Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.detailItem}>
                    <Text style={styles.detailText}>Change Password</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.detailItem}>
                    <Text style={styles.detailText}>Privacy Settings</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.detailItem} onPress={handleSignOut}>
                    <Text style={styles.detailText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    profileHeader: {
      alignItems: 'center',
      marginBottom: 20,
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 10,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    subtitle: {
      fontSize: 16,
      color: '#888',
    },
    profileDetails: {
        marginTop: 20,
    },
    detailItem: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    detailText: {
        fontSize: 18,
    },
});

export default Profile;
