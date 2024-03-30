import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from './../../firebase'; // Import Firebase authentication object
import { useNavigation } from '@react-navigation/native';

const SignUp = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigation = useNavigation();

    const handleSignUp = () => {
        if (password !== confirmPassword) {
            console.error('Passwords do not match');
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('User registered:', user.uid);
                navigation.navigate('Home');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error('Sign-up failed:', errorCode, errorMessage);
            });
    }

    const handleBack = () => {
        navigation.navigate('Welcome');
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior='padding'>
            <View style={styles.inputContainer}>
                <TextInput 
                    placeholder='Full Name'
                    value={fullName}
                    onChangeText={text => setFullName(text)}
                    style={styles.input}
                />
                <TextInput 
                    placeholder='Email'
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                    keyboardType='email-address'
                    autoCapitalize='none'
                    autoCorrect={false}
                />
                <TextInput 
                    placeholder='Password'
                    value={password}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry
                    style={styles.input}
                />
                <TextInput 
                    placeholder='Confirm Password'
                    value={confirmPassword}
                    onChangeText={text => setConfirmPassword(text)}
                    secureTextEntry
                    style={styles.input}
                />
            </View>
            <View style={styles.btnCon}>
                <TouchableOpacity onPress={handleSignUp} style={styles.registerButton}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                    <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

export default SignUp;

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: '#007260', // Solid background color
    },
    inputContainer:{
        width:'80%',
        marginBottom: 20,
    },
    input:{
        backgroundColor:'#fff',
        marginBottom: 10,
        padding: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        fontSize: 16,
    },
    btnCon:{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '80%',
    },
    registerButton:{
        backgroundColor: '#fff',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
    },
    backButton:{
        backgroundColor: '#ccc',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
    },
    buttonText:{
        color: '#007260',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
