// @flow
import React, { Component } from 'react';
import { ipcRenderer } from 'electron';
import AnswerMe from '../components/AnswerMe';
import * as Questions from '../questions';
import { NEW_QUESTION } from '../constants/constants';
import questionGenerator from '../QuestionGenerator';

type Props = {
  match: {
    params: {
      level: number,
      group: string
    }
  }
};

type State = {
  QGClass: questionGenerator,
  question: string,
  answer: string,
  QG: questionGenerator,
  hasher?: string => string
};

export default class AnswerMePage extends Component<Props, State> {
  props: Props;

  state: State = {
    question: '',
    answer: '',
    QG: null,
    QGClass: null
  };

  componentWillMount() {
    ipcRenderer.removeListener(NEW_QUESTION, (_, data) => console.log(data));
    const { match } = this.props;
    const QGClass = Questions[match.params.group];
    const QG = new QGClass(parseInt(match.params.level, 10));
    const { question, answer } = QG.generator();
    console.log(answer);
    this.setState({
      question,
      answer: QGClass.hasher(answer),
      hasher: QGClass.hasher,
      QG,
      QGClass
    });
  }

  componentDidMount() {
    ipcRenderer.on(NEW_QUESTION, (_, arg) => {
      console.log(arg);
      const { QG, QGClass } = this.state;
      QG.level = arg.level;
      const { question, answer } = QG.generator();

      this.setState({
        question,
        answer: QGClass.hasher(answer),
        hasher: QGClass.hasher
      });
    });
  }

  componentWillUnmount() {
    ipcRenderer.removeListener(NEW_QUESTION, (_, data) => console.log(data));
  }

  render() {
    const { question, answer, hasher } = this.state;
    return <AnswerMe question={question} answer={answer} hasher={hasher} />;
  }
}
