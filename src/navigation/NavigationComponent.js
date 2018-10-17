//@flow
import React, { Component } from "react";
import { BackHandler } from "react-native";
import AppNavigator from "./AppNavigator";
import { setNavigator, resetTo } from "./NavigationAction";

export default class NavigationComponent extends Component<ComponentProps> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    resetTo("Home");
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }

  onBackPress = () => {
    console.log("on back", this.navigator);
    let nav = this.navigator.state.nav;
    let currentRoute = nav.routes[nav.index];
    if (currentRoute.routeName === "Screen") {
      if (currentRoute.params.shouldResetToHome) {
        resetTo("Home");
        return true;
      }
    }
    if (this.props.isBSOpen) {
      return true;
    }
    if (nav.index === 0) {
      return false;
    }
    return false;
  };

  render() {
    return (
      <AppNavigator
        ref={navigatorRef => {
          setNavigator(navigatorRef);
          this.navigator = navigatorRef;
        }}
      />
    );
  }
}
