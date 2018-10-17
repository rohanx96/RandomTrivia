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
          return loaderDialog("Preparing questions for you.");
        },
        false,
        false
      )
    );
    fetch("https://opentdb.com/api.php?amount=10&type=multiple")
      .then(response => response.json())
      .then(responseJson => {
        let questions = [];
        responseJson.results.forEach(element => {
          let questionData = {};
          questionData.question = element.question;
          questionData.category = element.category;
          let correctAnswerIndex = Math.floor(Math.random() * 4);
          questionData.answers = [];
          element.incorrect_answers.forEach(answer => {
            questionData.answers.push({
              text: answer,
              isCorrect: false
            });
          });
          questionData.answers.splice(correctAnswerIndex, 0, {
            text: element.correct_answer,
            isCorrect: true
          });
          questions.push(questionData);
        });
        dispatch(setQuestions(questions));
        dispatch(closeBottomSheet());
        goToScreen("Questions");
      })
      .catch(error => {
        console.error(error);
      });
  };
};
