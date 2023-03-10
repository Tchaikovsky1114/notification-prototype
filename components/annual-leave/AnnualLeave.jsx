import { Alert, Modal, StyleSheet, Text, TouchableOpacity, View,Pressable } from 'react-native'
import React from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import moment from 'moment/moment';
import { useEffect,useLayoutEffect } from 'react';
import useAnnualLeave from '../../hooks/useAnnualLeave';
import { useRecoilValue } from 'recoil';
import { useNavigation } from '@react-navigation/native';
import { userInfoState } from '../../recoil/userInfo';
import { LocaleConfig,Calendar } from 'react-native-calendars';

import NotoText from '../../components/common/NotoText';
import { ScrollView } from 'react-native';



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
  dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
  dayNamesShort: ['일','월','화','수','목','금','토'],
  today: "오늘"
};
LocaleConfig.defaultLocale = 'ko';

const now = moment();
const formattedToday =  moment().format('yyyy-MM-DD')
const initDate = new Date();
const minimumDate = new Date();
const disabledDaysIndexes = [6, 7];

const currentYear = now.year();

const AnnualLeave = () => {
  const { postAnnualLeave,getAnnualLeave,annual } = useAnnualLeave();
  const [date, setDate] = useState(new Date());
  const [diffDay,setDiffDay] = useState();
  const [diffMonth,setDiffMonth] = useState();
  const [diffYear,setDiffYear] = useState();
  const [selectedDate,setSelectedDate] = useState([]); 
  const [markedDates,setMarkedDates] = useState({});
  const [isShowCalander,setIsShowCalander] = useState(false);
  const [isShowAppointVacationModal,setIsShowAppointVacationModal] = useState(false);
  const [confirmAnnualLeave,setConfirmAnnualLeave] = useState(false);
  const [disabledDates,setDisabledDates] = useState([]);
  const [monthChange,setMonthChange] = useState();
  const [extractAnnualLeave,setExtractAnnualLeave] = useState([]);
  const userInfo = useRecoilValue(userInfoState)
  const navigation = useNavigation();


  const onChange = (event,selectedDate) => {
    setIsShowCalander(false)
    const joinDate = selectedDate;
    setDate(joinDate);
    confirmAlertHandler(joinDate)
  }

  const markDateHandler = (day) => {
    setSelectedDate((prev) => ([...prev,day.dateString]))
  }

  const marking = () => {
    const obj = selectedDate.reduce((c,v) => Object.assign(c, {[v]: { selected: true }}),{});
    
    const obj2 = {
      ...obj,
      ...disabledDates,
    }
    setMarkedDates(obj2);
  }
  
  const confirmAlertHandler = (joinDate) => {
    Alert.alert(
      '선택한 이후 날짜를 수정할 수 없습니다',
      '이 날짜로 확정하시겠습니까?',
      [
        {text: '예', onPress:  () => {
          
          setConfirmAnnualLeave(true);
        }},
        {text: '아니요', onPress: () => {
          console.log('다음에 다시할게요 ');
        }, style: 'cancel'}
      ],
      { cancelable: false }
    )
  }
  
  const showVacationModalHandler = () => {
    setIsShowAppointVacationModal(true);
  }
  
  const getDisabledDays = (month, year, daysIndexes,type) => {
    let pivot = moment().month(month).year(year).startOf('month');
    const end = moment().month(month).year(year).endOf('month');
    
    let dates = {};
    const disabled = { disabled: true, disableTouchEvent: true };
    const holidays = {
      [`${currentYear}-01-01`]: disabled,
      [`${currentYear}-03-01`]: disabled,
      [`${currentYear}-05-01`]: disabled,
      [`${currentYear}-05-05`]: disabled,
      [`${currentYear}-06-06`]: disabled,
      [`${currentYear}-08-15`]: disabled,
      [`${currentYear}-10-03`]: disabled,
      [`${currentYear}-10-09`]: disabled,
      [`${currentYear}-12-25`]: disabled,
      
    };
    while (pivot.isBefore(end)) {
      daysIndexes.forEach((day) => {
        const copy = moment(pivot);
        dates[copy.day(day).format('YYYY-MM-DD')] = disabled;
      });
      pivot.add(7, 'days');
    }
    dates = {
      ...dates,
      ...holidays
    }
    if(type === 'init'){
      setMarkedDates(dates)  
    }
    if(!type){
      
      setDisabledDates((prev) => ({...prev,...dates}));
    }
    return dates;
  };

  const removeSelectAnnualLeave = () => {
    const myLeave = {};
    const disabled = { disabled: true, disableTouchEvent: true };
    for(let key in markedDates) {
      if(!markedDates[key].selected) {
        myLeave[key] = disabled;
      }
    }
    setMarkedDates(myLeave);
    return myLeave;
  }
  
  const submitAnnualLeave = () => {
    const obj = {
      email: userInfo.email,
    }
  }
  
  const initializeSelectAnnualLeave = () => {
    removeSelectAnnualLeave();
    setExtractAnnualLeave([]);
    setSelectedDate([]);
  }  

  useLayoutEffect(() => {
    getAnnualLeave(userInfo.email);
  },[]);


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

  useEffect(() => {
    marking()
  }, [selectedDate])
  
  useEffect(() => {
    if(!confirmAnnualLeave) return;

    const annualLeaveInfo = {
      userEmail:userInfo.email,
      joinDate: date,
      monthlyLeave: diffDay < 365 ? diffMonth : 0 ,
      annualLeave: diffDay > 365 ? 15 : 0,
      usedLeave: 0,
      remainingLeave: diffDay < 365 ? diffMonth : 15
    }
    postAnnualLeave(annualLeaveInfo);
  },[confirmAnnualLeave])


  useEffect(() => {
    console.log('month changed');
    getDisabledDays(
      initDate.getMonth(),
      initDate.getFullYear(),
      disabledDaysIndexes,
      'init'
    );
  }, []);
  

console.log('=== 날짜를 선택한 연차일 ===',extractAnnualLeave);

  return (
    <>
    <Modal
    visible={isShowAppointVacationModal}
    onRequestClose={() => setIsShowAppointVacationModal(false)}
    transparent={false}
    style={{flex:1}}
    >
      
      <View style={{flex:1,justifyContent:'center'}}>
        <View style={{alignItems:'center'}}>
          <NotoText style={{fontSize:24,color:'#fff',lineHeight:32}}>연차 희망일을 선택해주세요.</NotoText>
          <NotoText style={{fontSize:16,color:'#aaa',lineHeight:24}}>복수 선택도 가능합니다.</NotoText>
        </View>
      <Calendar
      // // Initially visible month. Default = now
      initialDate={formattedToday}
      disabledDaysIndexes={disabledDaysIndexes}
      onMonthChange={(date) => {
        setMonthChange(date.month);
        getDisabledDays(date.month - 1, date.year, disabledDaysIndexes);
      }}
      markedDates={markedDates}
      markingType="custom"
      onDayPress={(day) => {
        const extractDay = extractAnnualLeave.findIndex((leave) => leave === day.dateString);
        if(annual.remainingLeave - extractAnnualLeave.length <= 0 || extractDay >= 0) return;
        markDateHandler(day);
        setExtractAnnualLeave((prev) => [...prev,day.dateString]);
      }}
      theme={{
        monthTextColor:'#08035f',
        textMonthFontSize:24,
        arrowWidth:18,
        textDayFontFamily: 'Noto400',
        textMonthFontFamily: 'Noto400',
        todayButtonFontFamily: 'Noto400',
        textDayHeaderFontFamily: 'Noto400',
        textDayStyle: {
          fontSize:24,
          alignItems:'center',
          justifyContent:'center',
          lineHeight:28,
        },
        weekVerticalMargin: 16,
        selectedDayBackgroundColor:'#0cdae0',
        selectedDayTextcolor:'#fff',
        selectedDotColor:'#f41',
        'stylesheet.calendar.header': {
          dayTextAtIndex0: {
            color:'#f41'
          },
          dayHeader:{
            color:'#fff'
          },
          dayTextAtIndex6: {
            color:'#0cdae0'
          }
        }
      }}
      monthFormat={'yyyy년 MM월'}
      
      // // Handler which gets executed when visible month changes in calendar. Default = undefined
      // onMonthChange={month => {
      //   console.log('month changed', month);
      // }}
      // // Hide month navigation arrows. Default = false
      // hideArrows={true}
      // // Replace default arrows with custom ones (direction can be 'left' or 'right')
      // renderArrow={direction => <Arrow />}
      // // Do not show days of other months in month page. Default = false
      // hideExtraDays={true}
      // // If hideArrows = false and hideExtraDays = false do not switch month when tapping on greyed out
      // // day from another month that is visible in calendar page. Default = false
      // disableMonthChange={true}
      // // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
      // firstDay={1}
      // // Hide day names. Default = false
      // hideDayNames={true}
      // // Show week numbers to the left. Default = false
      // showWeekNumbers={true}
      enableSwipeMonths={true}
    />
    {annual &&
    <>
    <View style={{paddingLeft:16,marginTop:24,flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
      <NotoText style={{fontSize:16}}>남은 휴가일: </NotoText>
    <View style={{width:8}} />
      <NotoText style={{fontSize:16}}>{annual.remainingLeave - extractAnnualLeave.length}일</NotoText>
    </View>
    {extractAnnualLeave.length > 0 &&
    <View style={{paddingLeft:16,marginTop:8,flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
      <NotoText style={{fontSize:16}}>선택한 날짜 수: </NotoText>
    <View style={{width:8}} />
      <NotoText style={{fontSize:16}}>{extractAnnualLeave.length}일</NotoText>
    </View>}
    </>  
    }
    <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:24}}>
    <Pressable
      onPress={initializeSelectAnnualLeave}
      style={{paddingHorizontal:24,paddingVertical:16,borderRadius:4,justifyContent:'center',alignItems:'center',borderWidth:1,borderColor:'#f41'}}
    >
      <NotoText style={{color:'#f41',fontSize:18}}>다시 선택하기</NotoText>
    </Pressable>
    <Pressable
      onPress={() => {}}
      style={{paddingHorizontal:24,paddingVertical:16,borderRadius:4,justifyContent:'center',alignItems:'center',borderWidth:1,borderColor:'#0cdae0'}}
    >
      <NotoText style={{color:'#0cdae0',fontSize:18}}>연차 상신하기</NotoText>
    </Pressable>
    </View>
    </View>
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
    <ScrollView style={{backgroundColor:'#000',paddingHorizontal:8}}>
      <View style={{borderWidth:1, borderColor:'#0cdae0',padding:16,marginTop:48}}>
        <NotoText style={{fontSize:18,color:'#fff'}}>{userInfo.name}님의 연차와 관련된 정보입니다.</NotoText>
        <NotoText style={{fontSize:20,color:'#fff'}}>입사일자: <NotoText style={{color:'#0cdae0'}}>{annual.joinDate.split('T')[0].split('-')[0]}년 {annual.joinDate.split('T')[0].split('-')[1]}월 {annual.joinDate.split('T')[0].split('-')[2]}일</NotoText></NotoText>
      </View>
    <View style={{marginVertical:24,paddingBottom:8,borderBottomWidth:1, borderBottomColor:'#f41',justifyContent:'flex-start',alignItems:'flex-start'}}>
      { now.diff(annual.joinDate,'years') > 1 && <NotoText style={{fontSize:24,color:'#fff'}}>이번년도 지급 연차 <NotoText style={{color:'#f91'}}>{annual.annualLeave}</NotoText> 개</NotoText>}
      { now.diff(annual.joinDate,'years') < 2 && <NotoText style={{fontSize:24,color:'#fff'}}>이번년도 지급 월차 <NotoText style={{color:'#f91'}}>{annual.monthlyLeave}</NotoText> 개</NotoText> }
    </View>
    <View>
      <NotoText style={{fontSize:24,color:'#fff'}}>이번년도 사용 휴가: <NotoText style={{color:'#0cdae0'}}>{annual.usedLeave}</NotoText></NotoText>
      <NotoText style={{fontSize:24,color:'#fff'}}>이번년도 남은 휴가: <NotoText style={{color:'#f41'}}>{annual.remainingLeave}</NotoText></NotoText>
    </View>
      <View style={{marginTop:32,justifyContent:'center',alignItems:'center'}}>
        <TouchableOpacity
        onPress={showVacationModalHandler}
        style={{height:144,backgroundColor:'#0cdae0',width:'80%',justifyContent:'center',alignItems:'center',borderRadius:8}}>
          <NotoText style={{color:'#fff',fontSize:28,lineHeight:32}}>휴가 사용</NotoText>
        </TouchableOpacity>
      </View>
    </ScrollView>
    : <View style={styles.container}>
      <TouchableOpacity
      onPress={() => setIsShowCalander(true)}
      style={{
        height:160,
        justifyContent:'center',
        alignItems:'center',
        padding:16,
        borderRadius:16,
        backgroundColor:'#0cdae0'
        }}>
        <NotoText style={{fontSize:24,color:'#fff'}}>입사년월을 선택해주세요.</NotoText>
        <View style={{height:20}} />
        <NotoText style={{color:'#fff'}}>선택 이후에는 수정할 수 없습니다.</NotoText>
      </TouchableOpacity>
    </View>}
    </>
  )
}

export default AnnualLeave

const styles = StyleSheet.create({
  container : {
    flex:1,
    backgroundColor:'#000',
    justifyContent:'center',
    alignItems:'center'
  }
})