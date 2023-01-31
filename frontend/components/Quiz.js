import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchQuiz } from '../state/action-creators';
import {quiz} from '../state/reducer';


function Quiz(props) {
  const [answerSelected, setAnswerSelected] = useState(false);

  useEffect(() => {
    props.fetchQuiz()
  }, [])


  const handleAnswerSelect = () => {
    setAnswerSelected(true);
  }

  return (
    <div id="wrapper">
      {
        
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        props.quiz ? (
          <>
            <h2>{props.quiz.question}</h2>

            <div id="quizAnswers">
              {
                props.quiz.answers.map((answer, index) => (
                  <div className="answer" key={index}>
                    {answer.text}
                    <button onClick={handleAnswerSelect}>
                      Select
                    </button>
                  </div>
                ))
              }

      
            </div>

            <button id="submitAnswerBtn" disabled={!answerSelected}>Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}

const mapStateToProps = state => {
  return {
    quiz: state.quiz
    }
}

export default connect(mapStateToProps, {fetchQuiz})(Quiz)
