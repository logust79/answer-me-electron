// @flow
import React, { Component } from 'react';
import styles from './Question.css';

type Props = {
  // level: number,
  // group: string,
  question: string
};

export default class Question extends Component<Props> {
  props: Props;

  render() {
    const { question } = this.props;

    return (
      <div className={styles.container} data-tid="container">
        Question: <span className={styles.question}>{question}</span>
      </div>
    );
  }
}
