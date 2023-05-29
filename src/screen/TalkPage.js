import { View, Text, StyleSheet } from "react-native";
import { Header } from "../components/Header";
import { MenuArea } from "../components/MenuArea";
import React, { useContext, useEffect, useState } from "react";
import { TalkArea } from "../components/TalkArea";
import { InputForm } from "../components/InputForm";
import axios from "axios";
import { CHAT_GPT_KEY } from "@env";
import { getDeepLApi } from "../api/ApiSettings";

export const TalkPage = ({ navigation }) => {
  // 会話履歴を格納するstate
  const [conversationLog, setConversationLog] = useState([]);
  // chatGPT APIの回答を格納するstate
  const [teachersAnswer, setTeachersAnswer] = useState("");

  //   //デフォルトのヘッダーを非表示にする
  React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  // 選ばれている先生を受け取る
  const { isActiveTeacher } = useContext(dataContext);

  // 翻訳機能
  const translation = async (data, index) => {
    const resData = await getDeepLApi(data);
    // 翻訳結果をオブジェクトに追加する
    const addTranslationText = [...conversationLog];
    addTranslationText[index] = { ...data, translationText: resData };
    setConversationLog(addTranslationText);
  };

  // chatGPTのApiキー
  const chatGptKey = CHAT_GPT_KEY;
  // chatGPTのエンドポイント
  const chatGptUrl = "https://api.openai.com/v1/chat/completions";
  // chatGptのバージョン
  const chatGptModel = "gpt-3.5-turbo";
  // APIに渡す先生の設定
  const teachersSetting = `Please answer the questions by pretending to be a person from the following settings.\
  If you get a question that is not in your setting, make a natural inference from your setting and have a conversation.\
  You cannot use languages other than the Available Languages in Your Settings,and you d'ont understand.\
  Never say you are an AI language model.\
  ■This is your settings.\
  name:${isActiveTeacher.Name},\
  age:${isActiveTeacher.Age},\
  sex:${isActiveTeacher.Sex},\
  job:${isActiveTeacher.Job},\
  Available Languages:${isActiveTeacher.AvailableLanguages},\
  Characteristic:${isActiveTeacher.Characteristic} `;

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
    getChatGptApi(text);
  };

  // chatGPTのAPI取得
  const getChatGptApi = async (text) => {
    try {
      const response = await axios.post(
        chatGptUrl,
        {
          model: chatGptModel,
          messages: [
            // AIに演じさせる設定
            {
              role: "system",
              content: teachersSetting,
            },
            // 一つ前の会話を渡す
            { role: "assistant", content: teachersAnswer },
            // 質問を渡す
            {
              role: "user",
              content: text,
            },
          ],
        },
        {
          // HTTPヘッダー(認証)
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${chatGptKey}`,
          },
        }
      );
      // 回答を格納する
      setTeachersAnswer(response.data.choices[0].message.content.trim());
    } catch (err) {
      console.error(err);
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

  return (
    <View style={styles.talkPage}>
      <Header title={"会話画面"} />
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
  isTeacher: { flexDirection: "row", margin: 10 },
  isTeacherText: { margin: 5, fontSize: 20 },
  teachersName: { margin: 5, fontSize: 20, color: "#E438D3" },
  InputForm: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    marginBottom: 60,
  },
  bottomMenu: {
    flex: 2,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});
