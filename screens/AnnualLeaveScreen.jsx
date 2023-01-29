import { Alert, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import moment from 'moment/moment';
import { useEffect } from 'react';
import useAnnualLeave from '../hooks/useAnnualLeave';
import { useRecoilValue } from 'recoil';
import userInfoState from '../recoil/userInfo'
import { useNavigation } from '@react-navigation/native';


/**
 * 필요한 필드값
 * joinDate - 나의 입사일
 * MyAnnual - 현재 나의 연차
 * totalAnnualLeave - 총 연차휴가
 * usableAnnualLeave - 사용 가능한 연차휴가
 * usedAnnualLeave - 사용한 연차 휴가
 * workDay - (현재일 - 입사일) 날일로 환산
 * workMonth - (현재일 - 입사일)을 월로 환산 (잔여일 버림)
 * workyear - (현재일 - 입사일)을 년으로 환산 (잔여일 버림)
 * 접속할 때마다 계산해서 서버로 upload
 * workDay % 365 === 1 일때 totalAnnualLeave, usableAnnualLeave, usedAnnualLeave를
 * 연차에 맞게끔 초기화 후 알맞는 값을 넣어줌.
 */


const AnnualLeaveScreen = () => {
  const [date, setDate] = useState(new Date());
  const [diffDay,setDiffDay] = useState();
  const [diffMonth,setDiffMonth] = useState();
  const [diffYear,setDiffYear] = useState();
  const [isShowCalander,setIsShowCalander] = useState(false);
  const { postAnnualLeave } = useAnnualLeave();
  const userInfo = useRecoilValue(userInfoState)
  const navigation = useNavigation();
  const onChange = (event,selectedDate) => {
    setIsShowCalander(false)
    const joinDate = selectedDate;
    confirmAlertHandler(joinDate)
  }
  
  const confirmAlertHandler = (joinDate) => {
    Alert.alert(
      '선택한 이후 날짜를 수정할 수 없습니다',
      '이 날짜로 확정하시겠습니까?',
      [
        {text: '예', onPress: () => {
          setDate(joinDate);
          const annualLeaveInfo = {
            userEmail:userInfo.email,
            joinDate,
            monthlyLeave: diffDay < 365 ? diffMonth : 0 ,
            annualLeave: diffDay > 364 ? 15 : 0,
            usedLeave: 0,
            remainingLeave: diffDay < 365 ? diffMonth : 15
          }
          postAnnualLeave(annualLeaveInfo)
        }},
        {text: '아니요', onPress: () => {
          console.log('다음에 다시할게요 ')
        }, style: 'cancel'}
      ],
      { cancelable: false }
    )
  }


  useEffect(() => {
    const today = moment(new Date());
    const joinDate = moment(date);
    const differenceYear = today.diff(joinDate,'years');
    const differenceDay = today.diff(joinDate, 'days');
    const differenceMonth = today.diff(joinDate, 'months');
    setDiffDay(differenceDay);
    setDiffMonth(differenceMonth);
    setDiffYear(differenceYear);
  },[date])
  console.log(diffDay)
  console.log(diffMonth)
  console.log(diffYear)

  return (
    <>
    {isShowCalander &&
    <DateTimePicker
      testID='dateTimePicker'
      value={date}
      mode="date"
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
        <View style={{height:20}} />
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