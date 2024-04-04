import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Button = ({ onPress, buttonText }) => (
    <TouchableOpacity onPress={onPress} style={styles.loginButton}>
        <Text style={styles.buttonText}>{buttonText}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    loginButton:{
        backgroundColor: '#fff',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
        marginBottom: 10,
    },
    buttonText:{
        color: '#007260',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default Button;
