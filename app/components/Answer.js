import React, { Component } from 'react';
import { ipcRenderer } from 'electron';
import { Form, Button, Row } from 'reactstrap';
import { SOLVED } from '../constants/constants';
// import styles from './Answer.css';

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

  checkAnswer(event) {
    event.preventDefault();
    const { trueAnswer, hashAnswer } = this.state;
    if (trueAnswer === hashAnswer) {
      ipcRenderer.send(SOLVED, 'MATH');
      this.setState({
        userAnswer: '',
        hashAnswer: ''
      });
    } else {
      console.log('Wrong answer');
    }
  }

  render() {
    const { userAnswer } = this.state;
    return (
      <React.Fragment>
        <Row>Your answer:</Row>
        <Row>
          <Form id="answer" onSubmit={evt => this.checkAnswer(evt)}>
            <input value={userAnswer} onChange={evt => this.updateValue(evt)} />{' '}
            <Button color="success">Submit</Button>
          </Form>
        </Row>
      </React.Fragment>
    );
  }
}
