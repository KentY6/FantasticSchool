import { View, Text, StyleSheet } from "react-native";
import { Header } from "../components/Header";
import { MenuArea } from "../components/MenuArea";
import React, { useContext, useEffect, useState } from "react";
import { TalkArea } from "../components/TalkArea";
import { InputForm } from "../components/InputForm";
import axios from "axios";
import { CHAT_GPT_KEY } from "@env";

export const TalkPage = ({ navigation }) => {
  // 会話履歴を格納するstate
  const [conversationLog, setConversationLog] = useState([]);
  // chatGPT APIの回答を格納するstate
  const [teachersAnswer, setTeachersAnswer] = useState("");
  // 翻訳結果を格納するstate
  const [translationText, setTranslationText] = useState("");

  //   //デフォルトのヘッダーを非表示にする
  React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  // 選ばれている先生を受け取る
  const { isActiveTeacher } = useContext(dataContext);

  // chatGPTのApiKey
  const chatGptKey = CHAT_GPT_KEY;
  // chatGPTのエンドポイント
  const chatGptUrl = "https://api.openai.com/v1/chat/completions";
  // chatGptのバージョン
  const chatGptModel = "gpt-3.5-turbo";
  // APIに渡す先生の設定
  const teachersSetting = `You are not an AI.Please answer the questions by pretending to be a person from the following settings.■This is your settings.name:${isActiveTeacher.Name},age:${isActiveTeacher.Age},sex:${isActiveTeacher.Sex},job:${isActiveTeacher.Job} `;

  // チャット欄に入力したテキストを送る
  const talkStart = (text) => {
    if (text.length === 0) return;
    const newConversationLog = {
      ...conversationLog,
      talkText: text,
      whoseText: "you",
    };
    setConversationLog([...conversationLog, newConversationLog]);
    getChatGptApi(text);
  };

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
            // 一つ前のの会話を渡す
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
      setTeachersAnswer(response.data.choices[0].message.content.trim());
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (teachersAnswer.length === 0) return;
    const newConversationLog = {
      ...conversationLog,
      talkText: teachersAnswer,
      whoseText: "teacher",
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
        translationText={translationText}
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
