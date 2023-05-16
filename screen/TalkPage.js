import { View, Text, StyleSheet } from "react-native";
import { MenuArea } from "../components/MenuArea";

export const TalkPage = ({ navigation }) => {
  return (
    <View style={styles.talkPage}>
      <Text>TalkPage</Text>

      <View style={styles.bottomMenu}>
        <MenuArea navigation={navigation} isActive={"talkPage"} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  talkPage: { alignItems: "center", width: "100%", flex: 8 },
  bottomMenu: {
    flex: 2,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});
