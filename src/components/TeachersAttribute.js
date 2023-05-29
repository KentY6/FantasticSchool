import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const TeachersAttribute = ({ attributeText, attributeData }) => {
  return (
    <View style={styles.attribute}>
      <Text style={styles.attributeText}>{attributeText}</Text>
      <Text style={styles.attributeData}>{attributeData}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  attribute: { flexDirection: "row", margin: 5 },
  attributeText: { color: "#E438D3", fontSize: 16 },
  attributeData: { width: "50%", marginLeft: 10, fontSize: 16 },
});
