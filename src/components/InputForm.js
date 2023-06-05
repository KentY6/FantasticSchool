import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";

export const InputForm = ({ talkStart }) => {
  const [text, setText] = useState("");

  const submitText = () => {
    talkStart(text);
    setText("");
  };

  return (
    <View style={styles.inputForm}>
      <TouchableOpacity style={styles.sendIconBox} onPress={submitText}>
        <IconButton style={styles.sendIcon} icon="send" size={20} />
      </TouchableOpacity>
      <TextInput
        style={styles.textInput}
        value={text}
        onChangeText={(text) => setText(text)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputForm: {
    flexDirection: "row",
    width: "100%",
    height: 50,
    backgroundColor: "#C3DDFC",
    alignItems: "center",
    justifyContent: "center",
  },
  sendIconBox: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 15,
    margin: 10,
  },
  sendIcon: { width: 25, height: 25 },
  textInput: {
    width: "60%",
    backgroundColor: "white",
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
  },
});
