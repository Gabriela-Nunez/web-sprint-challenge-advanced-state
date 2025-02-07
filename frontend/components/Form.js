
import React from "react";
import { connect } from "react-redux";
import * as actionCreators from "../state/action-creators";
import { dispatch } from "react";

export function Form(props) {
  const { inputChange, newQuestion, newTrueAnswer, newFalseAnswer, postQuiz, form } =
    props;
  

  const onChange = (evt) => {
    inputChange(evt.target.id, evt.target.value);
  };
  const onSubmit = (evt) => {
    evt.preventDefault();
    const payload = {
      question_text: form.newQuestion,
      true_answer_text: form.newTrueAnswer,
      false_answer_text: form.newFalseAnswer,
    };
    postQuiz(payload);
    actionCreators.resetForm();
  };
  const disabled =
    newQuestion.trim().length > 0 &&
    newTrueAnswer.trim().length > 0 &&
    newFalseAnswer.trim().length > 0;

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input
        maxLength={50}
        onChange={onChange}
        id="newQuestion"
        value={form.newQuestion}
        placeholder="Enter question"
      />
      <input
        maxLength={50}
        onChange={onChange}
        id="newTrueAnswer"
        value={form.newTrueAnswer}
        placeholder="Enter true answer"
      />
      <input
        maxLength={50}
        onChange={onChange}
        id="newFalseAnswer"
        value={form.newFalseAnswer}
        placeholder="Enter false answer"
      />
      <button id="submitNewQuizBtn" disabled={!disabled}>
        Submit new quiz
      </button>
    </form>
  );
}
const mapStateToProps = (state) => {
  return {
    ...state,
    newQuestion: state.form.newQuestion,
    newTrueAnswer: state.form.newTrueAnswer,
    newFalseAnswer: state.form.newFalseAnswer,
    form: state.form,
  };
};
export default connect(mapStateToProps, actionCreators)(Form);
