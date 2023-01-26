import { useState } from 'react';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native'


const useSeparateTime = (target) => {
  const [createdTime,setCreatedTime] = useState(
    {
      year:'',
      month:'',
      day:'',
      hours: '',
      minutes: '',
      seconds: '',
    }
  );
  
  useEffect(() => {
    if(!target) return ;
    const time = new Date(target.seconds * 1000);
    const year = time.getFullYear();
    const month = time.getMonth() + 1;
    const day = time.getDate();
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds()
    setCreatedTime(() => ({
      year,
      month,
      day,
      hours,
      minutes,
      seconds
    }))
  }, [target])
  
  return { createdTime };
}

export default useSeparateTime

