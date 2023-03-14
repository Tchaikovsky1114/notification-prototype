import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Calendar } from 'react-native-calendars'
import { useWindowDimensions } from 'react-native'

const CalendarScreen = () => {
  const { width } = useWindowDimensions(); 
  return (
    <View style={{flex:1,backgroundColor:'#000',justifyContent:'center',alignItems:'center'}}>
      <Calendar style={{width}} />
    </View>
  )
}

export default CalendarScreen

const styles = StyleSheet.create({})