
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Address from '../components/address/Address';

const Stack = createNativeStackNavigator();

const AddressScreen = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Address" component={Address} />
    </Stack.Navigator>
  )
}

export default AddressScreen
