import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Report from '../components/report/Report';

const Stack = createNativeStackNavigator();

const ReportScreen = () => {
  
  return ( 
    
    
    <Stack.Navigator screenOptions={{headerShown:false}}>
       <Stack.Screen name="ReportList" component={Report} />
    </Stack.Navigator>
  )
}

export default ReportScreen

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#000'
  }
})