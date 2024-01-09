import { useContext, useState } from 'react';
import Header from './components/Header';
import Quiz from './components/Quiz';
import QuizContextProvider, { QuizContext } from './store/quiz-context';
import Result from './components/Result';
import QUESTIONS from './questions';

function App() {
  // const { finished } = useContext(QuizContext);
  const [questionObject, updateQuestionObject] = useState({
    currentIndex: 0,
    answeredQuestions: [],
  });
  const [finished, setFinished] = useState(false);

  function loadNextQuestion(answer) {
    if (questionObject.currentIndex < QUESTIONS.length - 1) {
      updateQuestionObject((prev) => {
        let { currentIndex, answeredQuestions } = prev;
        currentIndex += 1;

        return {
          currentIndex,
          answeredQuestions: [...answeredQuestions, answer],
        };
      });
    } else {
      updateQuestionObject((prev) => {
        let { answeredQuestions } = prev;
        return {
          ...prev,
          answeredQuestions: [...answeredQuestions, answer],
        };
      });
      setFinished(true);
    }
  }
  // console.log(questionObject);

  // console.log(finished);
  return (
    // <QuizContextProvider>
    <>
      <Header />
      {!finished && (
        <Quiz questionObject={questionObject} onSelect={loadNextQuestion} />
      )}
      {finished && <Result questionObject={questionObject} />}
    </>

    // </QuizContextProvider>
  );
}

export default App;
