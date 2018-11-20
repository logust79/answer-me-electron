// @flow
import React, { Component } from 'react';
import { Row } from 'reactstrap';
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
      <React.Fragment>
        <Row>Question:</Row>
        <Row>
          <span className={styles.question}>{question}</span>
        </Row>
      </React.Fragment>
    );
  }
}
