import React from 'react';
import { View, KeyboardAvoidingView, StyleSheet } from 'react-native';

const AuthContainer = ({ children }) => (
    <View style={styles.container}>
        <KeyboardAvoidingView style={styles.formContainer} behavior='padding'>
            {children}
        </KeyboardAvoidingView>
    </View>
);

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: '#007260', 
    },
    formContainer: {
        width: '80%',
        alignItems: 'center',
    },
});

export default AuthContainer;
