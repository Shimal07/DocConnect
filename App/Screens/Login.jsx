import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './../../firebase';
import { useNavigation } from '@react-navigation/native';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('User signed in:', user.uid);
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Main' }],
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error('Sign-in failed:', errorCode, errorMessage);
            });
    }

    const handleSignUp = () => {
        navigation.navigate('Register');
    }

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView style={styles.formContainer} behavior='padding'>
                <View style={styles.inputContainer}>
                    <TextInput 
                        placeholder='Email'
                        value={email}
                        onChangeText={text => setEmail(text)}
                        style={styles.input}
                    />
                    <TextInput 
                        placeholder='Password'
                        value={password}
                        onChangeText={text => setPassword(text)}
                        secureTextEntry
                        style={styles.input}
                    />
                </View>
                <TouchableOpacity onPress={handleSignIn} style={styles.loginButton}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <Text style={styles.signUpText}>
                    Don't have an account? 
                    <Text style={styles.signUpLink} onPress={handleSignUp}> Sign up</Text>
                </Text>
            </KeyboardAvoidingView>
        </View>
    );
};

export default SignIn;

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: '#007260', // Solid background color
    },
    formContainer: {
        width: '80%',
        alignItems: 'center',
    },
    inputContainer:{
        width: '100%',
        marginBottom: 20,
    },
    input:{
        backgroundColor:'#fff',
        marginBottom: 10,
        padding: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        width: '100%',
        fontSize: 16,
    },
    loginButton:{
        backgroundColor: '#fff',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
        marginBottom: 10,
    },
    signUpText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
    signUpLink: {
        fontWeight:'800',
        color:"#222"
    },
    buttonText:{
        color: '#007260',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
