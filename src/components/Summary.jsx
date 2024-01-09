import QUESTIONS from '../questions';

export default function Summary({ questions }) {
  return (
    <ol>
      {questions.map((answer, idx) => {
        const { id, state, questionId } = answer;
        const question = QUESTIONS.find((qn) => qn.id === questionId);
        const userAnswer =
          state === 'skipped'
            ? question.answers[question.correctAnswer]
            : question.answers[id];
        return (
          <li key={questionId}>
            <h3>{idx + 1}</h3>
            <p className="question">{question.text}</p>
            <p className={state + ' user-answer'}>{userAnswer}</p>
          </li>
        );
      })}
    </ol>
  );
}
