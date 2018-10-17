//@flow
import React, { Component } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity
} from "react-native";
import { splash } from "./../../assets/images/index";

export default class QuestionsComponent extends Component<{}, {}> {
  constructor(props) {
    super(props);
  }

  componentWillMount() {}

  componentDidMount() {}

  render() {
    return (
      <ImageBackground
        source={splash}
        style={{ flex: 1, width: undefined, height: undefined }}
      >
        <View
          style={{
            justifyContent: "space-around",
            flex: 1,
            padding: 24,
            alignItems: "center"
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 32,
              textAlign: "center",
              fontWeight: "bold"
            }}
          >
            {"RANDOM\nTRIVIA"}
          </Text>
          <Text style={{ color: "#fff" }}>
            {"10 Random Questions Every Time."}
          </Text>
          <TouchableOpacity
            activeOpacity={0.9}
            style={{
              backgroundColor: "#355C95",
              padding: 16,
              borderRadius: 24,
              justifyContent: "center",
              flexDirection: "row"
            }}
          >
            <Text style={{ textAlign: "center", color: "#fff", flex: 1 }}>
              {"START"}
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}


