import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './app/screens/Login';
import SignupScreen from './app/screens/SignUp';
import AppointmentBookingScreen from './app/screens/Appointment';
import ProfileScreen from './app/screens/Profile';
import AdminScreen from './app/screens/Admin';
import UserScreen from './app/screens/UserMG';
import BookingScreen from './app/screens/AppointmentManagement';
import { Entypo } from '@expo/vector-icons';
import { View } from 'react-native';

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

const screenOptions ={
  tabBarShowLabel:false,
  headerShown:false,
  tabBarStyle:{
   position:'relative',

   height:"10%",
   backgroundColor:"#007260"
  }
}

const renderTabIcon = (iconName, focused) => (
  <View style={{ alignItems: 'center', justifyContent: 'center' }}>

    {iconName === 'appointment' && <Entypo name="book" size={24} color={focused ? "#fff" : "black"} />}
    {iconName === 'profile' && <Entypo name="user" size={24} color={focused ? "#fff" : "black"} />}
    {iconName === 'users' && <Entypo name="users" size={24} color={focused ? "#fff" : "black"} />}
  </View>
);

const MainTabs = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>

      {/* <Tab.Screen name="Home" component={HomeScreen}  options={{ headerShown: false, tabBarIcon: ({ focused }) => renderTabIcon('home', focused) }}/> */}

      <Tab.Screen name="Appointment" component={AppointmentBookingScreen} options={{ headerShown: false, tabBarIcon: ({ focused }) => renderTabIcon('appointment', focused) }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false, tabBarIcon: ({ focused }) => renderTabIcon('profile', focused) }}/>
    </Tab.Navigator>
  );
};

const AdminTabs = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>

      <Tab.Screen name="Usermg" component={UserScreen}  options={{ headerShown: false, tabBarIcon: ({ focused }) => renderTabIcon('users', focused) }}/>

      <Tab.Screen name="Booking" component={BookingScreen} options={{ headerShown: false, tabBarIcon: ({ focused }) => renderTabIcon('appointment', focused) }}/>
    </Tab.Navigator>
  );
};

export default Main;
