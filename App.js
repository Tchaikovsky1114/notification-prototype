import { RecoilRoot, useRecoilState } from 'recoil';
import Main from './Main';
import { RootSiblingParent } from 'react-native-root-siblings';
import { useFonts } from 'expo-font';
import { useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { View } from 'react-native';


SplashScreen.preventAutoHideAsync();
// const appConfig = require('./app.json');
// const projectId = appConfig?.expo?.extra?.eas?.projectId;
// const token = (await Notifications.getExpoPushTokenAsync({
// 	projectId
// })).data;



export default function App() {
  
  const [fontsLoaded] = useFonts({
    'Noto400' : require('./assets/fonts/NotoSansKR-Regular.otf'),
    'Noto500' : require('./assets/fonts/NotoSansKR-Medium.otf'),
    'Noto700' : require('./assets/fonts/NotoSansKR-Bold.otf'),
  })

  const onLayoutRootView = useCallback(async() => {
    if(fontsLoaded) {
      await SplashScreen.hideAsync()
    }
  },[fontsLoaded]);

  if(!fontsLoaded) {
    return null;
  }

  return (
    <RecoilRoot>
      <RootSiblingParent>
        <View style={{flex:1}} onLayout={onLayoutRootView}>
        <Main onLayoutRootView={onLayoutRootView} />      
        </View>
      </RootSiblingParent>
    </RecoilRoot>
  );
}
