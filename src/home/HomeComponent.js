//@flow
import React, { Component } from "react";
import {
  View,
  Text,
  StatusBar,
  ImageBackground,
  TouchableOpacity
} from "react-native";
import { splash } from "./../../assets/images/index";
import { connect } from "react-redux";
import { fetchQuestions } from "./../questions/QuestionsAction";

class HomeComponent extends Component<{}, {}> {
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
            {this.props.playAgain
              ? "YOUR SCORE:\n" + this.props.score
              : "RANDOM\nTRIVIA"}
          </Text>
          <Text style={{ color: "#fff", fontSize: 22 }}>
            {this.props.playAgain
              ? "You completed the quiz in " + this.props.time
              : "10 Random Questions Every Time."}
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
            onPress={this.props.fetchQuestions}
          >
            <Text style={{ textAlign: "center", color: "#fff", flex: 1 }}>
              {this.props.playAgain ? "PLAY AGAIN" : "START"}
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => ({
  playAgain: state.questions.playAgain,
  score: state.questions.score,
  time: state.questions.time
});

const mapDispatchToProps = dispatch => ({
  fetchQuestions: () => dispatch(fetchQuestions())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeComponent);