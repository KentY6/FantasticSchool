import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";

export const StudentsTalkArea = ({ isActiveTeacher, data }) => {
  return (
    <View style={styles.yourTextContainer}>
      <View style={styles.talkBox}>
        <View style={styles.nonActive}>
          <Image style={styles.teachersIcon} source={isActiveTeacher.Img} />
        </View>

        <View style={styles.yourText}>
          <View style={styles.yourTriangle}></View>
          <Text>{data.talkText}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  talkArea: { width: "100%", marginBottom: 120 },
  talkBox: { flexDirection: "row" },
  yourTextContainer: {
    maxWidth: "100%",
    alignItems: "flex-end",
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

  nonActive: { display: "none" },
});