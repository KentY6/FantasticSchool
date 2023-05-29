import { SelectTeacherPage } from "./SelectTeacherPage";
import { TalkPage } from "./TalkPage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState, createContext } from "react";
import { AuthenticationPage } from "./AuthenticationPage";

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

  const [loginState, setLoginState] = useState(false);

  // useContextでstateを各コンポーネントに渡す
  const contextValue = {
    isActiveTeacher,
    setIsActiveTeacher,
    loginState,
    setLoginState,
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
