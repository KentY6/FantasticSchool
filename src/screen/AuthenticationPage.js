import { Header } from "../components/Header";
import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import "firebase/auth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
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
  // ログインかアカウント登録を判断
  const [authState, setAuthState] = useState("ログイン");

  //デフォルトの ヘッダーを非表示にする
  React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  // アカウント登録画面に切り替え
  const goToAccountRegistration = () => {
    if (authState === "ログイン") setAuthState("アカウント登録");
    if (authState === "アカウント登録") setAuthState("ログイン");
    setMailAddress("");
    setPassword("");
  };

  // ヴァリデーション設定
  const getErrorMessage = () => {
    let message = "";
    if (
      mailAddress.length > 0 &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mailAddress)
    ) {
      message = `メールアドレスが正しい形式で\n
        入力されていません`;
    }
    if (password.length > 0 && password.length < 6) {
      message = "パスワードは6文字以上入力してください";
    }
    if (
      (mailAddress.length > 0 && !/^[!-~]+$/.test(mailAddress)) ||
      (password.length > 0 && !/^[!-~]+$/.test(password))
    ) {
      message = "半角英数字で記載してください";
    }
    return setErrorMessage(message);
  };

  useEffect(() => {
    getErrorMessage();
  }, [mailAddress, password]);

  // サインアップ機能
  const signUp = async () => {
    if (errorMessage === "") {
      try {
        await createUserWithEmailAndPassword(auth, mailAddress, password);
        setMailAddress("");
        setPassword("");
        setAuthState("ログイン");
        navigation.navigate("Menu");
      } catch (err) {
        console.error(err);
      }
    }
  };

  // ログイン機能
  const logIn = async () => {
    if (errorMessage === "") {
      try {
        await signInWithEmailAndPassword(auth, mailAddress, password);
        setMailAddress("");
        setPassword("");
        navigation.navigate("Menu");
      } catch (err) {
        console.error(err);
      }
    }
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
            onChange={(e) => setMailAddress(e.nativeEvent.text)}
          />
        </View>
        <View style={styles.authenticationBox}>
          <Text>・パスワード</Text>
          <TextInput
            style={styles.inputForm}
            value={password}
            secureTextEntry={true}
            onChange={(e) => setPassword(e.nativeEvent.text)}
          />
        </View>
        <View
          style={
            errorMessage.length === 0 ? styles.nonActive : styles.errorMessage
          }
        >
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
        <TouchableOpacity
          style={styles.authenticationButton}
          onPress={
            authState === "アカウント登録" ? () => signUp() : () => logIn()
          }
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
  errorMessage: { margin: "10%" },
  errorText: { color: "red" },
  nonActive: { display: "none" },
});
