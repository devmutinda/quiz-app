import { useState } from 'react';
import ProgressBar from './ProgressBar';

export default function Question({ question, onSelect }) {
  const [selectedAnswer, setSelectedAnswer] = useState({ answered: false });
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
  }

  function handleClick(id) {
    // Check if answer is correct
    setSelectedAnswer({ id, state: 'selected', answered: true });
  }

  function loadNextQuestion() {
    setDisabled(false);
    setSelectedAnswer((prev) => ({ ...prev, state: '', answered: false }));

    onSelect({ ...selectedAnswer, questionId: question.id });
  }

  return (
    <div id="question">
      <ProgressBar
        checkQuestion={checkQuestion}
        answered={selectedAnswer.answered}
        disabled={disabled}
        loadNextQuestion={loadNextQuestion}
      />
      <h2>{question.text}</h2>
      <div id="answers">
        {question.answers.map((answer, index) => {
          const { id, state } = selectedAnswer;

          return (
            <p key={index} className="answer">
              <button
                disabled={disabled}
                className={index === id ? state : ''}
                onClick={() => handleClick(index)}
              >
                {answer}
              </button>
            </p>
          );
        })}
      </div>
    </div>
  );
}
