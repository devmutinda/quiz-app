import logo from '../assets/quiz-complete.png';
import Summary from './Summary';
import SummaryStats from './SummaryStats';

export default function Result({ questionObject: { answeredQuestions } }) {
  return (
    <section id="summary">
      <img src={logo} alt="Trophy image" />
      <h2>Quiz completed!</h2>
      <SummaryStats questions={answeredQuestions} />
      <Summary questions={answeredQuestions} />
    </section>
  );
}
