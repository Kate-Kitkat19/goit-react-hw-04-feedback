import { Layout } from './Layout';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Statistics } from './Statistics/Statistics';
import { Section } from './Section/Section';
import { Notification } from './Notification/Notification';
import { useState } from 'react';

export const App = () => {
  const [good, setGood] = useState(0);
  const [bad, setBad] = useState(0);
  const [neutral, setNeutral] = useState(0);

  const feedbackOptions = { good, bad, neutral };
  console.log(feedbackOptions);

  const onLeaveFeedback = e => {
    const value = e.target.value;
    console.log('onLeaveFeedback   value', value);
    switch (value) {
      case 'good':
        setGood(prev => prev + 1);
        break;

      case 'bad':
        setBad(prev => prev + 1);
        break;

      case 'neutral':
        setNeutral(prev => prev + 1);
        break;

      default:
        throw new Error('Inproper value');
    }
  };

  const countTotalFeedback = () => {
    const total = good + bad + neutral;
    return total;
  };

  const countPositiveFeedbackPercentage = totalValue => {
    const percentage = good
      ? Number(((good / totalValue) * 100).toFixed(0))
      : 0;
    return percentage;
  };

  const total = countTotalFeedback();
  const perc = countPositiveFeedbackPercentage(total);

  return (
    <Layout>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={Object.keys(feedbackOptions)}
          onLeaveFeedback={onLeaveFeedback}
        ></FeedbackOptions>
      </Section>
      <Section title="Statistics">
        {total > 0 ? (
          <Statistics
            good={good}
            bad={bad}
            neutral={neutral}
            total={total}
            percentage={perc}
          ></Statistics>
        ) : (
          <Notification message="There is no feedback yet" />
        )}
      </Section>
    </Layout>
  );
};
