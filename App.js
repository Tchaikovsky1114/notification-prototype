import { RecoilRoot, useRecoilState } from 'recoil';
import Main from './Main';
import { RootSiblingParent } from 'react-native-root-siblings';
// const appConfig = require('./app.json');
// const projectId = appConfig?.expo?.extra?.eas?.projectId;
// const token = (await Notifications.getExpoPushTokenAsync({
// 	projectId
// })).data;



export default function App() {
  

  return (
    <RecoilRoot>
      <RootSiblingParent>
        <Main  />      
      </RootSiblingParent>
    </RecoilRoot>
  );
}
