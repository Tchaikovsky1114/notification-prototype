import { TouchableOpacity, useWindowDimensions, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import NotoText from './common/NotoText';
import useAttendance from '../hooks/useAttendance';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../recoil/userInfo';
import { doc, onSnapshot } from 'firebase/firestore';
import { firestore } from '../firebaseConfig';
import useAlert from '../hooks/useAlert';

const months = [
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
  '12월',
];
const nDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const fourtyHourToMilliseconds = 144000000;






const AttendanceCalendar = () => {
  const { attendance, setAttendance, startWork, endWork, getAttendance } = useAttendance();
  const userInfo = useRecoilValue(userInfoState);
  const [activeDate, setActiveDate] = useState(new Date());
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [firstDay, setFirstDay] = useState();
  const [totalWorkHourInWeeks, setTotalWorkhourInWeeks] = useState({});
  const [totalWorkHourInMonth, setTotalWorkHourInMonth] = useState([]);

  const { width } = useWindowDimensions();
  const { alert } = useAlert();

  const generateMatrix = () => {
    let matrix = [];
    let maxDays = nDays[month];
    let counter = 1;

    if (month == 1) {
      if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        maxDays += 1;
      }
    }
    for (let row = 1; row < 7; row++) {
      matrix[row] = [];
      for (let col = 0; col < 7; col++) {
        matrix[row][col] = -1;
        if (row === 1 && col >= firstDay) {
          matrix[row][col] = counter++;
        } else if (row > 1 && counter <= maxDays) {
          matrix[row][col] = counter++;
        }
      }
    }
    // matrix[0] = weekDays
    return matrix;
  };

  const matrix = generateMatrix();
  useEffect(() => {
    setYear(activeDate.getFullYear());
    setMonth(activeDate.getMonth());
    setFirstDay(new Date(year, month, 1).getDay());
  }, [activeDate]);

  const workStartHandler = () => {
    
    if (attendance.find((att) => att.date === moment().format('yyyy-MM-DD'))) {
      return alert({ title: '출근은 번복할 수 없습니다.' });
    }
    alert({
      buttonText1: '출근',
      buttonText2: '취소',
      cancelable: true,
      content: '출근하시겠습니까?',
      onPress: () =>
        startWork(
          userInfo.email,
          moment().format('yyyy-MM-DD'),
          moment().format('HH:mm:ss')
        ),
      title: moment().format('yyyy년 MM월 DD일'),
    });
  };
  const workEndHandler = () => {
    if (!attendance.find((att) => att.date === moment().format('yyyy-MM-DD'))) {
      return alert({ title: '출근 기록이 존재하지 않습니다.' });
    }
    alert({
      buttonText1: '퇴근',
      buttonText2: '취소',
      cancelable: true,
      content: '퇴근하시겠습니까?',
      onPress: () =>
        endWork(
          userInfo.email,
          moment().format('yyyy-MM-DD'),
          moment().format('HH:mm:ss')
        ),
      title: moment().format('yyyy년 MM월 DD일'),
    });
  };

  const weekOfMonth = (input = moment()) => {
    const firstDayOfMonth = input.clone().startOf('month');
    const firstDayOfWeek = firstDayOfMonth.clone().startOf('week');

    const offset = firstDayOfMonth.diff(firstDayOfWeek, 'days');
    return Math.ceil((input.date() + offset) / 7);
  };

  useEffect(() => {
    getAttendance(userInfo.email);
  }, []);

  // TypeError: Cannot read property 'attendance' of undefined, js engine: hermes
  useEffect(() => {
    const unsub = onSnapshot(
      doc(firestore, 'Attendance', userInfo.email),
      (doc) => {
        if(!doc.exists()) return;
        setAttendance(doc.data().attendance);
      }
    );
    return () => unsub();
  }, []);

  // [SyntaxError: JSON Parse error: Unexpected token: E]
  useEffect(() => {
    if (!attendance) return;
    const att = attendance;

    let totalSeconds = {};
    for (let i = 0; i < att.length; i++) {
      let workSeconds = 0;
      for (let j = 0; j < att.length; j++) {
        if (
          att[j].leave &&
          moment(att[i].date).weeks() === moment(att[j].date).weeks()
        ) {
          workSeconds += moment(att[j].leave, 'HH:mm:ss').diff(
            moment(att[j].entrance, 'HH-mm:ss'),
            'seconds'
          );
        }
      }
      const mmt = moment(att[i].date);
      totalSeconds[
        `${moment(att[i].date).year()}-${
          moment(att[i].date).month() + 1
        }-${weekOfMonth(mmt)}`
      ] = workSeconds;
    }
    const workConvertArray = [];

    for (let key in totalSeconds) {
      workConvertArray.push({
        weeks: key,
        seconds: totalSeconds[key],
      });
    }

    setTotalWorkHourInMonth(workConvertArray);
    setTotalWorkhourInWeeks(
      workConvertArray.find(
        (week) => +week.weeks.split('-')[2] === weekOfMonth()
      )
    );
  }, [attendance]);


  return (
    <View key={'calendar'} style={{ position: 'relative' }}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 16,
        }}
      >
        <NotoText style={{ fontSize: 24, color: '#fff' }}>
          {activeDate.getFullYear()}년 {months[activeDate.getMonth()]}
        </NotoText>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity
          onPress={workStartHandler}
          style={{
            borderWidth: 1,
            width: 80,
            height: 48,
            paddingHorizontal: 8,
            borderRadius: 8,
            borderColor: '#f41',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          activeOpacity={0.5}
        >
          <NotoText
            style={{ color: '#f41', textAlign: 'center', fontSize: 16 }}
          >
            출근하기
          </NotoText>
        </TouchableOpacity>
        <View style={{ width: 16 }} />
        <TouchableOpacity
          onPress={workEndHandler}
          style={{
            borderWidth: 1,
            width: 80,
            height: 48,
            paddingHorizontal: 8,
            borderRadius: 8,
            borderColor: '#0cdae0',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          activeOpacity={0.5}
        >
          <NotoText
            style={{ color: '#0cdae0', textAlign: 'center', fontSize: 16 }}
          >
            퇴근하기
          </NotoText>
        </TouchableOpacity>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 40,
          marginHorizontal: 16,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: '#cfffe5',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 16,
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              borderEndWidth: 1,
              borderEndColor: '#cfffe5',
            }}
          >
            <NotoText style={{ color: '#fff' }}>
              {totalWorkHourInWeeks
                ? moment
                    .utc(totalWorkHourInWeeks.seconds * 1000)
                    .format('H시간 mm분')
                : '-'}
            </NotoText>
            <NotoText style={{ color: '#fff' }}>이번주 누적</NotoText>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              borderEndWidth: 1,
              borderEndColor: '#cfffe5',
            }}
          >
            <NotoText style={{ color: '#fff' }}>
              {totalWorkHourInWeeks &&
              totalWorkHourInWeeks.seconds * 1000 - fourtyHourToMilliseconds >=
                0
                ? moment
                    .utc(
                      totalWorkHourInWeeks.seconds * 1000 -
                        fourtyHourToMilliseconds
                    )
                    .format('H시간 mm분')
                : '-'}
            </NotoText>
            <NotoText style={{ color: '#fff' }}>이번주 초과</NotoText>
          </View>
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <NotoText style={{ color: '#fff' }}>
              {(totalWorkHourInWeeks &&
                totalWorkHourInWeeks.seconds &&
                (2400 - totalWorkHourInWeeks.seconds / 60) / 60) > 0
                ? `${Math.floor(
                    (2400 - totalWorkHourInWeeks.seconds / 60) / 60
                  )}시간 ${Math.ceil(
                    (2400 - totalWorkHourInWeeks.seconds / 60) % 60
                  ).toFixed(0)}분`
                : '-'}
            </NotoText>
            <NotoText style={{ color: '#fff' }}>이번주 잔여</NotoText>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 16,
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              borderEndWidth: 1,
              borderEndColor: '#cfffe5',
            }}
          >
            <NotoText style={{ color: '#fff' }}>0H 0M 0S</NotoText>
            <NotoText style={{ color: '#fff' }}>이번달 누적</NotoText>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              borderEndWidth: 1,
              borderEndColor: '#cfffe5',
            }}
          >
            <NotoText style={{ color: '#fff' }}>0H 0M 0S</NotoText>
            <NotoText style={{ color: '#fff' }}>이번달 초과</NotoText>
          </View>
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <NotoText style={{ color: '#fff' }}>기본그룹</NotoText>
            <NotoText style={{ color: '#fff' }}>잔여 출퇴근</NotoText>
          </View>
        </View>
      </View>
      {matrix.map((row, rowIndex) => {
        let weeksIndex =
          rowIndex <= 6 ? (
            <View key={row + '' + rowIndex + activeDate.getMonth()}>
              <View
                style={{
                  marginVertical: 16,
                  borderBottomWidth: 1,
                  borderBottomColor: '#1245bd',
                  paddingBottom: 4,
                }}
              >
                <NotoText
                  style={{ fontSize: width > 330 ? 22 : 18, color: '#fff' }}
                >
                  {rowIndex}주차
                </NotoText>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  width,
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  marginBottom: 16,
                }}
              >
                <View
                  style={{
                    width: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <NotoText
                    style={{
                      textAlign: 'center',
                      color: '#fff',
                      fontSize: width > 330 ? 14 : 10,
                    }}
                  >
                    일자
                  </NotoText>
                </View>
                <NotoText
                  style={{
                    color: '#fff',
                    flex: 1,
                    textAlign: 'center',
                    fontSize: width > 330 ? 14 : 10,
                  }}
                >
                  업무 시작시간
                </NotoText>
                <NotoText
                  style={{
                    color: '#fff',
                    flex: 1,
                    textAlign: 'center',
                    fontSize: width > 330 ? 14 : 10,
                  }}
                >
                  업무 종료시간
                </NotoText>
                <NotoText
                  style={{
                    color: '#fff',
                    flex: 1,
                    textAlign: 'center',
                    fontSize: width > 330 ? 14 : 10,
                  }}
                >
                  총 근무시간
                </NotoText>
              </View>
            </View>
          ) : null;
        let rowItems = row.map((item, colIndex) => {
          if (item > 0)
            return (
              <View
                key={item + '' + colIndex + activeDate.getMonth()}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: width - 24,
                  paddingLeft: 4,
                  borderWidth: item == activeDate.getDate() ? 1 : 0,
                  flexDirection: 'row',
                  borderColor: '#21ee66',
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    width,
                    justifyContent: 'space-around',
                    alignItems: 'center',
                  }}
                >
                  <View
                    style={{
                      width: 56,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <NotoText
                      key={colIndex + activeDate.getMonth()}
                      style={{
                        // Highlight header
                        backgroundColor: rowIndex == 0 ? '#ddd' : '#000',
                        // Highlight Sundays
                        color:
                          colIndex == 0
                            ? '#a00'
                            : colIndex === 6
                            ? '#0cdae0'
                            : item === activeDate.getDate()
                            ? '#21ee06'
                            : '#fff',
                        // Highlight current date
                        fontWeight: item == activeDate.getDate() ? 'bold' : '',
                      }}
                    >
                      {item !== -1 ? item : ''}{' '}
                      <NotoText style={{ fontSize: 10,color:'#fff' }}>
                        {item !== -1 && colIndex === 0
                          ? '일'
                          : item !== -1 && colIndex === 1
                          ? '월'
                          : item !== -1 && colIndex === 2
                          ? '화'
                          : item !== -1 && colIndex === 3
                          ? '수'
                          : item !== -1 && colIndex === 4
                          ? '목'
                          : item !== -1 && colIndex === 5
                          ? '금'
                          : item !== -1 && colIndex === 6
                          ? '토'
                          : null}{' '}
                      </NotoText>
                    </NotoText>
                  </View>
                  {/* {attendance.find((item) => `${year}-${month + 1 >= 10 ? (month + 1) : ('0' + (month + 1))}-${item}` === item.date)} */}
                  {attendance.length > 0 ? (
                    <NotoText style={{ flex: 1, textAlign: 'center',color:'#fff' }}>
                      {attendance.find(
                        (att) =>
                          `${year}-${
                            month + 1 >= 10 ? month + 1 : '0' + (month + 1)
                          }-${item >= 10 ? item : '0' + item}` === att.date
                      )
                        ? attendance.find(
                            (att) =>
                              `${year}-${
                                month + 1 >= 10 ? month + 1 : '0' + (month + 1)
                              }-${item >= 10 ? item : '0' + item}` === att.date
                          ).entrance
                        : '-'}
                    </NotoText>
                  ) : (
                    <NotoText style={{ flex: 1, textAlign: 'center',color:'#fff' }}>
                      {' '}
                    </NotoText>
                  )}
                  {attendance.length > 0 ? (
                    <NotoText style={{ flex: 1, textAlign: 'center',color:'#fff' }}>
                      {attendance.find(
                        (att) =>
                          `${year}-${
                            month + 1 >= 10 ? month + 1 : '0' + (month + 1)
                          }-${item >= 10 ? item : '0' + item}` === att.date
                      )
                        ? attendance.find(
                            (att) =>
                              `${year}-${
                                month + 1 >= 10 ? month + 1 : '0' + (month + 1)
                              }-${item >= 10 ? item : '0' + item}` === att.date
                          ).leave
                        : '-'}
                    </NotoText>
                  ) : (
                    <NotoText style={{ flex: 1, textAlign: 'center',color:'#fff' }}>
                      {' '}
                    </NotoText>
                  )}

                  <NotoText style={{ flex: 1, textAlign: 'center',color:'#fff' }}>
                    {attendance.find(
                      (att) =>
                        `${year}-${
                          month + 1 >= 10 ? month + 1 : '0' + (month + 1)
                        }-${item >= 10 ? item : '0' + item}` === att.date
                    ) &&
                    attendance.find(
                      (att) =>
                        `${year}-${
                          month + 1 >= 10 ? month + 1 : '0' + (month + 1)
                        }-${item >= 10 ? item : '0' + item}` === att.date
                    ).leave
                      ? (
                          (+attendance
                            .find(
                              (att) =>
                                `${year}-${
                                  month + 1 >= 10
                                    ? month + 1
                                    : '0' + (month + 1)
                                }-${item >= 10 ? item : '0' + item}` ===
                                att.date
                            )
                            .leave.substr(0, 2) *
                            60 +
                            +attendance
                              .find(
                                (att) =>
                                  `${year}-${
                                    month + 1 >= 10
                                      ? month + 1
                                      : '0' + (month + 1)
                                  }-${item >= 10 ? item : '0' + item}` ===
                                  att.date
                              )
                              .leave.substr(3, 2) -
                            (+attendance
                              .find(
                                (att) =>
                                  `${year}-${
                                    month + 1 >= 10
                                      ? month + 1
                                      : '0' + (month + 1)
                                  }-${item >= 10 ? item : '0' + item}` ===
                                  att.date
                              )
                              .entrance.substr(0, 2) *
                              60 +
                              +attendance
                                .find(
                                  (att) =>
                                    `${year}-${
                                      month + 1 >= 10
                                        ? month + 1
                                        : '0' + (month + 1)
                                    }-${item >= 10 ? item : '0' + item}` ===
                                    att.date
                                )
                                .entrance.substr(3, 2))) /
                          60
                        ).toFixed(0) > 0
                        ? (
                            (+attendance
                              .find(
                                (att) =>
                                  `${year}-${
                                    month + 1 >= 10
                                      ? month + 1
                                      : '0' + (month + 1)
                                  }-${item >= 10 ? item : '0' + item}` ===
                                  att.date
                              )
                              .leave.substr(0, 2) *
                              60 +
                              +attendance
                                .find(
                                  (att) =>
                                    `${year}-${
                                      month + 1 >= 10
                                        ? month + 1
                                        : '0' + (month + 1)
                                    }-${item >= 10 ? item : '0' + item}` ===
                                    att.date
                                )
                                .leave.substr(3, 2) -
                              (+attendance
                                .find(
                                  (att) =>
                                    `${year}-${
                                      month + 1 >= 10
                                        ? month + 1
                                        : '0' + (month + 1)
                                    }-${item >= 10 ? item : '0' + item}` ===
                                    att.date
                                )
                                .entrance.substr(0, 2) *
                                60 +
                                +attendance
                                  .find(
                                    (att) =>
                                      `${year}-${
                                        month + 1 >= 10
                                          ? month + 1
                                          : '0' + (month + 1)
                                      }-${item >= 10 ? item : '0' + item}` ===
                                      att.date
                                  )
                                  .entrance.substr(3, 2))) /
                            60
                          ).toFixed(0) -
                          1 +
                          'H'
                        : (
                            (+attendance
                              .find(
                                (att) =>
                                  `${year}-${
                                    month + 1 >= 10
                                      ? month + 1
                                      : '0' + (month + 1)
                                  }-${item >= 10 ? item : '0' + item}` ===
                                  att.date
                              )
                              .leave.substr(0, 2) *
                              60 +
                              +attendance
                                .find(
                                  (att) =>
                                    `${year}-${
                                      month + 1 >= 10
                                        ? month + 1
                                        : '0' + (month + 1)
                                    }-${item >= 10 ? item : '0' + item}` ===
                                    att.date
                                )
                                .leave.substr(3, 2) -
                              (+attendance
                                .find(
                                  (att) =>
                                    `${year}-${
                                      month + 1 >= 10
                                        ? month + 1
                                        : '0' + (month + 1)
                                    }-${item >= 10 ? item : '0' + item}` ===
                                    att.date
                                )
                                .entrance.substr(0, 2) *
                                60 +
                                +attendance
                                  .find(
                                    (att) =>
                                      `${year}-${
                                        month + 1 >= 10
                                          ? month + 1
                                          : '0' + (month + 1)
                                      }-${item >= 10 ? item : '0' + item}` ===
                                      att.date
                                  )
                                  .entrance.substr(3, 2))) /
                            60
                          ).toFixed(0) + 'H'
                      : '-'}
                  </NotoText>
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
            }}
          >
            <View style={{ flexDirection: 'row' }}>{weeksIndex}</View>
            {rowItems}
          </View>
        );
      })}
    </View>
  );
};

export default AttendanceCalendar;
