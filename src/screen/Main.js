import { SelectTeacherPage } from "./SelectTeacherPage";
import { TalkPage } from "./TalkPage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState, createContext } from "react";
import { AuthenticationPage } from "./AuthenticationPage";
import { LogoutPage } from "./LogoutPage";

const Stack = createNativeStackNavigator();
dataContext = createContext();

export const Main = () => {
  const [isActiveTeacher, setIsActiveTeacher] = useState({
    Name: "Mike",
    Age: 28,
    Sex: "Male",
    Job: "English Teacher",
    Img: require("../../assets/img/Mike.png"),
  });

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
  };

  return (
    <NavigationContainer>
      <dataContext.Provider value={contextValue}>
        <Stack.Navigator>
          <Stack.Screen name="認証画面" component={AuthenticationPage} />
          <Stack.Screen name="先生選択画面" component={SelectTeacherPage} />
          <Stack.Screen name="会話画面" component={TalkPage} />
        </Stack.Navigator>
      </dataContext.Provider>
    </NavigationContainer>
  );
};
