import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";

export const TeachersTalkArea = ({ isActiveTeacher, onPress, data }) => {
  return (
    <View style={styles.teachersTextContainer}>
      <View style={styles.talkBox}>
        <View style={styles.iconBox}>
          <Image style={styles.teachersIcon} source={isActiveTeacher.Img} />
        </View>

        <View style={styles.teachersText}>
          <View style={styles.teachersTriangle}></View>
          <Text>{data.talkText}</Text>
        </View>
      </View>
      <View style={styles.translationBox}>
        <TouchableOpacity style={styles.translationButton} onPress={onPress}>
          <Text>訳</Text>
        </TouchableOpacity>
        <View
          style={
            data.translationText.length === 0
              ? styles.nonActive
              : styles.translationText
          }
        >
          <Text>{data.translationText}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  talkArea: { width: "100%", marginBottom: 120 },
  talkBox: { flexDirection: "row" },
  teachersTextContainer: {
    maxWidth: "100%",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    margin: 10,
  },
  teachersText: {
    maxWidth: "60%",
    marginLeft: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "white",
    position: "relative",
  },
  teachersTriangle: {
    position: "absolute",
    top: 10,
    left: -10,
    width: 0,
    height: 0,
    borderTopWidth: 0,
    borderRightWidth: 10,
    borderBottomWidth: 10,
    borderLeftWidth: 0,
    borderColor: "white",
    borderTopColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#f2f2f2",
    borderLeftColor: "transparent",
  },
  teachersIcon: { width: 60, height: 60 },
  translationBox: {
    flexDirection: "row",
    maxWidth: "100%",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    marginLeft: 30,
    marginTop: 10,
  },
  translationButton: {
    width: 30,
    height: 30,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
  translationText: {
    maxWidth: "60%",
    marginLeft: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "white",
    position: "relative",
  },

  nonActive: { display: "none" },
});
