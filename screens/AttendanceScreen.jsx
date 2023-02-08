import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AttendanceCalendar from '../components/AttendanceCalendar'

const AttendanceScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <AttendanceCalendar />
    </ScrollView>
  )
}

export default AttendanceScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#fff'
  }
})