import { useContext } from 'react';
import { QuizContext } from '../store/quiz-context';
import QUESTIONS from '../questions';
import Question from './Question';
export default function Quiz({ onSelect, questionObject }) {
  // const { questionObject:{ currentIndex} } = useContext(QuizContext);
  // console.log(questionObject.currentIndex);
  const { currentIndex } = questionObject;

  return (
    <section id="quiz">
      <Question question={QUESTIONS[currentIndex]} onSelect={onSelect} />
    </section>
  );
}
