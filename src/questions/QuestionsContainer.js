//@flow
import { connect } from "react-redux";
import { finishQuiz } from "./QuestionsAction";
import { closeBottomSheet, openBottomSheet } from "./../app/AppAction";
import QuestionsComponent from "./QuestionsComponent";

const mapStateToProps = state => ({
  questions: state.questions.questions
});

const mapDispatchToProps = dispatch => ({
  finishQuiz: (score, time) => dispatch(finishQuiz(score, time)),
  openBottomSheet: (renderSheet, isBackClose, isTouchClose) =>
    dispatch(openBottomSheet(renderSheet, isBackClose, isTouchClose)),
  closeBottomSheet: () => dispatch(closeBottomSheet())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionsComponent);
