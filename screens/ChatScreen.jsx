import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native'

const ChatScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text>ChatScreen</Text>
    </ScrollView>
  )
}

export default ChatScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#fff',
  }
})