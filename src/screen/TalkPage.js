import { View, Text, StyleSheet } from "react-native";
import { Header } from "../components/Header";
import { MenuArea } from "../components/MenuArea";
import React, { useContext, useEffect, useState, Alert } from "react";
import { TalkArea } from "../components/TalkArea";
import { InputForm } from "../components/InputForm";
import { getChatGptApi, getDeepLApi } from "../api/ApiSettings";
import { LogoutPage } from "./LogoutPage";

export const TalkPage = ({ navigation }) => {
  // 会話履歴を格納するstate
  const [conversationLog, setConversationLog] = useState([]);
  // chatGPT APIの回答を格納するstate
  const [teachersAnswer, setTeachersAnswer] = useState("");
  // 先生からの返答トークン数をカウントする
  const [tokenCount, setTokenCount] = useState(0);

  //   //デフォルトのヘッダーを非表示にする
  React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  // contextを受け取る
  const { isActiveTeacher, toggleActiveMenu, isActiveMenu, setIsActiveMenu } =
    useContext(dataContext);

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
    getTeachersAnswer(text);
  };

  // 先生からの返答を受け取る
  const getTeachersAnswer = async (text) => {
    if (tokenCount < 10000) {
      const resData = await getChatGptApi(
        text,
        teachersAnswer,
        isActiveTeacher
      );
      setTeachersAnswer(resData);
      // 先生の返答をトークンとしてカウントする
      setTokenCount(tokenCount + resData.length);
    }
    //  1日10000文字を超える場合、キャンセルされる
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

      <View style={styles.bottomMenu}>
        <MenuArea navigation={navigation} isActive={"talkPage"} />
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
    marginBottom: 60,
    zIndex: 0,
  },
  bottomMenu: {
    flex: 2,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
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
