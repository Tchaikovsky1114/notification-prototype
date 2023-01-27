import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import moment from 'moment/moment';
import { useEffect } from 'react';

const AnnualLeaveScreen = () => {
  const [date, setDate] = useState(new Date());
  const [diffDay,setDiffDay] = useState();
  const [isShowCalander,setIsShowCalander] = useState(false);
  const onChange = (event,selectedDate) => {
    setIsShowCalander(false)
    const currentDate = selectedDate;
    setDate(currentDate);
    getDifference();
  }
  


  useEffect(() => {
    const currentDate = moment(new Date());
    const joinDate = moment(date);
    const differenceDate = currentDate.diff(joinDate, 'days');
    
    console.log('==currentDate==',currentDate)
    console.log('==joinDate==',joinDate);
    console.log('==differenceDate==',differenceDate);
    
    setDiffDay(differenceDate);
    
  },[date])
  console.log('==diffDay==',diffDay);
  return (
    <>
    {isShowCalander &&
    <DateTimePicker
      testID='dateTimePicker'
      value={date}
      mode="date"
      is24Hour={true}
      display="spinner"
      onChange={onChange}
      locale="ko"
      on
      />}
    
    <View style={styles.container}>
      <TouchableOpacity
      onPress={() => setIsShowCalander(true)}
      style={{
        height:160,
        justifyContent:'center',
        alignItems:'center',
        padding:16,
        borderRadius:16,
        backgroundColor:'#2d63e2'

      }}>
        <Text style={{fontSize:32,color:'#fff'}}>입사년월을 선택해주세요.</Text>
        <Text style={{color:'#fff'}}>선택 이후에는 수정할 수 없습니다.</Text>
      </TouchableOpacity>
    </View>
    </>
  )
}

export default AnnualLeaveScreen

const styles = StyleSheet.create({
  container : {
    flex:1,
    backgroundColor:'#fff',
    justifyContent:'center',
    alignItems:'center'
  }

})