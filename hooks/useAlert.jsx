
import { Alert } from 'react-native'

const useAlert = () => {

    const alert = ({title,content,buttonText1,buttonText2,cancelable,onPress}) => {
      return Alert.alert(
        title,
        content,
        [{
          text: buttonText1,
          onPress: onPress,
          style:'destructive'
        },
        {
          text: buttonText2,
          onPress: () => {},
          style:'cancel'
        }],
        {
          cancelable: cancelable,
        }    
      )
    }
    
  return { alert }
  
}

export default useAlert