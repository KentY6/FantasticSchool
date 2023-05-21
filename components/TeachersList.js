import {
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { teachers } from "../src/utils/TeachersData";
import { TeachersAttribute } from "./TeachersAttribute";

export const TeachersList = ({ isActiveTeacher, toggleActiveTeacher }) => {
  return (
    <ScrollView>
      <View style={styles.teachersArea}>
        {teachers.map((data, index) => (
          <TouchableOpacity
            onPress={() => toggleActiveTeacher(data)}
            key={index}
          >
            <View
              style={
                isActiveTeacher.Name === data.Name
                  ? styles.activeTeacherCard
                  : styles.teacherCard
              }
            >
              <Image style={styles.teacherImg} source={data.Img} />
              <View style={styles.teacherData}>
                <TeachersAttribute
                  attributeText={"NAME:"}
                  attributeData={data.Name}
                />
                <TeachersAttribute
                  attributeText={"AGE:"}
                  attributeData={data.Age}
                />
                <TeachersAttribute
                  attributeText={"SEX:"}
                  attributeData={data.Sex}
                />
                <TeachersAttribute
                  attributeText={"JOB:"}
                  attributeData={data.Job}
                />
              </View>
            </View>
          </TouchableOpacity>
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
  activeTeacherCard: {
    flexDirection: "row",
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#82B4EF",
  },
  teacherImg: {
    width: 150,
    height: 150,
    backgroundColor: "white",
    borderRadius: 10,
  },
  teacherData: {
    alignItems: "center",
    justifyContent: "center",
    width: "55%",
  },
});
