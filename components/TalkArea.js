import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";

export const TalkArea = ({ isActiveTeacher }) => {
  return (
    <View>
      <Image style={styles.teachersIcon} source={isActiveTeacher.Img} />
    </View>
  );
};

const styles = StyleSheet.create({
  teachersIcon: { width: 60, height: 60 },
});
