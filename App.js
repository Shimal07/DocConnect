import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './app/screens/Login';
import SignupScreen from './app/screens/SignUp';
import AppointmentBookingScreen from './app/screens/Appointment';
import ProfileScreen from './app/screens/Profile';
import HomeScreen from './app/screens/Home';
import AdminScreen from './app/screens/Admin';
import UserScreen from './app/screens/UserMG';
import BookingScreen from './app/screens/AppointmentManagement';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Main = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
        <Stack.Screen name="Admin" component={AdminScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AdminTabs" component={AdminTabs} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const MainTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Appointment" component={AppointmentBookingScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const AdminTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Usermg" component={UserScreen} />
      <Tab.Screen name="Booking" component={BookingScreen} />
    </Tab.Navigator>
  );
};
export default Main;
