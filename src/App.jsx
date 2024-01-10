import { useState } from 'react';
import Header from './components/Header';
import Quiz from './components/Quiz';
import Result from './components/Result';
import QUESTIONS from './questions';

function App() {
  const [answeredQuestions, updateAnsweredQuestions] = useState([]);
  const [finished, setFinished] = useState(false);

  function loadNextQuestion(answer) {
    if (answeredQuestions.length >= QUESTIONS.length - 1) {
      setFinished(true);
    }

    updateAnsweredQuestions((prev) => {
      return [...prev, answer];
    });
  }

  return (
    <>
      <Header />
      {!finished && (
        <Quiz
          answeredQuestions={answeredQuestions}
          onSelect={loadNextQuestion}
          key={answeredQuestions.length}
        />
      )}
      {finished && <Result answeredQuestions={answeredQuestions} />}
    </>
  );
}

export default App;
