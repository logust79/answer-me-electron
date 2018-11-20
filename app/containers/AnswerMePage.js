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
  hasher?: string => string,
  group: string,
  level: number
};

export default class AnswerMePage extends Component<Props, State> {
  props: Props;

  isCancelled: boolean;

  constructor(props: Props) {
    super(props);
    this.isCancelled = false;
    const { match } = props;
    const QGClass = Questions[match.params.group];
    const QG = new QGClass(parseInt(match.params.level, 10));
    const { question, answer } = QG.generator();
    this.state = {
      group: match.params.group,
      question,
      answer: QGClass.hasher(answer),
      hasher: QGClass.hasher,
      QG,
      QGClass,
      level: match.params.level
    };
  }

  state: State = {
    question: '',
    answer: '',
    group: '',
    level: 1,
    QG: null,
    QGClass: null
  };

  componentWillMount() {
    ipcRenderer.removeListener(NEW_QUESTION, (_, data) => console.log(data));
    this.isCancelled = false;
  }

  componentDidMount() {
    ipcRenderer.on(NEW_QUESTION, (_, arg) => {
      const { QG, QGClass, group } = this.state;
      QG.level = arg.level;
      const { question, answer } = QG.generator();
      // console.log(innerQuestion, innerAnswer);
      if (!this.isCancelled) {
        this.setState({
          question,
          answer: QGClass.hasher(answer),
          hasher: QGClass.hasher,
          level: arg.level,
          QG,
          QGClass,
          group
        });
      }
    });
  }

  componentWillUnmount() {
    ipcRenderer.removeListener(NEW_QUESTION, (_, data) => console.log(data));
    this.isCancelled = true;
  }

  render() {
    const { match } = this.props;
    const { question, answer, hasher, level } = this.state;
    return (
      <AnswerMe
        group={match.params.group}
        level={level}
        question={question}
        answer={answer}
        hasher={hasher}
      />
    );
  }
}
