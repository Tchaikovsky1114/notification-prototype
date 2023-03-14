import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NotoText from '../common/NotoText'


const obj = [{
  adpia: [{
    chairman: [{name:'정대원',position:'대표이사'}],
    vice: [{name:'최태자', position:'부사장'}],
    executives: [{name:'정창희', position:'이사'},{name:'정여진', position:'이사'}],
    audit: [{name:'정주원', position:'감사'}],
    vipManagement: [[{name:'이연희A', position:'팀장'},{name:'오지영', position:'팀원'},{name:'김지영', position:'파트원'},{name:'노승희', position:'파트원'}]],
    businessSupport: [
      { name:'임일수', position:'부장'},
      { accounting:[{name:'최민정', position:'파트원'},{name:'김진현', position:'파트원'},{name:'이민희', position:'파트원'}]},
      { personnelAffairs: [{name:'김규', position:'파트장'},{name:'홍나희', position:'파트원'},{name:'황보정화', position:'파트원'},{name:'문정현', position:'파트원'},{name:'김지연', position:'과장'}]},    
    ]
  }]
},
{
  adpiamall: [{
    chairman: [{name:'정창희', position:'대표이사'}]
  }]
}

]

const Address = () => {
  
  return (
    <ScrollView style={{backgroundColor:'#000'}}>
      <View style={{marginTop:48,paddingHorizontal:24,}}>
      <NotoText style={{fontSize:24}}>주소록</NotoText>
      
      </View>
    </ScrollView>
  )
}

export default Address