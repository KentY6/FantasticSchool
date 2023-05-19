import { View, Text, StyleSheet } from "react-native";
import { Header } from "../components/Header";
import { MenuArea } from "../components/MenuArea";
import React from "react";

export const TalkPage = ({ navigation }) => {
  //   //デフォルトのヘッダーを非表示にする
  React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <View style={styles.talkPage}>
      <Header title={"会話画面"} />

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
