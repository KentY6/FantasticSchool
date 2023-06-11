import { SelectTeacherPage } from "./SelectTeacherPage";
import { TalkPage } from "./TalkPage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState, createContext } from "react";
import { AuthenticationPage } from "./AuthenticationPage";
import { MenuTab } from "../components/MenuTab";

const Stack = createNativeStackNavigator();
dataContext = createContext();

export const Main = () => {
  // どの先生が選ばれているか
  const [isActiveTeacher, setIsActiveTeacher] = useState({
    Name: "Mike",
    Age: 28,
    Sex: "Male",
    Job: "English Teacher",
    Img: require("../../assets/img/Mike.png"),
  });

  // 会話履歴を格納するstate
  const [conversationLog, setConversationLog] = useState([]);

  // メニュー画面のオンオフ
  const [isActiveMenu, setIsActiveMenu] = useState(false);

  // メニューボタンのオンオフ切り替え機能
  const toggleActiveMenu = () => {
    setIsActiveMenu(!isActiveMenu);
  };

  // useContextでstateを各コンポーネントに渡す
  const contextValue = {
    isActiveTeacher,
    setIsActiveTeacher,
    isActiveMenu,
    setIsActiveMenu,
    toggleActiveMenu,
    conversationLog,
    setConversationLog,
  };

  return (
    <NavigationContainer>
      <dataContext.Provider value={contextValue}>
        <Stack.Navigator>
          <Stack.Screen name="認証画面" component={AuthenticationPage} />
          <Stack.Screen name="Menu" component={MenuTab} />
        </Stack.Navigator>
      </dataContext.Provider>
    </NavigationContainer>
  );
};
