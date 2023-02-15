import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const NotoText = ({style,children}) => {
  return <Text style={[{fontFamily:'Noto400',letterSpacing:0.1},style]}>{children}</Text>
    
  
}

export default NotoText

