import { useContext } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { IconButton } from "react-native-paper";

export const MenuArea = ({ navigation, isActive }) => {
  const {} = useContext(dataContext);

  const navigateSelectPage = () => {
    navigation.navigate("先生選択画面", {});
  };

  const navigateTalkPage = () => {
    navigation.navigate("会話画面");
  };

  return (
    <View style={styles.menuArea}>
      <View>
        <TouchableOpacity onPress={navigateSelectPage}>
          <IconButton
            style={styles.selectIcon}
            icon={isActive === "selectPage" ? "account" : "account-outline"}
            size={50}
          />
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity onPress={navigateTalkPage}>
          <IconButton
            style={styles.talkIcon}
            icon={
              isActive === "talkPage"
                ? "chat-processing"
                : "chat-processing-outline"
            }
            size={50}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  menuArea: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 60,
    backgroundColor: "#7CA8FE",
  },

  selectIcon: { marginRight: "20%", marginLeft: "20%" },
  talkIcon: { marginLeft: "20%" },
});
