import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PagerView from 'react-native-pager-view';
import { ScrollView } from 'react-native';
import NotoText from '../common/NotoText';

const Report = () => {



  return (

    <PagerView style={styles.container} initialPage={0} >
      <ScrollView key="1" style={{paddingHorizontal:24}}>
        <View style={{marginTop:48}}>
          <NotoText style={{lineHeight:32,fontSize:24,color:'#0cdae0'}}>작성할 보고서</NotoText>
        </View>
      </ScrollView>
      <ScrollView key="2" style={{paddingHorizontal:24}}>  
        <View style={{marginTop:48}}>
        <NotoText style={{lineHeight:32,fontSize:24,color:'#0cdae0'}}>작성한 보고서</NotoText>
        </View>
      </ScrollView>
      <ScrollView key="3" style={{paddingHorizontal:24}}>  
        <View style={{marginTop:48}}>
        <NotoText style={{lineHeight:32,fontSize:24,color:'#0cdae0'}}>보고서 모음</NotoText>
        </View>
      </ScrollView>
    </PagerView>
  )
}

export default Report;

const styles = StyleSheet.create({

  container: {
    backgroundColor:'#000',
    
    flex:1,
  }
})