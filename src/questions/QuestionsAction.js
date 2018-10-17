//@flow
export const FINISH_QUIZ = "FINISH_QUIZ";
export const SET_QUESTIONS = "SET_QUESTIONS";
export const ACTION_TYPES = {
  FINISH_QUIZ,
  SET_QUESTIONS
};

export const finishQuiz = (score, time) => {
  return {
    action: ACTION_TYPES.FINISH_QUIZ,
    payload: {
      score,
      time
    }
  };
};

export const fetchQuestions = () => {
  return function(dispatch, state) {
    fetch("https://opentdb.com/api.php?amount=10&type=multiple")
      .then(response => response.json())
      .then(responseJson => {
        return responseJson.movies;
      })
      .catch(error => {
        console.error(error);
      });
  };
};
