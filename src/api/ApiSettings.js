import axios from "axios";
import { CHAT_GPT_KEY, DEEPL_KEY } from "@env";

// chatGPTのApiキー
export const chatGptKey = CHAT_GPT_KEY;
// chatGPTのエンドポイント
export const chatGptUrl = "https://api.openai.com/v1/chat/completions";
// chatGptのバージョン
export const chatGptModel = "gpt-3.5-turbo";

// APIに渡す先生の設定
export const teachersSetting = (isActiveTeacher) => {
  const setting = `Please answer the questions by pretending to be a person from the following settings.\
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
  return setting;
};

// deepLのApiキー
export const deepLKey = `DeepL-Auth-Key ${DEEPL_KEY}`;
// deppLのエンドポイント
export const deepLUrl = "https://api-free.deepl.com/v2/translate";

// chatGPTのAPI取得
export const getChatGptApi = async (text, teachersAnswer, isActiveTeacher) => {
  try {
    const response = await axios.post(
      chatGptUrl,
      {
        model: chatGptModel,
        messages: [
          // AIに演じさせる設定
          {
            role: "system",
            content: teachersSetting(isActiveTeacher),
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
    const getData = response.data.choices[0].message.content.trim();
    return getData;
  } catch (err) {
    console.error(err);
  }
};

// DeepLのAPIで翻訳する
export const getDeepLApi = async (data) => {
  try {
    const response = await axios.post(
      deepLUrl,
      {
        text: data.talkText,
        target_lang: "JA",
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: deepLKey,
        },
      }
    );
    const getData = response.data.translations[0].text;
    return getData;
  } catch (err) {
    console.error(err);
  }
};
