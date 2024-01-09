import { createContext, useEffect, useState } from 'react';
import QUESTIONS from '../questions';

export const QuizContext = createContext({
  questionObject: {},
  loadNextQuestion: () => {},
  finished: false,
});

export default function QuizContextProvider({ children }) {
  const [questionObject, updateQuestionObject] = useState({
    currentIndex: 0,
    answeredQuestions: [],
  });
  const [finished, setFinished] = useState(false);

  function loadNextQuestion(answer) {
    console.log(questionObject.currentIndex, QUESTIONS.length);
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
      console.log('Finished');
      setFinished(true);
    }
  }
  console.log(questionObject);

  return (
    <QuizContext.Provider
      value={{ questionObject, loadNextQuestion, finished }}
    >
      {children}
    </QuizContext.Provider>
  );
}
