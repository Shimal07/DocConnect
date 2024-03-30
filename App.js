import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo,MaterialIcons } from '@expo/vector-icons';

import Home from './App/Screens/Home';
import Login from './App/Screens/Login';
import Register from './App/Screens/Register';
import Welcome from './App/Screens/Welcome';
import Appointment from './App/Screens/Appointment';
import Profile from './App/Screens/Profile';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={Welcome} options={{headerShown:false}}/>
        <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
        <Stack.Screen name="Register" component={Register} options={{headerShown:false}}/>
        <Stack.Screen name='Main' component={MainTabs} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const screenOptions ={
  tabBarShowLabel:false,
  headerShown:false,
  tabBarStyle:{
   position:'absolute',
   bottom:0,
   right:0,
   left:0,
   elevation:0,
   height:60,
   background:"#007260"
  }
  
}
function MainTabs() {
 return (
   <Tab.Navigator screenOptions={screenOptions}>
     <Tab.Screen name="Home" component={Home} options={{
       tabBarIcon:({focused})=>{
         return(
           <View style={{alignItems:'center',justifyContent:'center'}}>
             <Entypo name="home" size={24} color={focused ? "#007260":"#111"} />
             <Text style={{fontSize:12,color:"black"}}>HOME</Text>
           </View>
         )
       }
     }
     }/>
     <Tab.Screen name="Appointment" component={Appointment} options={{
       tabBarIcon:({focused})=>{
         return(
           <View style={{alignItems:'center',justifyContent:'center'}}>
             <Entypo name="calendar" size={24} color={focused ? "#007260":"#111"} />
             <Text style={{fontSize:12,color:"black"}}>Appointment</Text>
           </View>
         )
       }
     }
     } />
     <Tab.Screen name="Profile" component={Profile} options={{
       tabBarIcon:({focused})=>{
         return(
           <View style={{alignItems:'center',justifyContent:'center'}}>
             <MaterialIcons name="account-box" size={24} color={focused ? "#007260":"#111"} />
             <Text style={{fontSize:12,color:"black"}}>Profile</Text>
           </View>
         )
       }
     }
     }/>
   </Tab.Navigator>
 );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
