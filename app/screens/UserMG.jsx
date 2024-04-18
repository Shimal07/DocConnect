import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Modal, StyleSheet } from 'react-native';
import { db, collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from './../../firebase';
import addData from '../Util/addData';
import deleteData from '../Util/deleteData';
import updateData from '../Util/updateData';
const UserMG = () => {
  const [doctorName, setDoctorName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    refreshDoctorList();
  }, []); // Fetch doctor list on component mount

  //Add Doctors Function
  const addDoctor = async () => {
    try {
      if (!doctorName.trim() || !specialty.trim()) {
        console.log('Doctor name and specialty cannot be empty');
        return;
      }
      await addData('doctors', { name: doctorName, specialty: specialty }, refreshDoctorList);
      setDoctorName('');
      setSpecialty('');
    } catch (error) {
      console.error('Error adding doctor:', error);
    }
  };
  //Delete Doctors Function
  const deleteDoctor = async (id) => {
    try {
      // Call the deleteData function to delete the doctor
      await deleteData('doctors', id, refreshDoctorList);
    } catch (error) {
      console.error('Error deleting doctor:', error);
    }
  };

  const editDoctor = async () => {
    try {
      if (!selectedDoctor || !selectedDoctor.id) {
        console.error('Invalid doctor selected for editing');
        return;
      }

      // Call the updateData function to update the doctor
      await updateData('doctors', selectedDoctor.id, { name: doctorName, specialty: specialty }, refreshDoctorList);

      console.log('Doctor updated successfully:', selectedDoctor.id);

      // Close the modal
      setModalVisible(false);

      // Refresh the doctor list
      refreshDoctorList();
    } catch (error) {
      console.error('Error editing doctor:', error);
    }
  };

  const refreshDoctorList = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "doctors"));
      const updatedDoctors = [];
      querySnapshot.forEach((doc) => {
        updatedDoctors.push({ id: doc.id, ...doc.data() });
      });
      setDoctors(updatedDoctors);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const openEditModal = (doctor) => {
    setSelectedDoctor(doctor);
    setDoctorName(doctor.name);
    setSpecialty(doctor.specialty);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {/* Top Section: Add Doctor */}
      <View style={styles.section}>
        <Text style={styles.heading}>Add Doctor</Text>
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
        <TouchableOpacity style={styles.addButton} onPress={addDoctor}>
          <Text style={styles.buttonText}>ADD DOCTOR</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Section: List of Doctors */}
      <View style={[styles.section, { flex: 1 }]}>
        <Text style={styles.heading}>Doctors List:</Text>
        <FlatList
          data={doctors}
          renderItem={({ item }) => (
            <View style={styles.doctorItem}>
              <Text style={styles.doctorName}>{item.name} - {item.specialty}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => deleteDoctor(item.id)} style={styles.deleteButton}>
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => openEditModal(item)} style={styles.editButton}>
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
          style={styles.doctorList}
        />
      </View>

      {/* Edit Doctor Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeading}>Edit Doctor</Text>
            <TextInput
              style={styles.modalInput}
              value={doctorName}
              onChangeText={setDoctorName}
              placeholder="Enter Doctor's Name"
              placeholderTextColor="#003f5c"
            />
            <TextInput
              style={styles.modalInput}
              value={specialty}
              onChangeText={setSpecialty}
              placeholder="Enter Doctor's Specialty"
              placeholderTextColor="#003f5c"
            />
            <TouchableOpacity style={styles.modalButton} onPress={editDoctor}>
              <Text style={styles.buttonText}>SAVE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50', // Darker background color
  },
  section: {
    paddingHorizontal: 20,
    paddingTop: "20%",
    paddingBottom: 10,
    marginBottom: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff', // White color
    marginBottom: 10,
  },
  inputView: {
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
  addButton: {
    backgroundColor: '#00b894', // Green color
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  doctorList: {
    width: '100%',
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  modalHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalInput: {
    backgroundColor: '#f2f2f2',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  modalButton: {
    backgroundColor: '#00b894',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default UserMG;
