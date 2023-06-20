import React, { useEffect, useRef } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { StudentsTalkArea } from "./StudentsTalkArea";
import { TeachersTalkArea } from "./TeachersTalkArea";

export const TalkArea = ({ isActiveTeacher, conversationLog, translation }) => {
  const scrollRef = useRef();

  // コンポーネントが更新される度に一番下にスクロールされるように設定
  useEffect(() => {
    scrollRef.current.scrollToEnd({ animated: true });
  });

  return (
    <ScrollView style={styles.talkArea} ref={scrollRef}>
      {conversationLog.map((data, index) => {
        const isTeachersText = data.whoseText === "teacher";
        return isTeachersText ? (
          <TeachersTalkArea
            isActiveTeacher={isActiveTeacher}
            onPress={() => translation(data, index)}
            data={data}
            key={index}
          />
        ) : (
          <StudentsTalkArea data={data} key={index} />
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  talkArea: { width: "100%", marginBottom: 60 },
});
