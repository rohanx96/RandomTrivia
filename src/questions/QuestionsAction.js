//@flow
import { openBottomSheet, closeBottomSheet } from "./../app/AppAction";
import { loaderDialog } from "./../common/BottomDialogs";
import { goToScreen } from "./../navigation/NavigationAction";
export const FINISH_QUIZ = "FINISH_QUIZ";
export const SET_QUESTIONS = "SET_QUESTIONS";
export const ACTION_TYPES = {
  FINISH_QUIZ,
  SET_QUESTIONS
};

export const finishQuiz = (score, time) => {
  return {
    type: ACTION_TYPES.FINISH_QUIZ,
    payload: {
      score,
      time
    }
  };
};

export const setQuestions = questions => {
  return {
    type: SET_QUESTIONS,
    payload: questions
  };
};

export const fetchQuestions = () => {
  return function(dispatch, state) {
    dispatch(
      openBottomSheet(
        () => {
          return loaderDialog("Getting questions ready for you.");
        },
        false,
        false
      )
    );
    fetch("https://opentdb.com/api.php?amount=10&type=multiple")
      .then(response => response.json())
      .then(responseJson => {
        dispatch(setQuestions(responseJson.results));
        dispatch(closeBottomSheet());
        goToScreen("Questions");
      })
      .catch(error => {
        console.error(error);
      });
  };
};
