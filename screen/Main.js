import { SelectTeacherPage } from "./SelectTeacherPage";
import { TalkPage } from "./TalkPage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export const Main = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="先生選択画面" component={SelectTeacherPage} />
        <Stack.Screen name="会話画面" component={TalkPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
