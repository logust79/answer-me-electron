import React, { Component } from 'react';
import styles from './AnswerMe.css';
import Question from './Question';
import Answer from './Answer';

type Props = {
  question: string,
  answer: string,
  hasher(string): string
};

export default class AnswerMe extends Component<Props> {
  props: Props;

  render() {
    const { question, answer, hasher } = this.props;
    console.log(question, answer);
    return (
      <div className={styles.container} data-tid="container">
        <Question question={question} />
        <Answer answer={answer} hasher={hasher} />
      </div>
    );
  }
}
