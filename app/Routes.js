import React from 'react';
import { Switch, Route } from 'react-router';
import Loadable from 'react-loadable';
import App from './containers/App';

const style = {
  color: 'blue !important',
  width: '100%',
  display: 'flex',
  fontFamily: 'Avenir Next'
};

const LoadableHelper = (module, opts = {}) =>
  Loadable({
    loader: () => module.then(e => e.default),
    loading: () => <div style={style}>Welcome to AnswerMe</div>,
    delay: 2000,
    ...opts
  });

const AnswerMePage = LoadableHelper(import('./containers/AnswerMePage'));
const CounterPage = LoadableHelper(import('./containers/CounterPage'));
const HomePage = LoadableHelper(import('./containers/HomePage'));

export default () => (
  <App>
    <Switch>
      <Route
        exact
        strict
        path="/answerme/:group/:level"
        component={AnswerMePage}
      />
      <Route exact strict path="/counter" component={CounterPage} />
      <Route exact strict path="/" component={HomePage} />
      <Route exact strict component={HomePage} />
    </Switch>
  </App>
);
