import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { IconButton } from "react-native-paper";

export const Header = ({ title }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity
        style={title === "ログイン" ? styles.nonActive : styles.menu}
      >
        <IconButton icon={"menu"} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: "10%",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  title: { fontWeight: "bold", fontSize: 18 },
  menu: { position: "absolute", right: 0 },
  nonActive: { display: "none" },
});
