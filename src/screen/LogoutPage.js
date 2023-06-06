import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { auth } from "../../firebase";
import "firebase/auth";

export const LogoutPage = ({ navigation, setIsActiveMenu }) => {
  // ログアウト機能
  const logOut = async () => {
    try {
      await auth.signOut();
      setIsActiveMenu(false);
      navigation.navigate("認証画面");
    } catch (err) {
      console.error(err);
    }
  };

  // サインアウト機能
  const signOut = () => {
    const user = auth.currentUser;
    try {
      const deleteAccount = async () => {
        await user.delete();
        setIsActiveMenu(false);
        navigation.navigate("認証画面");
      };
      Alert.alert(
        "確認",
        "アカウントを削除しますか？",
        [
          { text: "実行する", onPress: deleteAccount },
          { text: "キャンセル", style: "cancel" },
        ],
        { cancelable: false }
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View style={styles.logoutPage}>
      <TouchableOpacity style={styles.logoutButton} onPress={() => logOut()}>
        <Text style={styles.text}>ログアウト</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.accountDelete} onPress={() => signOut()}>
        <Text style={styles.deleteText}>アカウント削除</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  logoutPage: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  logoutButton: {
    width: 230,
    height: 40,
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#82C0ED",
    borderRadius: 20,
  },
  accountDelete: {
    margin: 40,
  },
  text: { fontSize: 18 },
  deleteText: { fontSize: 18, color: "blue" },
});
