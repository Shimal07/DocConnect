import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Modal, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { db, collection, getDocs, onSnapshot } from './../../firebase';
import addData from '../Util/addData';
import deleteData from '../Util/deleteData';
import updateData from '../Util/updateData';
import { Picker } from '@react-native-picker/picker';

// An array of specialty suggestions
const specialtySuggestions = [
  'Cardiology',
  'Dermatology',
  'Neurology',
  'Orthopedics',
  'Pediatrics',
  'Dentistry',
];

// An array of days of the week
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Functional component for managing user interface and functionality related to doctors
const UserMG = () => {
  // State variables using useState hook
  const [doctorName, setDoctorName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  // useEffect hook to fetch the list of doctors from Firestore database
  useEffect(() => {
    const unsubscribeSnapshot = onSnapshot(collection(db, 'doctors'), (snapshot) => {
      const updatedDoctors = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDoctors(updatedDoctors);
    });

    return () => {
      unsubscribeSnapshot();
    };
  }, []); // Fetch doctor list on component mount

  // Function to add a new doctor to the database
  const addDoctor = async () => {
    try {
      if (!doctorName.trim() || !specialty.trim() || !selectedDay.trim()) {
        console.log('Doctor name, specialty, and day cannot be empty');
        return;
      }
      // Add "Dr." in front of the doctor's name
      const formattedDoctorName = `Dr. ${doctorName}`;
      await addData('doctors', { name: formattedDoctorName, specialty: specialty, day: selectedDay });
      setDoctorName('');
      setSpecialty('');
      setSelectedDay('');
    } catch (error) {
      console.error('Error adding doctor:', error);
    }
  };

  // Function to delete a doctor from the database
  const deleteDoctor = async (id) => {
    try {
      await deleteData('doctors', id);
    } catch (error) {
      console.error('Error deleting doctor:', error);
    }
  };

  // Function to update details of a doctor in the database
  const editDoctor = async () => {
    try {
      if (!selectedDoctor || !selectedDoctor.id) {
        console.error('Invalid doctor selected for editing');
        return;
      }
      await updateData('doctors', selectedDoctor.id, { name: doctorName, specialty: specialty, day: selectedDay });
      console.log('Doctor updated successfully:', selectedDoctor.id);
      setModalVisible(false);
    } catch (error) {
      console.error('Error editing doctor:', error);
    }
  };

  // Function to open the modal for editing a doctor
  const openEditModal = (doctor) => {
    setSelectedDoctor(doctor);
    setDoctorName(doctor.name);
    setSpecialty(doctor.specialty);
    setSelectedDay(doctor.day);
    setModalVisible(true);
  };

  // Function to refresh the list of doctors from the database
  const refreshDoctorList = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "doctors"));
      const updatedDoctors = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDoctors(updatedDoctors);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  // JSX code for the UI components
  return (
    <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
      <View style={styles.container}>
        {/* Top Section: Add Doctor */}
        <Text style={styles.head}>Admin Panel</Text>
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
            <Picker
              selectedValue={specialty}
              onValueChange={(itemValue) => setSpecialty(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Select Specialty" value="" />
              {specialtySuggestions.map((item, index) => (
                <Picker.Item key={index} label={item} value={item} />
              ))}
            </Picker>
          </View>
          <View style={styles.inputView}>
            <Picker
              selectedValue={selectedDay}
              onValueChange={(itemValue) => setSelectedDay(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Select Day" value="" />
              {daysOfWeek.map((day, index) => (
                <Picker.Item key={index} label={day} value={day} />
              ))}
            </Picker>
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
                <View style={styles.doctorInfo}>
                  <Text style={styles.doctorName}>{item.name}</Text>
                  <Text style={styles.doctorDetail}>{item.specialty} - {item.day}</Text>
                </View>
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
              <Picker
                selectedValue={specialty}
                onValueChange={(itemValue) => setSpecialty(itemValue)}
                style={styles.modalPicker}
              >
                <Picker.Item label="Select Specialty" value="" />
                {specialtySuggestions.map((item, index) => (
                  <Picker.Item key={index} label={item} value={item} />
                ))}
              </Picker>
              <Picker
                selectedValue={selectedDay}
                onValueChange={(itemValue) => setSelectedDay(itemValue)}
                style={styles.modalPicker}
              >
                <Picker.Item label="Select Day" value="" />
                {daysOfWeek.map((day, index) => (
                  <Picker.Item key={index} label={day} value={day} />
                ))}
              </Picker>
              <TouchableOpacity style={styles.modalButton} onPress={editDoctor}>
                <Text style={styles.buttonText}>SAVE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50', 
  },
  head:{
    fontSize: 35, 
    fontWeight: 'bold',
    color: '#fff', 
    textAlign: 'center', 
    marginTop: "20%", 
    marginBottom:"10%"
  },
  section: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    marginBottom: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff', 
    marginBottom: 10,
  },
  inputView: {
    backgroundColor: '#f2f2f2', 
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  inputText: {
    height: 50,
    color: '#003f5c', 
  },
  addButton: {
    backgroundColor: '#00b894', 
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
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    color: '#003f5c', 
    fontSize: 16,
  },
  doctorDetail: {
    color: '#555',
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  deleteButton: {
    backgroundColor: '#e74c3c', 
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginLeft: 10,
  },
  editButton: {
    backgroundColor: '#3498db',
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
    height: 50,
    color: '#003f5c', 
    backgroundColor: '#f2f2f2', 
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  modalPicker: {
    height: 50,
    color: '#003f5c', 
    backgroundColor: '#f2f2f2', 
    borderRadius: 25,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#00b894',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default UserMG;
