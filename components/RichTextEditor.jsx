import { Modal, Pressable, StyleSheet, Text, View,ScrollView } from 'react-native'
import React, { useRef, useState } from 'react'
import { actions, RichEditor, RichToolbar } from 'react-native-pell-rich-editor'
import { useRecoilState, useRecoilValue } from 'recoil';
import { writeNoticeModalState } from '../recoil/writeNoticeModal';
import { TextInput } from 'react-native-gesture-handler';
import useNotice from '../hooks/useNotice';
import { userInfoState } from '../recoil/userInfo';
import * as ImagePicker from 'expo-image-picker';
import { useEffect } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { storage } from '../firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';




const RichTextEditor = () => {
  const richText = useRef(null);
  const [inputValue, setInputvalue] = useState('');
  const userInfo = useRecoilValue(userInfoState);
  const [title,setTitle] = useState('');
  const [isEmpty,setIsEmpty] = useState(true);
  const { fetchNotice } = useNotice();
  const [isShow,setIsShow] = useRecoilState(writeNoticeModalState);
  const [image,setImage] = useState('');
  const [totalImages,setTotalImages] = useState([]);
  const richTextHandler = (text) => {
    if(text) {
      setInputvalue(text)
      setIsEmpty(false);
      // console.log(inputValue);
    }else{
      setIsEmpty(true);
    }
  }
  const changeTitleHandler = (text) => {
    setTitle(text);
  }


  const submitNoticeHandler = () => {
    // fetchNotice(title,inputValue)
    fetchNotice({
      title:title,
      content:inputValue,
      writer:userInfo.name,
      position: userInfo.position,
      email:userInfo.email,
      department:userInfo.department,
      totalImages: totalImages
    });
    setIsShow(false);
  }

  const uploadImage = async(uri,imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const storageRef = ref(storage, imageName);
    await uploadBytes(storageRef, blob).then((snapshot) => {
      console.log('uploaded a blob or file!');
    })
    // const storageRef = ref(storage,`${imageName}`);
    
  }

  const addImageHandler = async () => {
    const { status } = ImagePicker.requestMediaLibraryPermissionsAsync();
    if(!richText.current || !status === 'granted') return;

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1,1],
        quality: 1,
        // base64:true,
      })

      if(!result.canceled){
        const offset = 1000 * 60 * 60 * 9;
        const koreaTime = new Date((new Date()).getTime() + offset).toISOString().replace("T"," ").split('.')[0];
        
        const storageRef = ref(storage,`images/${userInfo.name}/${koreaTime}`);
        await uploadImage(result.assets[0].uri,`images/${userInfo.name}/${koreaTime}`)
        .then(async () => {
          const downloadUrl = await getDownloadURL(storageRef);
          return downloadUrl;
        })
        .then((url) => {
          console.log('==get download URL==',url);
          setImage(url);
        });
      }
  }

  useEffect(() => {
    if(!image) return;
    setTotalImages((prev) => [...prev,image]);
    // 2번째 인자는 style.
    richText.current?.insertImage(image);
  }, [image]);

  // console.log(totalImages);
  // console.log(inputValue);
  console.log(userInfo.name);

  return (
    <Modal visible={isShow} onRequestClose={() => setIsShow(false)}>
      <KeyboardAvoidingView>
      <ScrollView contentContainerStyle={{paddingHorizontal:8}}>
        
      <View style={{height:72,marginTop:40}}>
        <TextInput
          value={title}
          onChangeText={changeTitleHandler}
          placeholder="공지사항 제목을 입력해주세요."
          style={{position:'relative',fontSize:20,paddingHorizontal:8,borderBottomWidth:1, borderBottomColor:'#2d63e2',height:53}}
        />
      </View>
    <RichToolbar
   editor={richText}
   selectedIconTint="#2d63e2"
   iconTint="#f6f9ff"
   actions={[
     actions.undo,
     actions.redo,
     actions.setBold,
     actions.setItalic,
     actions.insertBulletsList,
     actions.insertOrderedList,
     actions.insertLink,
     actions.setStrikethrough,
     actions.setUnderline,
     actions.insertImage,
   ]}
   onPressAddImage={addImageHandler}
   style={styles.richTextToolbarStyle}
  />
    <RichEditor
      ref={richText}
      placeholder="공지사항 내용을 작성해주세요."
      androidHardwareAccelerationDisabled={true}
      style={styles.richTextEditorStyle}
      initialHeight={900}
      onChange={richTextHandler}
    />
   
    </ScrollView>
    </KeyboardAvoidingView>
    <Pressable
    onPress={submitNoticeHandler}
    style={{height:53,position:'absolute',bottom:0,width:'100%',backgroundColor:'#2d63e2',alignItems:'center',justifyContent:'center'}}
    >
      <Text style={{fontSize:24,textAlign:'center',color:'#fff'}}>게시하기</Text>
    </Pressable>
    </Modal>
  )
}

export default RichTextEditor

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: "#ccaf9b",
    padding: 20,
    alignItems: "center",
  },

  headerStyle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#312921",
    marginBottom: 10,
  },

  htmlBoxStyle: {
    height: 200,
    width: 330,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
  },

  richTextContainer: {
    display: "flex",
    flexDirection: "column-reverse",
    width: "100%",
    marginBottom: 10,
  },

  richTextEditorStyle: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 1,
    borderColor: "#ccaf9b",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    fontSize: 20,
  },

  richTextToolbarStyle: {
    backgroundColor: "#0b2f41",
    
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 1,
  },

  errorTextStyle: {
    color: "#FF0000",
    marginBottom: 10,
  },

  saveButtonStyle: {
    backgroundColor: "#c6c3b3",
    borderWidth: 1,
    borderColor: "#c6c3b3",
    borderRadius: 10,
    padding: 10,
    width: "25%",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    fontSize: 20,
  },

  textButtonStyle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#312921",
  },
});
