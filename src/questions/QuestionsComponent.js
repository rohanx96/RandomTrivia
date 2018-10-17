//@flow
import React, { Component } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Image
} from "react-native";
import { splash, cross } from "./../../assets/images/index";
import { actionDialog } from "./../common/BottomDialogs";
import Swiper from "react-native-swiper-animated";
import { goBackTo, resetTo } from "./../navigation/NavigationAction";
import HTML from "react-native-render-html";
import Reactotron from "reactotron-react-native";

export default class QuestionsComponent extends Component<{}, {}> {
  constructor(props) {
    super(props);
    this.score = 0;
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
            paddingVertical: 16,
            paddingHorizontal: 8,
            alignItems: "center",
            backgroundColor: "#fff",
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              Reactotron.log("Quit");
              this.props.openBottomSheet(
                () => {
                  return actionDialog(
                    "Are you sure you want to quit?",
                    undefined,
                    () => {
                      this.props.closeBottomSheet();
                      resetTo("Home");
                    },
                    this.props.closeBottomSheet
                  );
                },
                true,
                true
              );
            }}
          >
            <Image source={cross} style={{ height: 32, width: 32 }} />
          </TouchableWithoutFeedback>
          <Text
            style={{
              color: "#000",
              fontSize: 16,
              textAlign: "center",
              fontWeight: "bold"
            }}
          >
            {"RANDOM TRIVIA"}
          </Text>
          <View />
        </View>
        <Swiper
          ref={swiper => {
            this.swiper = swiper;
          }}
          style={{
            margin: 24,
            backgroundColor: "#fff",
            borderRadius: 16
          }}
          stack={true}
          swiper={false}
          backPressToBack={false}
        >
          {this.props.questions.map((questionData, index) => (
            <View
              style={{
                padding: 16,
                flexDirection: "column",
                backgroundColor: "#fff",
                flex: 1
              }}
            >
              <Text>{"Question " + (index + 1)}</Text>
              <HTML
                html={questionData.question}
                containerStyle={{ marginTop: 12, marginBottom: 24 }}
                baseFontStyle={{ fontSize: 15 }}
              />
              {questionData.answers.map(answer => (
                <AnswerButton
                  text={answer.text}
                  onPress={() => {
                    if (answer.isCorrect) {
                      this.score++;
                    }
                    if (index == this.props.questions.length - 1) {
                      this.props.finishQuiz(this.score, 0);
                      goBackTo("Home");
                    } else {
                      this.swiper.forceLeftSwipe();
                    }
                  }}
                />
              ))}
            </View>
          ))}
        </Swiper>
      </ImageBackground>
    );
  }
}

class AnswerButton extends Component<{}, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableHighlight
        style={{
          borderColor: "#355C95",
          borderRadius: 24,
          borderWidth: 4,
          padding: 12,
          flexDirection: "row",
          margin: 4
        }}
        underlayColor={"#355C9555"}
        onPress={this.props.onPress}
      >
        <HTML
          html={this.props.text}
          containerStyle={{ flex: 1 }}
          baseFontStyle={{ fontSize: 15, textAlign: "center" }}
        />
      </TouchableHighlight>
    );
  }
}
