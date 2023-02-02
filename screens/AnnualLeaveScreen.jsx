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
import { LocaleConfig,Calendar } from 'react-native-calendars';
import { Pressable } from 'react-native';



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

const AnnualLeaveScreen = () => {
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
      <Text style={{fontSize:24,color:'#08035f'}}>연차 희망일을 선택해주세요.</Text>
      <Text style={{fontSize:20,color:'#aaa'}}>복수 선택도 가능합니다.</Text>
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
        if(annual.remainingLeave - extractAnnualLeave.length <= 0) return;
        markDateHandler(day);
        setExtractAnnualLeave((prev) => [...prev,day.dateString]);
      }}
      theme={{
        monthTextColor:'#08035f',
        textMonthFontSize:24,
        arrowWidth:18,
        selectedDayBackgroundColor:'#2d63e2',
        selectedDayTextColor:'#fff',
        selectedDotColor:'#f41',
        'stylesheet.calendar.header': {
          dayTextAtIndex0: {
            color:'#f41'
          },
          dayHeader:{
            color:'#000'
          },
          dayTextAtIndex6: {
            color:'#2d63e2'
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
    <View style={{marginTop:24,flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
      <Text style={{fontSize:24}}>남은 휴가일: </Text>
    <View style={{width:8}} />
      <Text style={{fontSize:20}}>{annual.remainingLeave - extractAnnualLeave.length}일</Text>
    </View>
    {extractAnnualLeave.length > 0 &&
    <View style={{marginTop:8,flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
      <Text style={{fontSize:24}}>선택한 날짜 수: </Text>
    <View style={{width:8}} />
      <Text style={{fontSize:16}}>{extractAnnualLeave.length}일</Text>
    </View>}
    </>  
    }
    <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:24}}>
    <Pressable
      onPress={initializeSelectAnnualLeave}
      style={{height:53,paddingHorizontal:24,justifyContent:'center',alignItems:'center',borderWidth:1,borderColor:'#f41'}}
    >
      <Text style={{color:'#f41'}}>다시 선택하기</Text>
    </Pressable>
    <Pressable
      onPress={() => {}}
      style={{height:53,paddingHorizontal:24,justifyContent:'center',alignItems:'center',borderWidth:1,borderColor:'#2d63e2'}}
    >
      <Text style={{color:'#2d63e2'}}>연차 상신하기</Text>
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