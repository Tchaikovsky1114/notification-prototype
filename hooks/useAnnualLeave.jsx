import { useState } from 'react'

const useAnnualLeave = () => {
  const [annual,setAnnual] = useState();
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
  const getAnnualLeave = async(email) => {
    try {
      const response = await fetch(
        `https://asia-northeast3-notification-aa618.cloudfunctions.net/getAnnualLeave?email=${email}`,
        {
          method:'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            
          },
        }
      )
      const data = await response.json();
      setAnnual(data);
      return data;
    } catch (error) {
      console.error(error)
    }
  }
  return { postAnnualLeave, getAnnualLeave, annual }
}

export default useAnnualLeave


