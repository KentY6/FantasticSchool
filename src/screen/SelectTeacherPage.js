import { View, StyleSheet, Text } from "react-native";
import { MenuArea } from "../components/MenuArea";
import { TeachersList } from "../components/TeachersList";
import { Header } from "../components/Header";
import React, { useContext } from "react";
import { LogoutPage } from "./LogoutPage";

export const SelectTeacherPage = ({ navigation }) => {
  // // contextを受け取る
  const {
    isActiveTeacher,
    setIsActiveTeacher,
    toggleActiveMenu,
    isActiveMenu,
    setIsActiveMenu,
  } = useContext(dataContext);

  // 先生切り替え機能
  const toggleActiveTeacher = (data) => {
    setIsActiveTeacher(data);
  };

  // デフォルトの ヘッダーを非表示にする
  React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <View style={styles.selectTeacherPage}>
      <Header
        style={styles.header}
        title={"先生選択画面"}
        isActiveMenu={isActiveMenu}
        toggleActiveMenu={toggleActiveMenu}
      />
      <View
        style={isActiveMenu === false ? styles.nonActive : styles.activeMenu}
      >
        <LogoutPage navigation={navigation} setIsActiveMenu={setIsActiveMenu} />
      </View>
      <View style={styles.selectMsg}>
        <Text style={styles.selectMsgText}>Select Your Teacher</Text>
        <Text style={styles.selectMsgText}>好きな先生を選んでみよう！</Text>
      </View>

      <View style={styles.teachers}>
        <TeachersList
          isActiveTeacher={isActiveTeacher}
          toggleActiveTeacher={toggleActiveTeacher}
        />
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
  header: { zIndex: 2, position: "absolute" },
  selectMsg: {
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  selectMsgText: { fontSize: 20 },
  teachers: { marginTop: "5%", marginBottom: "55%" },
  bottomMenu: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flex: 2,
  },
  activeMenu: {
    width: "100%",
    height: "100%",
    marginTop: 30,
    zIndex: 1,
    backgroundColor: "white",
  },
  nonActive: { display: "none" },
});
