import { SelectTeacherPage } from "./SelectTeacherPage";
import { TalkPage } from "./TalkPage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState, createContext } from "react";

const Stack = createNativeStackNavigator();
dataContext = createContext();

export const Main = () => {
  const [isActiveTeacher, setIsActiveTeacher] = useState([]);

  // useContextでstateを各コンポーネントに渡す
  const contextValue = {
    isActiveTeacher,
    setIsActiveTeacher,
  };

  return (
    <NavigationContainer>
      <dataContext.Provider value={contextValue}>
        <Stack.Navigator>
          <Stack.Screen name="先生選択画面" component={SelectTeacherPage} />
          <Stack.Screen name="会話画面" component={TalkPage} />
        </Stack.Navigator>
      </dataContext.Provider>
    </NavigationContainer>
  );
};
