
import React from 'react'
import { createDrawerNavigator, DrawerContent, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import BottomNavigator from './BottomNavigator';
import MailScreen from '../screens/MailScreen';
import CalendarScreen from '../screens/CalendarScreen';
import WorksScreen from '../screens/WorksScreen';
import ReportScreen from '../screens/ReportScreen';
import AddressScreen from '../screens/AddressScreen';
import ReservationScreen from '../screens/ReservationScreen';
import SurvayScreen from '../screens/SurvayScreen';
import CommunityScreen from '../screens/CommunityScreen';
import DocumentManagementScreen from '../screens/DocumentManagementScreen';
import OrganizationChartScreen from '../screens/OrganizationChartScreen';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../recoil/userInfo';
import { Text } from 'react-native';
import { View } from 'react-native';
import { Image } from 'react-native';
import { TouchableOpacity } from 'react-native';
import NotoText from '../components/common/NotoText';
const Drawer = createDrawerNavigator();


const CustomDrawer = props => {
  return (
    
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{
          flex:1,
          backgroundColor: "white",
          marginTop:-8,
          }}>

        <View
          style={{
            flex:0.8,
            flexDirection: "row",
            padding: 16,
            marginBottom:8,
            backgroundColor: "#2d63e2",
            alignItems: "center",
          }}>
            <NotoText style={{color:'#fff',fontSize:24,lineHeight:32}}>성원 Works</NotoText>
          {/* <Image source={require("../../assets/userIcon.png")} /> */}
        </View>

        <View style={{flex:12}}>
          <DrawerItemList {...props} />
        </View>

        <View style={{flex:1,justifyContent:'flex-end',alignItems:'flex-end'}}>
          <TouchableOpacity
          style={{padding:16}}
          >
            <Text>Logout</Text>
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>
    
  );
};

const DrawerNavigator = () => {
  const userInfo = useRecoilValue(userInfoState)
  return (
    <Drawer.Navigator screenOptions={{
      headerTransparent:true,
      headerTitleStyle:{color:'#fff',fontSize:4},
      drawerInactiveTintColor:'#a7a7a7',
      drawerType:'back',
      }}
      drawerContent={(props) => <CustomDrawer {...props} /> }
      
      >
      <Drawer.Screen name="Main" component={BottomNavigator} options={{}} />
      {userInfo &&
        <>
      <Drawer.Screen name="Mail" component={MailScreen} options={{title:'메일'}} />
      <Drawer.Screen name="Calendar" component={CalendarScreen} options={{title:'달력'}} />
      <Drawer.Screen name="Works" component={WorksScreen} options={{title:'진행 업무'}} />
      <Drawer.Screen name="Report" component={ReportScreen} options={{title: '보고서 작성'}} />
      <Drawer.Screen name="Address" component={AddressScreen} options={{title: '주소록'}} />
      <Drawer.Screen name="Reservation" component={ReservationScreen} options={{title: '예약'}} />
      <Drawer.Screen name="Survay" component={SurvayScreen} options={{title: '설문'}} />
      <Drawer.Screen name="Community" component={CommunityScreen} options={{title: '커뮤니티'}} />
      <Drawer.Screen name="DocumentManagement" component={DocumentManagementScreen} options={{title: '문서관리'}} />
      <Drawer.Screen name="OrganizationChart" component={OrganizationChartScreen} options={{title: '조직도'}} />
      </>
      }
    </Drawer.Navigator>
  )
}

export default DrawerNavigator

