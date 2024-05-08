// AppointmentModal.js
import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';

const AppointmentModal = ({ isVisible, appointments, onClose }) => {
  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Appointments</Text>
          {appointments.map(appointment => (
            <View key={appointment.id} style={styles.appointmentItem}>
              <Text style={styles.appointmentText}>{appointment.doctor}</Text>
              <Text style={styles.appointmentText}>{appointment.timeSlot}</Text>
              <Text style={styles.appointmentText}>{appointment.userFullName}</Text>
            </View>
          ))}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  appointmentItem: {
    marginBottom: 10,
  },
  appointmentText: {
    fontSize: 16,
    marginBottom: 5,
  },
  closeButton: {
    backgroundColor: '#e74c3c',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default AppointmentModal;
