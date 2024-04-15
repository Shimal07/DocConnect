import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const InputField = ({ placeholder, value, onChangeText, secureTextEntry }) => (
    <TextInput 
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        style={styles.input}
    />
);

const styles = StyleSheet.create({
    input:{
        width: '80%',
        backgroundColor: '#f2f2f2', // Light gray background
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
});

export default InputField;
