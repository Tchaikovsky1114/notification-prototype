import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Mail from '../components/mail/Mail';

const Stack = createNativeStackNavigator();

const MailScreen = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerTitleAlign:'center'
    }}>
      <Stack.Screen name='Mail' component={Mail} />
    </Stack.Navigator>
  )
}

export default MailScreen

const styles = StyleSheet.create({})