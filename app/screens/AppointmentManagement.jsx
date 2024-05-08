import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { signOut } from "firebase/auth";
import { auth } from './../../firebase';
import { useNavigation } from '@react-navigation/native';
import { db, collection, onSnapshot, deleteDoc, doc } from './../../firebase';
import AppointmentModal from '../Util/appointmentModal';

const AppointmentManagementScreen = () => {
  const navigation = useNavigation(); 

  const [appointments, setAppointments] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const unsubscribeSnapshot = onSnapshot(collection(db, 'appointments'), (snapshot) => {
      const updatedAppointments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAppointments(updatedAppointments);
    });

    return () => {
      unsubscribeSnapshot();
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log('User signed out');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Sign-out failed:', error);
    }
  };

  const handleDeleteAppointment = async (appointmentId) => {
    try {
      await deleteDoc(doc(db, 'appointments', appointmentId));
      Alert.alert('Success', 'Appointment deleted successfully');
    } catch (error) {
      console.error('Error deleting appointment:', error);
      Alert.alert('Error', 'Failed to delete appointment');
    }
  };

  const groupAppointmentsByDoctorDateAndTimeSlot = (appointments) => {
    return appointments.reduce((groups, appointment) => {
      const { doctor, date, timeSlot } = appointment;
      groups[doctor] = groups[doctor] || {};
      groups[doctor][date] = groups[doctor][date] || {};
      groups[doctor][date][timeSlot] = groups[doctor][date][timeSlot] || [];
      groups[doctor][date][timeSlot].push(appointment);
      return groups;
    }, {});
  };

  const formattedAppointments = groupAppointmentsByDoctorDateAndTimeSlot(appointments);

  const trimDate = (date) => date.substring(0, 10);

  const handleDoctorPress = (doctor) => {
    setSelectedDoctor(doctor);
    setSelectedDate(null);
    setSelectedTimeSlot(null);
  };

  const handleDatePress = (date) => {
    setSelectedDate(date);
    setSelectedTimeSlot(null);
  };

  const handleTimeSlotPress = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
    setModalVisible(!!formattedAppointments[selectedDoctor]?.[selectedDate]?.[timeSlot]?.length);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.appointmentsSection}>
          <Text style={styles.heading}>Appointments List:</Text>
          {Object.entries(formattedAppointments).map(([doctor, doctorData]) => (
            <View key={doctor} style={styles.doctorContainer}>
              <TouchableOpacity onPress={() => handleDoctorPress(doctor)}>
                <Text style={styles.doctorName}>{doctor}</Text>
              </TouchableOpacity>
              {selectedDoctor === doctor && (
                <>
                  {Object.entries(doctorData).map(([date, dateData]) => (
                    <View key={date} style={styles.dateContainer}>
                      <TouchableOpacity onPress={() => handleDatePress(date)}>
                        <Text style={styles.date}>{trimDate(date)}</Text>
                      </TouchableOpacity>
                      {selectedDate === date && (
                        <>
                          {Object.entries(dateData).map(([timeSlot, appointments]) => (
                            <View key={timeSlot} style={styles.timeSlotContainer}>
                              <View style={styles.timeSlotWrapper}>
                                {appointments.length > 0 && (
                                  <TouchableOpacity onPress={() => handleTimeSlotPress(timeSlot)}>
                                    <Text style={styles.timeSlot}>{timeSlot}</Text>
                                  </TouchableOpacity>
                                )}
                                {selectedTimeSlot === timeSlot && (
                                  <View style={styles.appointmentList}>
                                    {appointments.map(appointment => (
                                      <View key={appointment.id} style={styles.appointmentContainer}>
                                        <Text style={styles.appointmentInfo}>{appointment.details}</Text>
                                        <TouchableOpacity onPress={() => handleDeleteAppointment(appointment.id)} style={styles.deleteAppointmentButton}>
                                          <Text style={styles.deleteAppointmentButtonText}>Delete</Text>
                                        </TouchableOpacity>
                                      </View>
                                    ))}
                                  </View>
                                )}
                              </View>
                            </View>
                          ))}
                        </>
                      )}
                    </View>
                  ))}
                </>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.signOutBtn} onPress={handleSignOut}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
      <AppointmentModal 
        isVisible={modalVisible} 
        appointments={formattedAppointments[selectedDoctor]?.[selectedDate]?.[selectedTimeSlot] || []} 
        onClose={() => setModalVisible(false)} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  appointmentsSection: {
    marginTop: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  doctorContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  dateContainer: {
    marginBottom: 10,
  },
  date: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  timeSlotContainer: {
    marginBottom: 5,
  },
  timeSlotWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeSlot: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  appointmentList: {
    paddingLeft: 20,
  },
  appointmentContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  appointmentInfo: {
    fontSize: 16,
  },
  deleteAppointmentButton: {
    backgroundColor: '#e74c3c',
    borderRadius: 5,
    padding: 5,
  },
  deleteAppointmentButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  signOutBtn: {
    marginTop: 20,
    marginBottom: 5,
    backgroundColor: '#e74c3c',
    borderRadius: 25,
    height: 50,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  signOutText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default AppointmentManagementScreen;
