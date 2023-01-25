import { View, Text } from 'react-native'
import React, { useState } from 'react'

const useNotice = () => {
  const [notices,setNotices] = useState([]);
  const fetchNotice = async ({title,content}) => {
      try {
        const response = await fetch('https://asia-northeast3-notification-aa618.cloudfunctions.net/createNotice',{
          method:'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title:title,
            content: content
          }),
        })
        const data = await response.json();
        console.log(data);
        return data;
      } catch (error) {
        console.error(error);
      }
  }
  const getNotices = async () => {
    try {
      const response = await fetch('https://asia-northeast3-notification-aa618.cloudfunctions.net/getNotices',{
          method:'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
        })
        const data = await response.json();
        setNotices(data);
        return data;
    } catch (error) {
      console.error(error);
    }
  }

  return { fetchNotice, getNotices,notices };
}

export default useNotice