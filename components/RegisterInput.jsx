import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'


const RegisterInput = ({value,onChange,title,placeholder,name}) => {

  return (
      <View style={{height:80,marginVertical:12}}>
        <Text style={{fontSize:20,color:'#fff'}}>{title}</Text>
        <TextInput cursorColor="#0cdae0" style={{borderBottomWidth:1,height:46,borderBottomColor:'#0cdae0',color:'#fff'}} value={value} placeholder={placeholder} onChange={(e) => onChange(e,name)} />
      </View>
  )
}

export default RegisterInput

const styles = StyleSheet.create({})