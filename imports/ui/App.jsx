import PropTypes from 'prop-types';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// route components
import HTreePage from './pages/HTreePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import HomePage from './pages/HomePage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import CreateWavePage from './pages/CreateWavePage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

import MainBar from './components/MainBar.jsx';


export default class App extends React.Component {
  render() {
    const {
      stream,
      user,
      // connected,
      // loading,
      // location,
    } = this.props;

    function HTreePageWrapper() {
      return <HTreePage user={user} stream={stream} />;
    }

    function WrapWithLayout(component) {
      return function DefaultLayout(props) {
        const { history } = props;
        return (
          <div>
            <MainBar history={history} user={user} />
            <div id="main" className="container">
              {React.createElement(component, Object.assign({}, props, { history, user }))}
            </div>
          </div>
        );
      };
    }

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={WrapWithLayout(HomePage)} />
          <Route path="/tree/" component={WrapWithLayout(HTreePageWrapper)} />
          <Route path="/waves/create/" component={WrapWithLayout(CreateWavePage)} />
          <Route path="/login/" component={WrapWithLayout(LoginPage)} />
          <Route path="/signup/" component={WrapWithLayout(SignupPage)} />
          <Route path="*" component={WrapWithLayout(NotFoundPage)} />
        </Switch>
      </BrowserRouter>
    );
  }
}

App.defaultProps = {
  stream: null,
  user: null,
};

App.propTypes = {
  // connected: PropTypes.bool.isRequired,
  // loading: PropTypes.bool.isRequired,
  stream: PropTypes.object,
  user: PropTypes.object,
  // location: PropTypes.object,
};
