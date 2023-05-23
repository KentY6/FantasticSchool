import { View, StyleSheet, Text } from "react-native";
import { MenuArea } from "../components/MenuArea";
import { TeachersList } from "../components/TeachersList";
import { Header } from "../components/Header";
import React, { useContext } from "react";

export const SelectTeacherPage = ({ navigation }) => {
  // // stateを受け取る
  const { isActiveTeacher, setIsActiveTeacher } = useContext(dataContext);

  // 先生切り替え機能
  const toggleActiveTeacher = (data) => {
    setIsActiveTeacher(data);
  };

  //デフォルトの ヘッダーを非表示にする
  React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <View style={styles.selectTeacherPage}>
      <Header title={"先生選択画面"} />
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
});
