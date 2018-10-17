//@flow
import React, { Component } from "react";
import { View, Text } from "react-native";

export default class HomeComponent extends Component<{}, {}> {
  constructor(props) {
    super(props);
  }

  componentWillMount() {}

  componentDidMount() {}

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#759087" }}>
        <Text>What UP?</Text>
      </View>
    );
  }
}
