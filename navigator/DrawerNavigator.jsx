
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import NoticeScreen from '../screens/NoticeScreen';
import BottomNavigator from './BottomNavigator';
import MailScreen from '../screens/MailScreen';
import CalendarScreen from '../screens/CalendarScreen';
import WorksScreen from '../screens/WorksScreen';
import ReportScreen from '../screens/ReportScreen';
import AddressScreen from '../screens/AddressScreen';
import ReservationScreen from '../screens/ReservationScreen';
import SurvayScreen from '../screens/SurvayScreen';
import CommunityScreen from '../screens/CommunityScreen';
import DocumentManagementScreen from '../screens/DocumentManagementScreen';
import OrganizationChartScreen from '../screens/OrganizationChartScreen';
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator screenOptions={{headerTransparent:true,headerTitleStyle:{color:'#fff'}}}>
      <Drawer.Screen name="Main" component={BottomNavigator} options={{}} />
      <Drawer.Screen name="Mail" component={MailScreen} options={{}} />
      <Drawer.Screen name="Calendar" component={CalendarScreen} options={{}} />
      <Drawer.Screen name="Works" component={WorksScreen} options={{}} />
      <Drawer.Screen name="Report" component={ReportScreen} options={{}} />
      <Drawer.Screen name="Address" component={AddressScreen} options={{}} />
      <Drawer.Screen name="Reservation" component={ReservationScreen} options={{}} />
      <Drawer.Screen name="Survay" component={SurvayScreen} options={{}} />
      <Drawer.Screen name="Community" component={CommunityScreen} options={{}} />
      <Drawer.Screen name="DocumentManagement" component={DocumentManagementScreen} options={{}} />
      <Drawer.Screen name="OrganizationChart" component={OrganizationChartScreen} options={{}} />
      
    </Drawer.Navigator>
  )
}

export default DrawerNavigator

