import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { actions, RichEditor, RichToolbar } from 'react-native-pell-rich-editor'

const RichTextEditor = () => {
  const richText = useRef(null);
  const [inputValue, setInputvalue] = useState('');
  const [isEmpty,setIsEmpty] = useState(true);
  const richTextHandler = (text) => {
    if(text) {
      setInputvalue(text)
      setIsEmpty(false);
      console.log(inputValue);
    }else{
      setIsEmpty(true);
    }
  }
  return (
    <>
    <RichToolbar
   editor={richText}
   selectedIconTint="#2d63e2"
   iconTint="#312921"
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
     
   ]}
   style={styles.richTextToolbarStyle}
  />
    <RichEditor
      ref={richText} // from useRef()
      // onChange={richTextHandle}
      placeholder="공지사항 내용을 작성해주세요."
      androidHardwareAccelerationDisabled={true}
      style={styles.richTextEditorStyle}
      initialHeight={250}
      onChange={richTextHandler}
    />
    <Pressable>
      <Text>글쓰기</Text>
    </Pressable>
    </>
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
    backgroundColor: "#ffa",
    borderColor: "#ffa",
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
