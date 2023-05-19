import { SelectTeacherPage } from "./SelectTeacherPage";
import { TalkPage } from "./TalkPage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState, createContext } from "react";
import { teachers } from "../utils/TeachersData";

const Stack = createNativeStackNavigator();
dataContext = createContext();

export const Main = () => {
  const [isActiveTeacher, setIsActiveTeacher] = useState("Mike");

  // useContextでstateを各コンポーネントに渡す
  const contextValue = {
    isActiveTeacher,
    setIsActiveTeacher,
  };

  const activeTeachersData = teachers.filter(
    (data) => data.Name === isActiveTeacher
  );

  return (
    <NavigationContainer>
      <dataContext.Provider value={contextValue}>
        <Stack.Navigator>
          <Stack.Screen
            name="先生選択画面"
            component={SelectTeacherPage}
            initialParams={{
              isActiveTeacher: isActiveTeacher,
              setIsActiveTeacher: setIsActiveTeacher,
            }}
          />
          <Stack.Screen name="会話画面" component={TalkPage} />
        </Stack.Navigator>
      </dataContext.Provider>
    </NavigationContainer>
  );
};
