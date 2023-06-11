import { View, Text, StyleSheet } from "react-native";
import { Header } from "../components/Header";
import React, { useContext, useEffect, useState, Alert } from "react";
import { TalkArea } from "../components/TalkArea";
import { InputForm } from "../components/InputForm";
import { getChatGptApi, getDeepLApi } from "../api/ApiSettings";
import { LogoutPage } from "./LogoutPage";
import { auth, db } from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const TalkPage = ({ navigation }) => {
  // chatGPT APIの回答を格納するstate
  const [teachersAnswer, setTeachersAnswer] = useState("");
  // 先生からの返答トークン数をカウントする
  const [tokenCount, setTokenCount] = useState(0);
  // データベースから受け取るトークン数
  const [usersTokenCount, setUsersTokenCount] = useState(0);
  // データベースから受け取る日付
  const [usersTodayData, setUsersTodayData] = useState("");

  //   //デフォルトのヘッダーを非表示にする
  React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  // contextを受け取る
  const {
    isActiveTeacher,
    toggleActiveMenu,
    isActiveMenu,
    setIsActiveMenu,
    conversationLog,
    setConversationLog,
  } = useContext(dataContext);

  // チャット欄に入力したテキストを送る
  const talkStart = (text) => {
    if (text.length === 0) return;
    const newConversationLog = {
      ...conversationLog,
      talkText: text,
      whoseText: "student",
      translationText: "",
    };
    setConversationLog([...conversationLog, newConversationLog]);
    // チャットGPTのAPIを叩きにいく
    getTeachersAnswer(text);
    // トークンに自分が入力したテキストをセット
    setTokenCount(tokenCount + text.length);
  };

  // 先生からの返答を受け取る
  const getTeachersAnswer = async (text) => {
    if (tokenCount < 20000) {
      const resData = await getChatGptApi(
        text,
        teachersAnswer,
        isActiveTeacher
      );
      setTeachersAnswer(resData);
      // 先生の返答をトークンとしてカウントする
      setTokenCount(tokenCount + resData.length);
    }
    //  1日20000文字を超える場合、キャンセルされる
    else {
      alert("本日入力できる回数はここまでとなります。翌日にご利用ください");
    }
  };

  // chatGPTからの返答を会話ログに追加する
  useEffect(() => {
    if (teachersAnswer.length === 0) return;
    const newConversationLog = {
      ...conversationLog,
      talkText: teachersAnswer,
      whoseText: "teacher",
      translationText: "",
    };
    setConversationLog([...conversationLog, newConversationLog]);
  }, [teachersAnswer]);

  // 翻訳機能
  const translation = async (data, index) => {
    const resData = await getDeepLApi(data);
    // 翻訳結果を回答オブジェクトに追加する
    const addTranslationText = [...conversationLog];
    addTranslationText[index] = { ...data, translationText: resData };
    setConversationLog(addTranslationText);
  };

  // 今日の日付を取得
  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth() + 1;
  let date = today.getDate();
  let todayIs = year + "/" + month + "/" + date;

  const user = auth.currentUser;

  // ユーザーデータ(トークン)取得
  const getUsersTokenCount = async () => {
    const userDataRef = doc(db, `users/${user.uid}/tokenCount/tokenCount`);
    const userTokenCountDocSnap = await getDoc(userDataRef);
    if (userTokenCountDocSnap.exists()) {
      const getTokenCountData = userTokenCountDocSnap.data().tokenCount;
      setUsersTokenCount(getTokenCountData);
    } else {
      return;
    }
  };

  // ユーザーデータ(日付)取得
  const getUsersDateData = async () => {
    const userDataRef = doc(db, `users/${user.uid}/todayIs/todayIs`);
    const userDateDataDocSnap = await getDoc(userDataRef);
    if (userDateDataDocSnap.exists()) {
      const getDateData = userDateDataDocSnap.data().todayIs;
      setUsersTodayData(getDateData);
    } else {
      return;
    }
  };
  useEffect(() => {
    getUsersTokenCount();
    getUsersDateData();
  }, []);

  // 同日の場合取得したトークンをセットする
  useEffect(() => {
    if (usersTodayData === todayIs) {
      setTokenCount(usersTokenCount);
    }
  }, [usersTodayData]);

  // トークンを保存する機能
  const saveTokenCount = async () => {
    const tokenCountDocRef = doc(db, `users/${user.uid}/tokenCount/tokenCount`);
    try {
      await setDoc(tokenCountDocRef, { tokenCount });
    } catch (error) {
      console.error(error);
    }
  };
  // 日付を保存する機能
  const saveDateData = async () => {
    const DateDataDocRef = doc(db, `users/${user.uid}/todayIs/todayIs`);
    try {
      await setDoc(DateDataDocRef, { todayIs });
    } catch (error) {
      console.error(error);
    }
  };
  // トークンと日付をデータベースにセットする
  useEffect(() => {
    if (tokenCount !== 0) {
      saveTokenCount();
      saveDateData();
    }
  }, [getTeachersAnswer]);

  return (
    <View style={styles.talkPage}>
      <Header
        style={styles.header}
        title={"会話画面"}
        toggleActiveMenu={toggleActiveMenu}
        isActiveMenu={isActiveMenu}
      />
      <View
        style={isActiveMenu === false ? styles.nonActive : styles.activeMenu}
      >
        <LogoutPage navigation={navigation} setIsActiveMenu={setIsActiveMenu} />
      </View>
      <View style={styles.isTeacher}>
        <Text style={styles.isTeacherText}>Teacher is</Text>
        <Text style={styles.teachersName}>{isActiveTeacher.Name}</Text>
      </View>

      <TalkArea
        isActiveTeacher={isActiveTeacher}
        conversationLog={conversationLog}
        translation={translation}
      />

      <View style={styles.InputForm}>
        <InputForm talkStart={talkStart} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  talkPage: { alignItems: "center", width: "100%", flex: 8 },
  header: { zIndex: 2, position: "absolute" },
  isTeacher: { flexDirection: "row", margin: 10 },
  isTeacherText: { margin: 5, fontSize: 20 },
  teachersName: { margin: 5, fontSize: 20, color: "#E438D3" },
  InputForm: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    zIndex: 0,
  },
  activeMenu: {
    width: "100%",
    height: "100%",
    marginTop: 30,
    zIndex: 1,
    backgroundColor: "white",
  },
  nonActive: { display: "none" },
});
