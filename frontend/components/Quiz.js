
import React, { useEffect } from "react";
import {
  setQuiz,
  fetchQuiz,
  selectAnswer,
  postAnswer,
} from "../state/action-creators";
import { connect, useDispatch, useSelector } from "react-redux";

function Quiz(props) {
  const { quiz, selectedAnswer, selectAnswer, answerId } = props;
  const dispatch = useDispatch();

  if(quiz === null){
  useEffect(() => {
    dispatch(fetchQuiz());
  }, []);
  }
  
  const onClickHandler = (number) => {
    dispatch(selectAnswer(quiz.answers[number].answer_id));
  };
  const onSubmitHandler = () => {
    const payload = {
      quiz_id: props.quiz.quiz_id,
      answer_id: selectedAnswer,
    };
    console.log(payload);
    dispatch(postAnswer(payload));
  };

  console.log(quiz);

  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."

        quiz ? (
          <>
            <h2>{quiz.question}</h2>

            <div id="quizAnswers">
              <div
                //classname
                className={`answer${
                  answerId === quiz.answers[0].answer_id ? " selected" : ""
                } `}
              >
                {quiz.answers[0].text}
                <button onClick={() => onClickHandler(0)}>
                  {answerId === quiz.answers[0].answer_id
                    ? " SELECTED"
                    : "Select"}
                </button>
              </div>
              <div
                //classname
                className={`answer${
                  selectedAnswer === quiz.answers[1].answer_id
                    ? " selected"
                    : ""
                } `}
              >
                {quiz.answers[1].text}
                <div>
                  <button onClick={() => onClickHandler(1)}>
                    {selectedAnswer === quiz.answers[1].answer_id
                      ? " SELECTED"
                      : "Select"}
                  </button>
                </div>
              </div>
            </div>

            <button
              id="submitAnswerBtn"
              disabled={!selectedAnswer}
              onClick={onSubmitHandler}
            >
              Submit answer
            </button>
          </>
        ) : (
          " Loading next quiz..."
        )
      }
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    ...state,
    quiz: state.quiz,
    answerId: state.selectedAnswer,
  };
};

export default connect(mapStateToProps, { fetchQuiz, setQuiz, selectAnswer })(
  Quiz
);

