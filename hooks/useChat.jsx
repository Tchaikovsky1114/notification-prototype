
const useChat = () => {

  const createChatRoom = async (sender,receiver) => {
    try {
       await fetch('https://asia-northeast3-notification-aa618.cloudfunctions.net/createChatRooms',{
        method: 'POST',
        body: JSON.stringify({
          sender,
          receiver,
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

  const fetchChat = async (receiver,sender,message) => {
    try {
      const response = await fetch('https://asia-northeast3-notification-aa618.cloudfunctions.net/chat',{
        method: 'POST',
        body: JSON.stringify({
          "receiver":receiver,
          "sender":sender,
          "message":message
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
  return { fetchChat, createChatRoom }
}

export default useChat