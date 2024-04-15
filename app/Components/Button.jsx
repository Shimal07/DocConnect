import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export const Button = ({ onPress, buttonText }) => (
    <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.text}>{buttonText}</Text>
    </TouchableOpacity>
);
export const TextBtn = ({ onPress, buttonText }) => (
    <TouchableOpacity onPress={onPress}>
        <Text style={styles.signupText}>{buttonText}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    button:{
        width: '80%',
        backgroundColor: '#00b894',
        borderRadius: 25,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 10,
    },
    text:{
        color: '#fff'
    },
    signupText: {
        color: '#00b894',
        marginTop: 10,
      },
});


