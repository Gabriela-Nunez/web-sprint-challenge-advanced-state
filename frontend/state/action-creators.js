import * as types from './action-types';
import axios from 'axios';
// ❗ You don't need to add extra action creators to achieve MVP
export function moveClockwise() {  //*wheel
  return {
    type: types.MOVE_CLOCKWISE
  }
 }

export function moveCounterClockwise() {   //*wheel
  return {
    type: types.MOVE_COUNTERCLOCKWISE
  }
 }

export function selectAnswer() {       //*quiz
  return {
    type: types.SET_SELECTED_ANSWER
  }
 }

export function setMessage() {
  return {
    type: types.SET_INFO_MESSAGE
  }
 }

export function setQuiz() {          //*quiz
  return {
    type: types.SET_QUIZ_INTO_STATE
  }
 }

export function inputChange({ name, value }) {      //*form
  return {
    type: types.INPUT_CHANGE,
    payload: { name, value }
  }
 }

export function resetForm() {       //*form
  return {
    type: types.RESET_FORM
  }
 }

// ❗ Async action creators
export function fetchQuiz() {  //*quiz
  return function (dispatch) {
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
    axios.get('http://localhost:9000/api/quiz/next')
    .then(res => {
      dispatch({ type: types.SET_QUIZ_INTO_STATE, payload: res.data})
    })
    .catch(err => {
      console.log(err);
    })
    
  }
}
export function postAnswer() {   //*quiz
  return function (dispatch) {
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
  }
}
export function postQuiz() {    //*form
  return function (dispatch) {
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
