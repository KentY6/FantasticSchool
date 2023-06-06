import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { IconButton } from "react-native-paper";

export const Header = ({ title, isActiveMenu, toggleActiveMenu }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity
        style={
          title === "ログイン" || title === "アカウント登録"
            ? styles.nonActive
            : styles.menu
        }
        onPress={toggleActiveMenu}
      >
        <IconButton icon={isActiveMenu === false ? "menu" : "close"} />
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
