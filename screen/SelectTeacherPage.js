import { View, Text, StyleSheet } from "react-native";
import { MenuArea } from "../components/MenuArea";
import { TeachersList } from "../components/TeachersList";
import React from "react";
import { Header } from "../components/Header";

export const SelectTeacherPage = ({ navigation }) => {
  //デフォルトの ヘッダーを非表示にする
  React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const teachers = [
    {
      Name: "Mike",
      Age: 28,
      Sex: "Male",
      Job: "English Teacher",
      Img: require("../assets/img/Mike.png"),
    },
    {
      Name: "Judy",
      Age: 56,
      Sex: "Female",
      Job: "House Wife",
      Img: require("../assets/img/Judy.png"),
    },
    {
      Name: "Johann",
      Age: 10,
      Sex: "Male",
      Job: "Elementary School Student",
      Img: require("../assets/img/Johann.png"),
    },
    {
      Name: "Chris",
      Age: 21,
      Sex: "Female",
      Job: "Waitress",
      Img: require("../assets/img/Chris.png"),
    },
    {
      Name: "Andy",
      Age: 45,
      Sex: "Male",
      Job: "Office Worker",
      Img: require("../assets/img/Andy.png"),
    },
  ];

  return (
    <View style={styles.selectTeacherPage}>
      <Header title={"先生選択画面"} />
      <View style={styles.teachers}>
        <TeachersList teachers={teachers} />
      </View>

      <View style={styles.bottomMenu}>
        <MenuArea navigation={navigation} isActive={"selectPage"} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  selectTeacherPage: {
    alignItems: "center",
    width: "100%",
    position: "relative",
    flex: 8,
  },
  teachers: { marginTop: "5%", marginBottom: "35%" },
  bottomMenu: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flex: 2,
  },
});
