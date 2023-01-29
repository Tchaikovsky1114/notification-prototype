import { View, Text } from 'react-native'
import React from 'react'

const useAnnualLeave = () => {

  const postAnnualLeave = async (annualLeave) => {
    
    try {
      const response = await fetch(
        'https://asia-northeast3-notification-aa618.cloudfunctions.net/createAnnualLeave',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            annualLeave
          ),
        }
      );
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      
    }
  }

  return { postAnnualLeave }
}

export default useAnnualLeave


