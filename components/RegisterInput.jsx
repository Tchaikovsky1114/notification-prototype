import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'


const RegisterInput = ({value,onChange,title,placeholder,name}) => {

  return (
      <View style={{height:80,marginVertical:12}}>
        <Text style={{fontSize:20}}>{title}</Text>
        <TextInput cursorColor="#2d63e2" style={{borderBottomWidth:1,height:46,borderBottomColor:'#2d63e2'}} value={value} placeholder={placeholder} onChange={(e) => onChange(e,name)} />
      </View>
  )
}

export default RegisterInput

const styles = StyleSheet.create({})