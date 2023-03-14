import { RecoilRoot, useRecoilState } from 'recoil';
import Main from './Main';
import { RootSiblingParent } from 'react-native-root-siblings';
import { useFonts } from 'expo-font';
import { useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';


// SplashScreen.preventAutoHideAsync();




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
          <StatusBar style='inverted'  />
           <Main onLayoutRootView={onLayoutRootView} />      
         </View>
       </RootSiblingParent>
     </RecoilRoot>
  );
}
