//@flow
import React, { Component } from "react";
import { Modal, View, Text, SafeAreaView, StatusBar } from "react-native";
import NavigationComponent from "./../navigation/NavigationComponent";
import FlashMessage from "react-native-flash-message";

const defaultState = {
  isInitialised: false
};

export default class AppComponent extends Component<{}, {}> {
  constructor(props) {
    super(props);
    this.state = defaultState;
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    if (this.props.isRehydrated) {
      return (
        <SafeAreaView style={{ flex: 1 }}>
          <NavigationComponent />
          <View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={this.props.isBSOpen}
              onRequestClose={() => {
                if (this.props.isBSBackClose) {
                  this.props.closeBottomSheet();
                }
              }}
            >
              <View
                style={{
                  flex: 1,
                  paddingHorizontal: 16,
                  justifyContent: "flex-end",
                  backgroundColor: "#33333366"
                }}
              >
                {this.props.renderBottomsheet()}
              </View>
            </Modal>
          </View>
          <FlashMessage position="bottom" icon="auto" />
        </SafeAreaView>
      );
    } else {
      return <View style={{ flex: 1 }} />;
    }
  }
}
