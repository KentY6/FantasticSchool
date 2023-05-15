import { View, StyleSheet } from "react-native";
import { SelectTeacherPage } from "./SelectTeacherPage";

export const Main = () => {
  return (
    <View style={styles.main}>
      <SelectTeacherPage />
    </View>
  );
};

const styles = StyleSheet.create({
  main: { width: "100%", marginTop: "10%" },
});
