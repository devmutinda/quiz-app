import { useState } from 'react';
import QUESTIONS from '../questions';
import ProgressBar from './ProgressBar';

export default function Quiz({ onSelect, answeredQuestions }) {
  const currentIndex = answeredQuestions.length;
  const question = QUESTIONS[currentIndex];

  const [selectedAnswer, setSelectedAnswer] = useState({
    state: null,
    answered: false,
  });
  const [disabled, setDisabled] = useState(false);

  function checkQuestion() {
    let state;
    if (!selectedAnswer.state) {
      state = 'skipped';
    } else if (selectedAnswer.id === question.correctAnswer) {
      state = 'correct';
    } else {
      state = 'wrong';
    }
    setDisabled(true);
    setSelectedAnswer((prev) => ({ ...prev, state, answered: false }));

    setTimeout(() => {
      onSelect({ ...selectedAnswer, state, questionId: question.id });
    }, 1000);
  }

  function handleClick(id) {
    // Check if answer is correct
    setSelectedAnswer({ id, state: 'selected', answered: true });
  }

  return (
    <section id="quiz">
      <div id="question">
        <ProgressBar
          checkQuestion={checkQuestion}
          answered={selectedAnswer.answered}
          key={currentIndex}
        />
        <h2>{question.text}</h2>
        <div id="answers">
          {question.answers.map((answer, index) => {
            const { id, state } = selectedAnswer;

            return (
              <ul key={index} className="answer">
                <button
                  disabled={disabled}
                  className={index === id ? state : ''}
                  onClick={() => handleClick(index)}
                >
                  {answer}
                </button>
              </ul>
            );
          })}
        </div>
      </div>
    </section>
  );
}
