
import React, { useState } from 'react'

const useAttendance = () => {
  const [attendance,setAttendance] = useState([]);
  
  const startWork = async (email,date,entrance) => {
      try {
        const response = await fetch('https://asia-northeast3-notification-aa618.cloudfunctions.net/startWork',{
          method: 'POST',
          body: JSON.stringify({
            email,
            date,
            entrance,
          }),
          headers:{
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        })
        const data = await response.json();
        console.log(data);
        return data; 
      } catch (error) {
        console.error(error);
      }
  }
  const endWork = async (email,date,leave) => {
    try {
      const response = await fetch('https://asia-northeast3-notification-aa618.cloudfunctions.net/endWork',{
        method: 'POST',
        body: JSON.stringify({
          email,
          date,
          leave,
        }),
        headers:{
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json();
      console.log(data);
      return data; 
    } catch (error) {
      console.error(error);
    }
}
const getAttendance = async (email) => {
  try {
    const response = await fetch('https://asia-northeast3-notification-aa618.cloudfunctions.net/getAttendance',{
      method: 'POST',
      body: JSON.stringify({
        email
      }),
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json();
    console.log(data);
    setAttendance(data.attendance);
    return data; 
  } catch (error) {
    console.error(error);
  }
}
  return {attendance, setAttendance, startWork, endWork, getAttendance};
}

export default useAttendance