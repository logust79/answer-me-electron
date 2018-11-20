import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';
import styles from './AnswerMe.css';
import Question from './Question';
import Answer from './Answer';

type Props = {
  question: string,
  answer: string,
  hasher(string): string,
  group: string,
  level: number
};

export default class AnswerMe extends Component<Props> {
  props: Props;

  render() {
    const { question, answer, hasher, group, level } = this.props;
    return (
      <Container className={styles.container}>
        <Row>
          <h2 className={styles.h2}>
            {' '}
            {group} : level {level}{' '}
          </h2>
        </Row>
        <hr />

        <Question question={question} />
        <hr />
        <Answer answer={answer} hasher={hasher} />
      </Container>
    );
  }
}
