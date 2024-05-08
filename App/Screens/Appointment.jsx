import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { db, collection, addDoc, onSnapshot, doc, getDoc } from './../../firebase'; // Import deleteDoc
import { Picker } from '@react-native-picker/picker';
import { auth } from './../../firebase';
import deleteData from './../Util/deleteData';

const Appointment = () => {
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [appointmentDate, setAppointmentDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [userFullName, setUserFullName] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [appointmentsCount, setAppointmentsCount] = useState({});

  useEffect(() => {
    const unsubscribeSnapshot = onSnapshot(collection(db, 'appointments'), (snapshot) => {
      const updatedAppointments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      updatedAppointments.sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort appointments by date in descending order
      setAppointments(updatedAppointments);
      updateAppointmentsCount(updatedAppointments);
    });

    const currentUser = auth.currentUser;
    if (currentUser) {
      fetchUserFullName(currentUser.uid);
    }

    return () => {
      unsubscribeSnapshot();
    };
  }, []);

  useEffect(() => {
    const unsubscribeSnapshot = onSnapshot(collection(db, 'doctors'), (snapshot) => {
      const updatedDoctors = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDoctors(updatedDoctors);
    });

    return () => {
      unsubscribeSnapshot();
    };
  }, []);

  const updateAppointmentsCount = (appointments) => {
    const count = {};
    appointments.forEach(appointment => {
      const key = `${appointment.doctor}-${appointment.timeSlot}`;
      count[key] = count[key] ? count[key] + 1 : 1;
    });
    setAppointmentsCount(count);
  };

  const fetchUserFullName = async (userId) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUserFullName(userData.fullName);
      } else {
        console.log('User document does not exist');
      }
    } catch (error) {
      console.error('Error fetching user full name:', error);
    }
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || appointmentDate;
    setShowDatePicker(false);
    setAppointmentDate(currentDate);
  };

  const handleConfirmAppointment = async () => {
    try {
      if (!selectedDoctor.trim() || !selectedTimeSlot.trim()) {
        console.log('Doctor and time slot must be selected');
        return;
      }

      const key = `${selectedDoctor}-${selectedTimeSlot}`;
      const appointmentsCountForSlot = appointmentsCount[key] || 0;

      const maxAppointmentsPerTimeSlot = 10;

      if (appointmentsCountForSlot >= maxAppointmentsPerTimeSlot) {
        console.log('The selected time slot is fully booked');
        return;
      }

      const appointmentData = {
        userFullName: userFullName,
        doctor: selectedDoctor,
        timeSlot: selectedTimeSlot,
        date: appointmentDate.toISOString(),
        appointmentNumber: appointmentsCountForSlot + 1,
      };

      const docRef = await addDoc(collection(db, 'appointments'), appointmentData);
      console.log('Appointment added successfully with ID:', docRef.id);
    } catch (error) {
      console.error('Error adding appointment:', error);
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    deleteData('appointments', appointmentId, fetchAppointments);
  };

  const fetchAppointments = () => {
    // Fetch appointments again after deleting an appointment
    onSnapshot(collection(db, 'appointments'), (snapshot) => {
      const updatedAppointments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      updatedAppointments.sort((a, b) => new Date(b.date) - new Date(a.date)); 
      setAppointments(updatedAppointments);
      updateAppointmentsCount(updatedAppointments);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Schedule Appointment</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Select Doctor:</Text>
        <Picker
          style={styles.input}
          selectedValue={selectedDoctor}
          onValueChange={(itemValue) => setSelectedDoctor(itemValue)}
        >
          <Picker.Item label="Select Doctor" value="" />
          {doctors.map((doctor) => (
            <Picker.Item key={doctor.id} label={doctor.name} value={doctor.name} />
          ))}
        </Picker>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Select Date:</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePickerButton}>
          <Text style={styles.datePickerText}>{appointmentDate.toDateString()}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={appointmentDate}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={handleDateChange}
          />
        )}
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Select Time Slot:</Text>
        <View style={styles.timeSlotButtonsContainer}>
          <TouchableOpacity
            style={[
              styles.timeSlotButton,
              selectedTimeSlot === '8:00 AM' && styles.selectedTimeSlotButton
            ]}
            onPress={() => setSelectedTimeSlot('8:00 AM')}
          >
            <Text style={styles.timeSlotButtonText}>8:00 AM</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.timeSlotButton,
              selectedTimeSlot === '1:00 PM' && styles.selectedTimeSlotButton
            ]}
            onPress={() => setSelectedTimeSlot('1:00 PM')}
          >
            <Text style={styles.timeSlotButtonText}>1:00 PM</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.timeSlotButton,
              selectedTimeSlot === '5:00 PM' && styles.selectedTimeSlotButton
            ]}
            onPress={() => setSelectedTimeSlot('5:00 PM')}
          >
            <Text style={styles.timeSlotButtonText}>5:00 PM</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={handleConfirmAppointment} style={styles.confirmButton}>
        <Text style={styles.confirmButtonText}>Confirm Appointment</Text>
      </TouchableOpacity>
      <View style={styles.flatListContainer}>
        <Text style={styles.heading}>Appointments List:</Text>
        <FlatList
          data={appointments.filter(appointment => appointment.userFullName === userFullName)}
          renderItem={({ item }) => (
            <View style={styles.appointmentItem}>
              <View style={styles.appointmentDetails}>
                <View>
                  <Text style={styles.appointmentText}>Appointment Number: {item.appointmentNumber}</Text>
                  <Text style={styles.appointmentText}>Doctor: {item.doctor}</Text>
                  <Text style={styles.appointmentText}>Date: {new Date(item.date).toLocaleDateString()}</Text>
                  <Text style={styles.appointmentText}>Time: {item.timeSlot}</Text>
                </View>
                <TouchableOpacity onPress={() => handleCancelAppointment(item.id)} style={styles.cancelButton}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50',
    padding: 20,
  },
  heading: {
    marginTop:'10%',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 5,
  },
  datePickerButton: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 5,
  },
  datePickerText: {
    fontSize: 16,
  },
  timeSlotButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  timeSlotButton: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 5,
    width: '30%',
    alignItems: 'center',
  },
  selectedTimeSlotButton: {
    backgroundColor: '#2ecc71',
  },
  timeSlotButtonText: {
    fontSize: 16,
  },
  confirmButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  confirmButtonText: {
    fontSize: 18,
    color: '#ffffff',
  },
  appointmentItem: {
    backgroundColor: '#ecf0f1',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
  },
  appointmentDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  appointmentText: {
    fontSize: 16,
    marginBottom: 5,
  },
  cancelButton: {
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 5,
  },
  cancelButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  flatListContainer: {
    flex: 1,
  },
});

export default Appointment;
