import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const UserMG = () => {
  const [doctorName, setDoctorName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [doctors, setDoctors] = useState([]);

  const addDoctor = () => {
    // Add logic to add doctor
    console.log('Add doctor:', { name: doctorName, specialty: specialty });
    setDoctorName('');
    setSpecialty('');
  };

  const deleteDoctor = (id) => {
    // Add logic to delete doctor
    console.log('Delete doctor:', id);
  };

  const editDoctor = (id) => {
    // Add logic to edit doctor
    console.log('Edit doctor:', id);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Your App Name</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          value={doctorName}
          onChangeText={setDoctorName}
          placeholder="Enter Doctor's Name"
          placeholderTextColor="#003f5c"
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          value={specialty}
          onChangeText={setSpecialty}
          placeholder="Enter Doctor's Specialty"
          placeholderTextColor="#003f5c"
        />
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={addDoctor}>
        <Text style={styles.loginText}>ADD DOCTOR</Text>
      </TouchableOpacity>
      <View style={styles.doctorList}>
        <Text style={styles.heading}>Doctors List:</Text>
        {doctors.map((doctor, index) => (
          <View key={index} style={styles.doctorItem}>
            <Text style={styles.doctorName}>{doctor.name} - {doctor.specialty}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => deleteDoctor(doctor.id)} style={styles.deleteButton}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => editDoctor(doctor.id)} style={styles.editButton}>
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50', // Darker background color
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#00b894', // Green color
    marginBottom: 20,
  },
  inputView: {
    width: '80%',
    backgroundColor: '#f2f2f2', // Light gray background
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  inputText: {
    height: 50,
    color: '#003f5c', // Dark green color
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#00b894', // Green color
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  loginText: {
    color: '#fff', // White color
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff', // White color
    marginBottom: 10,
  },
  doctorList: {
    alignItems: 'center',
    width: '80%',
  },
  doctorItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 10,
  },
  doctorName: {
    color: '#003f5c', // Dark green color
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  deleteButton: {
    backgroundColor: '#e74c3c', // Red color
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginLeft: 10,
  },
  editButton: {
    backgroundColor: '#3498db', // Blue color
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginLeft: 10,
  },
  buttonText: {
    color: '#fff', // White color
  },
});

export default UserMG;
