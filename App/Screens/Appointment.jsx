import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const Appointment = () => {
  const handleAppointmentClick = (appointmentId) => {
    console.log("Clicked on appointment:", appointmentId);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Appointments</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        {/* List of appointments */}
        <TouchableOpacity onPress={() => handleAppointmentClick(1)} style={styles.appointmentItem}>
          <Text style={styles.appointmentText}>Appointment 1</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleAppointmentClick(2)} style={styles.appointmentItem}>
          <Text style={styles.appointmentText}>Appointment 2</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleAppointmentClick(3)} style={styles.appointmentItem}>
          <Text style={styles.appointmentText}>Appointment 3</Text>
        </TouchableOpacity>
      </ScrollView>
      <TouchableOpacity style={styles.addButton}>
        <AntDesign name="plus" size={24} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop:"10%"
  },
  header: {
    backgroundColor: '#007AFF',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  appointmentItem: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 10,
  },
  appointmentText: {
    fontSize: 16,
  },
  addButton: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    backgroundColor: '#007AFF',
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Appointment;
