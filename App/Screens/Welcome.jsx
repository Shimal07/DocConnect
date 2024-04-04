import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Welcome = () => {
    const navigation = useNavigation();

    const handleLoginNavigation = () => {
        navigation.navigate('Login'); // Navigate to the Login screen
    }


    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/logo.png')}
                style={styles.loginImage}
            />
            <Image
                source={require('../../assets/welcome.png')}
                style={styles.WelcomeImg}
            />
            <View style={styles.subContainer}>
                <Text style={styles.title}>Discover Trusted <Text style={{ fontWeight: 'bold' }}>Healthcare Professionals</Text> for Your Health Needs</Text>
                
                <TouchableOpacity onPress={handleLoginNavigation} style={styles.button}>
                    <Text style={styles.buttonText}>Let's get  Started</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Welcome;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor:"white"
    },
    loginImage: {
        width: '100%',
        height: "20%",
        marginTop: '20%',
        marginBottom:-50
    },
    WelcomeImg:{
        width: '100%',
        height: "35%",
        marginTop: '3%',
    },
    subContainer: {
        backgroundColor: '#007260',
        height: '70%',
        width: '100%',
        marginTop: 50,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        color: '#ffffff',
        textAlign: 'center',
        paddingTop: 20,
    },
    button: {
        width:"80%",
        alignItems:'center',
        backgroundColor: '#fff',
        borderRadius: 99,
        paddingVertical: 20,
        paddingHorizontal: 20,
        marginTop: 20,
    },
    buttonText: {
        color: '#007260',
        fontSize: 20,
        fontWeight: 'bold',
    },
});
