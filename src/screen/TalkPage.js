import { View, Text, StyleSheet } from "react-native";
import { Header } from "../components/Header";
import { MenuArea } from "../components/MenuArea";
import React, { useContext, useState } from "react";
import { TalkArea } from "../components/TalkArea";
import { InputForm } from "../components/InputForm";
import axios from "axios";

export const TalkPage = ({ navigation }) => {
  // 会話履歴を格納するstate
  const [conversationLog, setConversationLog] = useState([]);
  // chatGPT APIの回答を格納する
  const [teachersAnswer, setTeachersAnswer] = useState("");

  //   //デフォルトのヘッダーを非表示にする
  React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  // 選ばれている先生を受け取る
  const { isActiveTeacher } = useContext(dataContext);

  // chatGPTのApiKey
  const chatGptKey = "";
  // chatGPTのエンドポイント
  const chatGptUrl = "https://api.openai.com/v1/chat/completions";
  // chatGptのバージョン
  const chatGptModel = "gpt-3.5-turbo";
  // APIに渡す先生の設定
  const teachersSetting = `Please establish a conversation for the following messages.However, you should be conversing as if you were in the following settings.${isActiveTeacher}`;

  // チャット欄に入力したテキストを送る
  const talkStart = (text) => {
    const newConversationLog = {
      ...conversationLog,
      talkText: text,
      whoseText: "you",
    };
    setConversationLog([...conversationLog, newConversationLog]);
    getChatGptApi(text);
  };

  const getChatGptApi = (text) => {
    try {
      axios.post(
        { chatGptUrl },
        {
          model: chatGptModel,
          message: [
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
      ),
        setTeachersAnswer(response.data.choices[0].message.content.trim());
    } catch (err) {
      console.error(err);
    }
  };
  console.log(teachersAnswer);

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
