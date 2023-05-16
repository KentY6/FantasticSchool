import { View, Text, StyleSheet } from "react-native";
import { MenuArea } from "../components/MenuArea";

export const SelectTeacherPage = ({ navigation }) => {
  return (
    <View style={styles.selectTeacherPage}>
      <View>
        <Text>SelectTeacher</Text>
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
  bottomMenu: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flex: 2,
  },
});
