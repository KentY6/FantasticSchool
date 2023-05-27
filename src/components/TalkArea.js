import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { StudentsTalkArea } from "./StudentsTalkArea";
import { TeachersTalkArea } from "./TeachersTalkArea";

export const TalkArea = ({ isActiveTeacher, conversationLog, getDeepLApi }) => {
  return (
    <ScrollView style={styles.talkArea}>
      {conversationLog.map((data, index) => {
        const isTeachersText = data.whoseText === "teacher";
        return isTeachersText ? (
          <TeachersTalkArea
            isActiveTeacher={isActiveTeacher}
            onPress={() => getDeepLApi(data, index)}
            data={data}
            key={index}
          />
        ) : (
          <StudentsTalkArea
            isActiveTeacher={isActiveTeacher}
            data={data}
            key={index}
          />
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  talkArea: { width: "100%", marginBottom: 120 },
});
