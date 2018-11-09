import React, { Component } from 'react';
import { ipcRenderer } from 'electron';
import styles from './Answer.css';

type Props = {
  answer: string,
  hasher(string): string
};
type State = {
  trueAnswer: string,
  userAnswer: string,
  hashAnswer: string,
  hasher(string): string
};

export default class Answer extends Component<Props, State> {
  props: Props;

  state: State = {
    trueAnswer: '',
    userAnswer: '',
    hashAnswer: '',
    hasher: x => x
  };

  componentDidMount() {
    const { answer, hasher } = this.props;
    this.setState({
      trueAnswer: answer,
      userAnswer: '',
      hashAnswer: '',
      hasher
    });
  }

  componentDidUpdate(prevProps) {
    const { answer } = this.props;
    if (prevProps.answer !== answer) {
      this.updateStateByUpdate(answer);
    }
  }

  updateStateByUpdate(trueAnswer: string) {
    this.setState({
      trueAnswer
    });
  }

  updateValue(evt) {
    const { value } = evt.target;
    const { hasher } = this.state;
    this.setState({
      userAnswer: value,
      hashAnswer: hasher(value)
    });
    console.log(this.state);
  }

  checkAnswer() {
    const { trueAnswer, hashAnswer } = this.state;
    if (trueAnswer === hashAnswer) {
      ipcRenderer.send('solved', 'MATH');
      this.setState({
        userAnswer: ''
      });
    } else {
      console.log('false');
    }
  }

  render() {
    const { userAnswer } = this.state;
    return (
      <div className={styles.container} data-tid="container">
        Answer:{' '}
        <input value={userAnswer} onChange={evt => this.updateValue(evt)} />
        <input
          type="button"
          value="submit"
          id="addpix"
          onClick={() => this.checkAnswer()}
        />
      </div>
    );
  }
}
