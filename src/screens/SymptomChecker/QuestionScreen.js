import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function QuestionScreen({ route, navigation }) {
  //   const Option = (value) => {
  //     return (

  //     );
  //   };

  //   const { index } = route.params;
  return (
    <View>
      <Text style={[styles.Question, { paddingTop: 100 }]}>
        Hello this is when I asked a question?
      </Text>
      <TouchableOpacity onPress={() => console.log("hello")}>
        <View style={[styles.Option]}>
          <Text style={styles.OptionText}>Yes</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => console.log("hello")}>
        <View style={[styles.Option]}>
          <Text style={styles.OptionText}>No</Text>
        </View>
      </TouchableOpacity>
      {/* <Option value={"yes"} />
      <Option value={"no"} /> */}
    </View>
  );
}
const styles = StyleSheet.create({
  questionNo: {
    color: "red",
    fontSize: 25,
    margin: 20,
  },
  Question: {
    fontSize: 30,
    margin: 25,
  },
  nextButton: {
    height: 50,
    width: "20%",
    backgroundColor: "#3700B3",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
    margin: 20,
    borderRadius: 15,
  },
  nextText: {
    color: "white",
    fontWeight: "900",
  },
  Option: {
    borderColor: "black",
    borderWidth: 3,
    margin: 40,
    marginBottom: 3,
    borderRadius: 25,
    height: 95,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EDECEC",
  },
  OptionText: {
    fontSize: 26,
  },
});
