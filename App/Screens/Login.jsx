import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './../../firebase';
import { useNavigation } from '@react-navigation/native';
import InputField from '../components/InputField';
import Button from '../components/Button';
import AuthContainer from '../components/AuthContainer';

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
        <AuthContainer>
            <InputField 
                        placeholder='Email'
                        value={email}
                        onChangeText={text => setEmail(text)}
                    />
                    <InputField 
                        placeholder='Password'
                        value={password}
                        onChangeText={text => setPassword(text)}
                        secureTextEntry
                    />
                    <Button onPress={handleSignIn} buttonText="Login"/>
                <Text style={styles.signUpText}>
                    Don't have an account? 
                    <Text style={styles.signUpLink} onPress={handleSignUp}> Sign up</Text>
                </Text>
        </AuthContainer>
    );
};

export default SignIn;

const styles = StyleSheet.create({
    signUpText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
    signUpLink: {
        fontWeight:'800',
        color:"#222"
    },
});
