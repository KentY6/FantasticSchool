import { Header } from "../components/Header";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

export const AuthenticationPage = ({ navigation }) => {
  const [mailAddress, setMailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [authState, setAuthState] = useState("ログイン");

  //デフォルトの ヘッダーを非表示にする
  React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const navigateSelectPage = () => {
    navigation.navigate("先生選択画面", {});
  };

  const goToAccountRegistration = () => {
    if (authState === "ログイン") setAuthState("アカウント登録");
    if (authState === "アカウント登録") setAuthState("ログイン");
  };

  // ヴァリデーション設定
  const getErrorMessage = () => {
    let message = "";
    if (
      mailAddress.length > 0 &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mailAddress)
    ) {
      message = `メールアドレスが正しい形式で
        入力されていません`;
    }
    if (passWord.length > 0 && passWord.length < 6) {
      message = "パスワードは6文字以上入力してください";
    }
    if (
      (mailAddress.length > 0 && !/^[!-~]+$/.test(mailAddress)) ||
      (passWord.length > 0 && !/^[!-~]+$/.test(passWord))
    ) {
      message = "半角英数字で記載してください";
    }
    return setErrorMessage(message);
  };

  return (
    <View style={styles.authenticationPage}>
      <Header title={authState} />
      <View style={styles.authenticationContainer}>
        <View style={styles.authenticationBox}>
          <Text>・メールアドレス</Text>
          <TextInput
            style={styles.inputForm}
            value={mailAddress}
            onChange={(mailAddress) => setMailAddress(mailAddress)}
          />
        </View>
        <View style={styles.authenticationBox}>
          <Text>・パスワード</Text>
          <TextInput
            style={styles.inputForm}
            value={password}
            onChange={(password) => setPassword(password)}
          />
        </View>
        <TouchableOpacity
          style={styles.authenticationButton}
          onPress={navigateSelectPage}
        >
          <Text style={styles.buttonText}>{authState}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.accountRegistration}
          onPress={goToAccountRegistration}
        >
          <Text style={styles.accountRegistrationText}>
            {authState === "ログイン" ? "アカウント登録" : "戻る"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  authenticationPage: { width: "100%" },
  authenticationContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10%",
  },
  authenticationBox: { width: "70%", marginTop: "10%" },
  inputForm: {
    width: "100%",
    marginTop: "5%",
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 10,
    paddingLeft: 10,
    backgroundColor: "white",
    borderRadius: 10,
    fontSize: 18,
  },
  authenticationButton: {
    width: "40%",
    height: 40,
    marginTop: "15%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#82C0ED",
    borderRadius: 20,
  },
  buttonText: { fontSize: 18 },
  accountRegistration: { marginTop: "15%" },
  accountRegistrationText: { color: "blue", fontSize: 18 },
});
