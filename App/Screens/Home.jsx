import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { auth } from '../../firebase'; 
import { useNavigation } from '@react-navigation/native';

const Home = () => {
    const navigation = useNavigation();

    const getEmail = () => {
        return auth.currentUser ? auth.currentUser.email : 'N/A';
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.welcomeText}>Welcome, {getEmail()}</Text>
            </View>
            <View style={styles.searchBar}>
                <View style={styles.searchContainer}>
                    <AntDesign name="search1" size={24} color="#777" style={styles.searchIcon} />
                    <TextInput
                        placeholder='Search for doctors and specialties...'
                        style={styles.searchInput}
                    />
                </View>
            </View>
            <ScrollView style={styles.scrollView}>
                <View style={styles.promotions}>
                    <ScrollView horizontal contentContainerStyle={styles.sliderContainer}>
                        <View style={styles.promotionItem}>
                            <Text style={styles.promotionText}>Promotion 1</Text>
                        </View>
                        <View style={styles.promotionItem}>
                            <Text style={styles.promotionText}>Promotion 2</Text>
                        </View>
                        <View style={styles.promotionItem}>
                            <Text style={styles.promotionText}>Promotion 3</Text>
                        </View>
                    </ScrollView>
                </View>
                <View style={styles.speciality}>
                    <View style={styles.buttonGrid}>
                        <TouchableOpacity style={styles.specialityButton}>
                            <Text style={styles.specialityButtonText}>Button 1</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.specialityButton}>
                            <Text style={styles.specialityButtonText}>Button 2</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.specialityButton}>
                            <Text style={styles.specialityButtonText}>Button 3</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.specialityButton}>
                            <Text style={styles.specialityButtonText}>Button 4</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        marginTop:"10%"
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    welcomeText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    searchBar: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#c0c0c0',
        borderRadius: 20,
        paddingHorizontal: 15,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#333333',
    },
    scrollView: {
        flex: 1,
    },
    promotions: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    sliderContainer: {
        paddingHorizontal: 10,
    },
    promotionItem: {
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginRight: 10,
    },
    promotionText: {
        fontSize: 16,
    },
    speciality: {
        padding: 20,
    },
    buttonGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    specialityButton: {
        backgroundColor: '#007AFF',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginBottom: 10,
        width: '48%',
    },
    specialityButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },

});

export default Home;
