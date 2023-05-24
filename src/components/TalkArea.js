import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";

export const TalkArea = ({
  isActiveTeacher,
  conversationLog,
  translationText,
}) => {
  return (
    <View style={styles.talkArea}>
      {conversationLog.map((data, index) => (
        <View
          style={
            data.whoseText === "you"
              ? styles.yourTextContainer
              : styles.teachersTextContainer
          }
          key={index}
        >
          <View style={styles.talkBox}>
            <View
              style={
                data.whoseText === "you" ? styles.nonActive : styles.iconBox
              }
            >
              <Image style={styles.teachersIcon} source={isActiveTeacher.Img} />
            </View>

            <View
              style={
                data.whoseText === "you" ? styles.yourText : styles.teachersText
              }
            >
              <View
                style={
                  data.whoseText === "you"
                    ? styles.yourTriangle
                    : styles.teachersTriangle
                }
              ></View>
              <Text>{data.talkText}</Text>
            </View>
          </View>
          <View
            style={
              data.whoseText === "you"
                ? styles.nonActive
                : styles.translationBox
            }
          >
            <TouchableOpacity style={styles.translationButton}>
              <Text>訳</Text>
            </TouchableOpacity>
            <View
              style={
                translationText.length === 0
                  ? styles.nonActive
                  : styles.translationText
              }
            ></View>
          </View>
        </View>
      ))}
      {/* <Image style={styles.teachersIcon} source={isActiveTeacher.Img} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  talkArea: { width: "100%" },
  talkBox: { flexDirection: "row" },
  yourTextContainer: {
    maxWidth: "100%",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    margin: 10,
  },
  teachersTextContainer: {
    maxWidth: "100%",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    margin: 10,
  },
  yourText: {
    maxWidth: "60%",
    marginRight: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#F9DEFC",
    position: "relative",
  },
  teachersText: {
    maxWidth: "60%",
    marginLeft: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "white",
    position: "relative",
  },
  yourTriangle: {
    position: "absolute",
    top: 10,
    right: -10,
    width: 0,
    height: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 10,
    borderLeftWidth: 10,
    borderColor: "#F9DEFC",
    borderTopColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#f2f2f2",
    borderLeftColor: "transparent",
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
