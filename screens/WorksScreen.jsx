import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native'
import NotoText from '../components/common/NotoText'

const WorksScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex:1,paddingTop:48,paddingHorizontal:24}}>
        <View style={{borderBottomWidth:1,borderBottomColor:'#f41'}}>
          <NotoText style={{fontSize:20}}>Progress</NotoText>
        </View>
      </View>
      
    </SafeAreaView>
  )
}

export default WorksScreen

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#fff'
  }
})