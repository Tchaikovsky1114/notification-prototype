import { View, Text } from 'react-native';
import React, { useState } from 'react';

const useNotice = () => {
  const [notices, setNotices] = useState([]);

  const fetchNotice = async ({
    title,
    content,
    writer,
    position,
    email,
    department,
    totalImages,
  }) => {
    try {
      const response = await fetch(
        'https://asia-northeast3-notification-aa618.cloudfunctions.net/createNotice',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title,
            content,
            writer,
            position,
            email,
            department,
            totalImages,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
    }
  };
  const getNotices = async () => {
    try {
      const response = await fetch(
        'https://asia-northeast3-notification-aa618.cloudfunctions.net/getNotices',
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await response.json();
      setNotices(data);
      return data;
    } catch (error) {
      console.error(error);
    }
  };
  const readNotice = async (id,read) => {
    try {
      await fetch('https://asia-northeast3-notification-aa618.cloudfunctions.net/readNotice',
      {
        method:'POST',
        body: JSON.stringify({
          id
        }),
        headers:{
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
    } catch (error) {
      console.error(error);
    }
  }

  const controlLikes = async (id,email) => {
    try {
      const response = await fetch('https://asia-northeast3-notification-aa618.cloudfunctions.net/controlLikes',{
        method: 'POST',
        body: JSON.stringify({
          id,
          email
        }),
        headers:{
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json();
      console.log('===== Likes Result =====',data);
      return data; 
    } catch (error) {
      console.log('===== error =====', error);
    }
  }
  const createReply = async ({id,name,email,reply,department,position}) => {

    try {
      const response = await fetch('https://asia-northeast3-notification-aa618.cloudfunctions.net/createReply',{
        method:'POST',
        headers:{
          Accept:'Application/json',
          'Content-Type':'Application/json'
        },
        body:JSON.stringify({
          id,
          name,
          email,
          reply,
          department,
          position
        })
      })
      const data = response.json();
      console.log(data);
      return data  
    } catch (error) {
      console.error(error);
    }
    
  }
  return { fetchNotice, getNotices, readNotice, controlLikes,createReply };
};

export default useNotice;
