import React, { useState } from 'react';
import { StyleSheet,View } from 'react-native';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from './../../firebase'; 
import { useNavigation } from '@react-navigation/native';
import InputField from '../components/InputField';
import Button from '../components/Button';
import AuthContainer from '../components/AuthContainer';

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
        <AuthContainer>
        <InputField 
                    placeholder='Full Name'
                    value={fullName}
                    onChangeText={text => setFullName(text)}
                    style={styles.input}
                />
                <InputField 
                    placeholder='Email'
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                    keyboardType='email-address'
                    autoCapitalize='none'
                    autoCorrect={false}
                />
                <InputField   
                    placeholder='Password'
                    value={password}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry
                    style={styles.input}
                />
                <InputField 
                    placeholder='Confirm Password'
                    value={confirmPassword}
                    onChangeText={text => setConfirmPassword(text)}
                    secureTextEntry
                    style={styles.input}
                />
                <View style={styles.btnCon}>
                    <Button onPress={handleSignUp} buttonText="Register"/>
                    <Button onPress={handleBack} buttonText="Back"/>
                </View>
        </AuthContainer>
       
    );
};

export default SignUp;

const styles = StyleSheet.create({
    btnCon:{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '80%',
    },
});
