import { View, Text, StyleSheet } from "react-native";
import { Header } from "../components/Header";
import { MenuArea } from "../components/MenuArea";
import React, { useContext } from "react";
import { TalkArea } from "../components/TalkArea";
import { InputForm } from "../components/InputForm";

export const TalkPage = ({ navigation }) => {
  //   //デフォルトのヘッダーを非表示にする
  React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const { isActiveTeacher } = useContext(dataContext);

  return (
    <View style={styles.talkPage}>
      <Header title={"会話画面"} />
      <View style={styles.isTeacher}>
        <Text style={styles.isTeacherText}>Teacher is</Text>
        <Text style={styles.teachersName}>{isActiveTeacher.Name}</Text>
      </View>

      <TalkArea isActiveTeacher={isActiveTeacher} />

      <View style={styles.InputForm}>
        <InputForm />
      </View>

      <View style={styles.bottomMenu}>
        <MenuArea navigation={navigation} isActive={"talkPage"} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  talkPage: { alignItems: "center", width: "100%", flex: 8 },
  isTeacher: { flexDirection: "row", margin: 10 },
  isTeacherText: { margin: 5, fontSize: 20 },
  teachersName: { margin: 5, fontSize: 20, color: "#E438D3" },
  InputForm: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    marginBottom: 60,
  },
  bottomMenu: {
    flex: 2,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});
