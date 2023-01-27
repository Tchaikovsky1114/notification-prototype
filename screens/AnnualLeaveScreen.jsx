import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { onChange } from 'react-native-reanimated';

const AnnualLeaveScreen = () => {
  const [date, setDate] = useState(new Date());

  const onChange = (event,selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate)
  }
  return (
    <View style={styles.container}>
      <DateTimePicker
      testID='dateTimePicker'
      value={date}
      mode="date"
      is24Hour={true}
      display="spinner"
      onChange={onChange}
      />
    </View>
  )
}

export default AnnualLeaveScreen

const styles = StyleSheet.create({
  container : {
    flex:1,
    backgroundColor:'#fff'
  }
})