import { Pressable, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View,Dimensions } from 'react-native'
import React, { useState } from 'react'
import RenderHTML from 'react-native-render-html';


const {width:deviceWidth} = Dimensions.get('window');

const tagStyles = {
  body: {
    backgroundColor:'#f6f9ff',
    color:'#061457',
    width: deviceWidth > 330 ? 360 : 300,
    padding:32,
    marginTop:16,
    fontSize:24
  }
}



const NoticeCard = ({title,content}) => {
  const { width } = useWindowDimensions();
  const [isContentShow, setIsContentShow] = useState(false);

  const toggleContentHandler = () => {
    setIsContentShow((prev) => !prev);
  }
  console.log(content);
  return (
    <View style={{alignItems:'center',width:'100%',backgroundColor:'#fff'}}>
      <TouchableOpacity
      onPress={toggleContentHandler}
      style={{borderBottomWidth:1,borderBottomColor:'#2d63e2',justifyContent:'center',alignItems:'center',paddingVertical:16,backgroundColor:'#fff',width: width - 48}}>
        <Text style={{fontSize:18}}>{title}</Text>
        <Text style={{fontSize:14}}>제목을 클릭하시면 본문이 나타납니다.</Text>
      </TouchableOpacity>
      {/* title을 클릭하면 해당 글 내용이 아래로 펼쳐지게끔 만들기 */}
      {
      isContentShow &&
       <RenderHTML
       source={{html:content}}
       contentWidth={ width}
       tagsStyles={tagStyles}
       />
      }
    </View>
  )
}

export default NoticeCard

const styles = StyleSheet.create({})