import { StyleSheet, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import moment from 'moment';
import NotoText from './common/NotoText';



const AttendanceCalendar = () => {
  const months = ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"];
  const weekDays = ["일요일","월요일","화요일","수요일","목요일","금요일","토요일"];
  const nDays = [31,28,31,30,31,30,31,31,30,31,30,31];
  const [activeDate,setActiveDate] = useState(new Date());
  const [year,setYear] = useState(new Date().getFullYear());
  const [month,setMonth] = useState(new Date().getMonth());
  const [firstDay,setFirstDay] = useState();
  const [row,setRow] = useState([]);
  const { width } = useWindowDimensions();
  
  const generateMatrix = () => {
    let matrix = [];
    let maxDays = nDays[month];
    let counter = 1;
    console.log('month :',month); 
    console.log('maxDays:',maxDays);
    if(month == 1) {
      if((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        maxDays += 1;
      }
    }
    for (let row = 1; row < 7; row++){
      matrix[row] = [];
      for(let col = 0; col < 7; col++) {
        matrix[row][col] = -1;
        if(row === 1 && col >= firstDay) {
          matrix[row][col] = counter++;
        }else if(row > 1 && counter <= maxDays) {
          matrix[row][col] = counter++;
        }
      }
    }
    return matrix
  };
  
  
  
  console.log('==moment==',moment().format('yyyy-MM-DD HH:mm:ss'));
  const matrix = generateMatrix();
  useEffect(() => {
    setYear(activeDate.getFullYear());
    setMonth(activeDate.getMonth());
    setFirstDay(new Date(year,month,1).getDay());
    
  }, [activeDate])

  
  
  return (
    <View key={'calendar'} style={{position:'relative'}}>
      <View style={{flexDirection:'row', position:'absolute', top: 12, right: 24}}>
        <TouchableOpacity
        onPress={() => {}}
        style={{borderWidth:1,paddingVertical:4,width:80, height:53 ,paddingHorizontal:8,borderRadius:8,borderColor:'#f41',alignItems:'center',justifyContent:'center'}}
        activeOpacity={0.5}
        >
          <NotoText style={{color:'#f41',textAlign:'center',fontSize:16}}>출근하기</NotoText>
        </TouchableOpacity>
        <View style={{width:16}} />
        <TouchableOpacity
        onPress={() => {}}
        style={{borderWidth:1,paddingVertical:4,width:80, height:53 ,paddingHorizontal:8,borderRadius:8,borderColor:'#2d63e2',alignItems:'center',justifyContent:'center'}}
        activeOpacity={0.5}
        >
          <NotoText style={{color:'#2d63e2',textAlign:'center',fontSize:16}}>퇴근하기</NotoText>
        </TouchableOpacity>
      </View>
      <View style={{justifyContent:'center',alignItems:'center',marginVertical:16}}>
      <NotoText style={{fontSize:24}}>{activeDate.getFullYear()}년 {months[activeDate.getMonth()]}</NotoText>
      </View>
      
      {
        matrix.map((row, rowIndex) => {
          let weeksIndex = rowIndex <= 6
          ? (<View key={row + '' + rowIndex + activeDate.getMonth()}>
              <View style={{marginVertical:16,borderBottomWidth:1,borderBottomColor:'#07205a',paddingBottom:4}}>
              <NotoText style={{fontSize:22,color:'#07205a'}}>{rowIndex}주차</NotoText>
              </View>
              <View style={{flex:1,flexDirection:'row',width,justifyContent:'space-around',alignItems:'center',marginBottom:16}}>
                <View style={{width:40,justifyContent:'center',alignItems:'center'}}>
                <NotoText style={{textAlign:'center'}}>일자</NotoText>
                </View>
                <NotoText style={{flex:1,textAlign:'center'}}>업무 시작시간</NotoText>
                <NotoText style={{flex:1,textAlign:'center'}}>업무 종료시간</NotoText>
                <NotoText style={{flex:1,textAlign:'center'}}>총 근무시간</NotoText>
              </View>
            </View>
            )
          : null;
          let rowItems = row.map((item, colIndex) => {
            if(item > 0)
            return (
              <View
              key={item + '' + colIndex + activeDate.getMonth() }
              style={{
                justifyContent:'center',alignItems:'center',height:40,width: width - 16,paddingLeft:4,
                borderWidth: item == activeDate.getDate() ? 1 : 0,
                flexDirection:'row',
                borderColor: '#21ee66'
              }}>
              <View style={{flexDirection:'row',width,justifyContent:'space-around',alignItems:'center'}}>
              <View style={{width:56,justifyContent:'center',alignItems:'center'}}>
              <NotoText
                key={colIndex + activeDate.getMonth()}
                style={{
                  // Highlight header 
                  backgroundColor: rowIndex == 0 ? '#ddd' : '#fff',
                  // Highlight Sundays 
                  color: colIndex == 0 ? '#a00' : colIndex === 6 ? '#2d63e2' : item === activeDate.getDate() ? '#21ee06' : '#000',
                  // Highlight current date 
                  fontWeight: item == activeDate.getDate() ? 'bold': '',
                  
                }}
                >
                {item !== -1 ? item : ''}{' '}
                <NotoText style={{fontSize:10}}>{(item !== -1 && colIndex === 0) ? '일' : (item !== -1 && colIndex === 1) ? '월' : (item !== -1 && colIndex === 2) ? '화' : (item !== -1 && colIndex === 3) ? '수' : (item !== -1 && colIndex === 4) ? '목' : (item !== -1 && colIndex === 5) ? '금' : (item !== -1 && colIndex === 6) ? '토' : null } </NotoText>
              </NotoText>
              </View>
                <NotoText style={{flex:1,textAlign:'center'}}>08:58:30</NotoText>
                <NotoText style={{flex:1,textAlign:'center'}}>18:03:20</NotoText>
                <NotoText style={{flex:1,textAlign:'center'}}>{activeDate.getFullYear()}-{activeDate.getMonth()}-{activeDate.getDate()}</NotoText>
              </View>
              </View>
            );
          });
          return (
            <View
              key={Math.random()}
              style={{
                flex: 1,
                padding: 15,
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
              }}>
              <View style={{flexDirection:'row'}}>
              {weeksIndex}
              </View>
              {rowItems}
            </View> 
          );
        })
      }    
    </View>
  )
}

export default AttendanceCalendar

const styles = StyleSheet.create({})