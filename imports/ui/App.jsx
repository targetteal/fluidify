import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import MainBar from './components/MainBar.jsx';

// route components
import HTreePage from './pages/HTreePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import CreateWavePage from './pages/CreateWavePage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

const CONNECTION_ISSUE_TIMEOUT = 5000;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //  showConnectionIssue: false,
    // };
    // this.toggleMenu = this.toggleMenu.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      /* eslint-disable react/no-did-mount-set-state */
      this.setState({ showConnectionIssue: true });
    }, CONNECTION_ISSUE_TIMEOUT);
  }

  logout() {
    Meteor.logout();
  }

  render() {
    const {
      user,
      stream,
      // connected,
      // loading,
      // location,
    } = this.props;

    function HTreePageWrapper() {
      return <HTreePage stream={stream} />;
    }

    return (
      <BrowserRouter>
        <div>
          <MainBar />
          <div id="main" className="container">
            <Switch>
              <Route path="/tree/" component={HTreePageWrapper} />
              <Route path="/waves/create/" component={CreateWavePage} />
              <Route path="/login/" component={LoginPage} />
              <Route path="/signup/" component={SignupPage} />
              <Route path="*" component={NotFoundPage} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

App.defaultProps = {
  user: null,
};

App.propTypes = {
  user: PropTypes.object,
  // connected: PropTypes.bool.isRequired,
  // loading: PropTypes.bool.isRequired,
  // stream: PropTypes.object.isRequired,
  // location: PropTypes.object,
};
