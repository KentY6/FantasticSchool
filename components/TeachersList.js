import { View, ScrollView, Text, Image, StyleSheet } from "react-native";

export const TeachersList = ({ teachers }) => {
  return (
    <ScrollView>
      <View style={styles.teachersArea}>
        {teachers.map((data, index) => (
          <View style={styles.teacherCard} key={index}>
            <Image style={styles.teacherImg} source={data.Img} />
            <View style={styles.teacherData}>
              <View style={styles.attribute}>
                <Text style={styles.attributeText}>NAME:</Text>
                <Text style={styles.attributeData}>{data.Name}</Text>
              </View>
              <View style={styles.attribute}>
                <Text style={styles.attributeText}>AGE:</Text>
                <Text style={styles.attributeData}>{data.Age}</Text>
              </View>
              <View style={styles.attribute}>
                <Text style={styles.attributeText}>SEX:</Text>
                <Text style={styles.attributeData}>{data.Sex}</Text>
              </View>
              <View style={styles.attribute}>
                <Text style={styles.attributeText}>JOB:</Text>
                <Text style={styles.attributeData}>{data.Job}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  teachersArea: { alignItems: "center", justifyContent: "center" },
  teacherCard: {
    flexDirection: "row",
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  teacherImg: { width: 150, height: 150 },
  teacherData: { alignItems: "center", justifyContent: "center" },
  attributeText: { color: "#E438D3", fontSize: 16 },
  attribute: { flexDirection: "row", margin: 5 },
  attributeData: { width: "50%", marginLeft: 10, fontSize: 16 },
});
