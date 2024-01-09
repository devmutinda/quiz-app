function formatNumbers(summary, questions) {
  let { skipped, correct, wrong } = summary;
  skipped = ((skipped / questions.length) * 100).toFixed(1);
  correct = ((correct / questions.length) * 100).toFixed(1);
  wrong = ((wrong / questions.length) * 100).toFixed(1);

  return { skipped, correct, wrong };
}

export default function SummaryStats({ questions }) {
  let summaryStats = questions.reduce(
    (acc, qn) => {
      let { skipped, correct, wrong } = acc;
      if (qn.state === 'correct') {
        correct += 1;
      } else if (qn.state === 'wrong') {
        wrong += 1;
      } else {
        skipped += 1;
      }

      return { skipped, correct, wrong };
    },
    { skipped: 0, correct: 0, wrong: 0 },
  );

  // console.log(summaryStats);

  const { skipped, correct, wrong } = formatNumbers(summaryStats, questions);
  return (
    <div id="summary-stats">
      <p>
        <span className="number">{skipped}%</span>
        <span className="text">Skipped</span>
      </p>
      <p>
        <span className="number">{correct}%</span>
        <span className="text">Answered correctly</span>
      </p>
      <p>
        <span className="number">{wrong}%</span>
        <span className="text">Answered incorrectly</span>
      </p>
    </div>
  );
}
