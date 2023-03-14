import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AnnualLeave from '../components/annual-leave/AnnualLeave'

const Stack = createNativeStackNavigator()

const AnnualLeaveScreen = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="AnnualLeaveDashBoard" component={AnnualLeave} />
    </Stack.Navigator>
  )
}

export default AnnualLeaveScreen