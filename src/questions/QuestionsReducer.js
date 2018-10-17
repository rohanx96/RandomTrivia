//@flow
import { ACTION_TYPES } from "./QuestionsAction";
import createReducer from "./../common/CreateReducer";

const initState = { playAgain: false, score: 0, time: 0, questions: [] };
export const QuestionsReducer = createReducer(initState, {
  [ACTION_TYPES.SET_QUESTIONS](state, action) {
    return Object.assign({}, state, {
      playAgain: true,
      score: action.payload.score,
      time: action.payload.time
    });
  },
  [ACTION_TYPES.SET_QUESTIONS](state, action) {
    return Object.assign({}, state, {
      questions: action.payload,
      playAgain: false
    });
  }
});
