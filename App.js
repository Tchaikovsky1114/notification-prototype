import { RecoilRoot, useRecoilState } from 'recoil';
import Main from './Main';

// const appConfig = require('./app.json');
// const projectId = appConfig?.expo?.extra?.eas?.projectId;
// const token = (await Notifications.getExpoPushTokenAsync({
// 	projectId
// })).data;



export default function App() {
  
  return (
    <RecoilRoot>
      <Main  />
    </RecoilRoot>
  );
}
