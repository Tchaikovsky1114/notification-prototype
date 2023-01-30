import { Alert, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import moment from 'moment/moment';
import { useEffect,useLayoutEffect } from 'react';
import useAnnualLeave from '../hooks/useAnnualLeave';
import { useRecoilValue } from 'recoil';
import { useNavigation } from '@react-navigation/native';
import { userInfoState } from '../recoil/userInfo';
import { LocaleConfig,Calendar,CalendarList,Agenda } from 'react-native-calendars';

LocaleConfig.locales['ko'] = {
  monthNames: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월'
  ],
  monthNamesShort: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월'
  ],
  dayNames: ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'],
  dayNamesShort: ['월', '화', '수', '목', '금', '토', '일.'],
  today: "오늘"
};
LocaleConfig.defaultLocale = 'ko';

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
const now = moment();


const AnnualLeaveScreen = () => {
  const [date, setDate] = useState(new Date());
  const [diffDay,setDiffDay] = useState();
  const [diffMonth,setDiffMonth] = useState();
  const [diffYear,setDiffYear] = useState();
  const [isShowCalander,setIsShowCalander] = useState(false);
  const [isShowAppointVacationModal,setIsShowAppointVacationModal] = useState(false);
  const { postAnnualLeave,getAnnualLeave,annual } = useAnnualLeave();
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
        {text: '예', onPress: async () => {
          setDate(joinDate);
          const annualLeaveInfo = {
            userEmail:userInfo.email,
            joinDate,
            monthlyLeave: diffDay < 365 ? diffMonth : 0 ,
            annualLeave: diffDay > 365 ? 15 : 0,
            usedLeave: 0,
            remainingLeave: diffDay < 365 ? diffMonth : 15
          }
          await postAnnualLeave(annualLeaveInfo)
          // navigation.navigate('AnnualLeaveDetail')
        }},
        {text: '아니요', onPress: () => {
          console.log('다음에 다시할게요 ')
        }, style: 'cancel'}
      ],
      { cancelable: false }
    )
  }
  
  const showVacationModalHandler = () => {
    console.log('excuted');
    setIsShowAppointVacationModal(true);
  }

  useLayoutEffect(() => {
    getAnnualLeave(userInfo.email);
  }, [])
  
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

  return (
    <>
    <Modal
    visible={isShowAppointVacationModal}
    onRequestClose={() => setIsShowAppointVacationModal(false)}
    transparent={false}
    style={{flex:1}}
    
    >
    
      <Calendar
      style={{flex:1,backgroundColor:'black'}}
      
      // Initially visible month. Default = now
      initialDate={'2012-03-01'}
      // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
      minDate={'2012-05-10'}
      // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
      maxDate={'2012-05-30'}
      // Handler which gets executed on day press. Default = undefined
      onDayPress={day => {
        console.log('selected day', day);
      }}
      // Handler which gets executed on day long press. Default = undefined
      onDayLongPress={day => {
        console.log('selected day', day);
      }}
      // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
      monthFormat={'yyyy MM'}
      // Handler which gets executed when visible month changes in calendar. Default = undefined
      onMonthChange={month => {
        console.log('month changed', month);
      }}
      // Hide month navigation arrows. Default = false
      hideArrows={true}
      // Replace default arrows with custom ones (direction can be 'left' or 'right')
      renderArrow={direction => <Arrow />}
      // Do not show days of other months in month page. Default = false
      hideExtraDays={true}
      // If hideArrows = false and hideExtraDays = false do not switch month when tapping on greyed out
      // day from another month that is visible in calendar page. Default = false
      disableMonthChange={true}
      // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
      firstDay={1}
      // Hide day names. Default = false
      hideDayNames={true}
      // Show week numbers to the left. Default = false
      showWeekNumbers={true}
      // Handler which gets executed when press arrow icon left. It receive a callback can go back month
      onPressArrowLeft={subtractMonth => subtractMonth()}
      // Handler which gets executed when press arrow icon right. It receive a callback can go next month
      onPressArrowRight={addMonth => addMonth()}
      // Disable left arrow. Default = false
      disableArrowLeft={true}
      // Disable right arrow. Default = false
      disableArrowRight={true}
      // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
      disableAllTouchEventsForDisabledDays={true}
      // Replace default month and year title with custom one. the function receive a date as parameter
      renderHeader={date => {
        /*Return JSX*/<View>
          {date}
        </View>
      }}
      // Enable the option to swipe between months. Default = false
      enableSwipeMonths={true}
    />
    
    </Modal>
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
    
    {annual
    ? 
    <View style={{flex:1, backgroundColor:'#fff',paddingHorizontal:8}}>
      <View style={{borderWidth:1, borderColor:'#2d63e2',padding:16}}>
        <Text style={{fontSize:18}}>{userInfo.name}님의 연차와 관련된 정보입니다.</Text>
        <Text style={{fontSize:20}}>입사일자: <Text style={{color:'#2d63e2'}}>{annual.joinDate.split('T')[0].split('-')[0]}년 {annual.joinDate.split('T')[0].split('-')[1]}월 {annual.joinDate.split('T')[0].split('-')[2]}일</Text></Text>
      </View>
    <View style={{marginVertical:24,paddingBottom:8,borderBottomWidth:1, borderBottomColor:'#f41',justifyContent:'flex-start',alignItems:'flex-start'}}>
      { now.diff(annual.joinDate,'years') > 1 && <Text style={{fontSize:24}}>이번년도 지급 연차 <Text style={{color:'#f91'}}>{annual.annualLeave}</Text> 개</Text>}
      { now.diff(annual.joinDate,'years') < 2 && <Text style={{fontSize:24}}>이번년도 지급 월차 <Text style={{color:'#f91'}}>{annual.monthlyLeave}</Text> 개</Text> }
    </View>
    <View>
      <Text style={{fontSize:24}}>이번년도 사용 휴가: <Text style={{color:'#2d63e2'}}>{annual.usedLeave}</Text></Text>
      <Text style={{fontSize:24}}>이번년도 남은 휴가: <Text style={{color:'#f41'}}>{annual.remainingLeave}</Text></Text>
    </View>
      <View style={{marginTop:72,justifyContent:'center',alignItems:'center'}}>
        <TouchableOpacity
        onPress={showVacationModalHandler}
        style={{height:144,backgroundColor:'#2d63e2',width:'80%',justifyContent:'center',alignItems:'center',borderRadius:8}}>
          <Text style={{color:'#fff',fontWeight:'bold',fontSize:28}}>휴가 사용</Text>
        </TouchableOpacity>
      </View>
    </View>
    : <View style={styles.container}>
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
     
    </View>}
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