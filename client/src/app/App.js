import React from 'react';
import {connect} from 'react-redux';
import {Route, withRouter} from 'react-router-dom';
import Navigation from './navigation/containers/Navigation';
import Landing from './landing/components/Landing';
import Login from './user/containers/Login';
import Register from './user/containers/Register';
import UserPage from './user/containers/UserPage';
import RefreshModal from './RefreshModal';
import {logOut, refreshToken} from './auth/auth-actions';
import {Footer} from './footer/Footer';
import NotAuthorized from './auth/container/NotAuthorized';

class App extends React.Component{
  state = {
    modal: false,
    interval: 60,   // minutes
    timeout: 1      // minutes
  };

  componentDidUpdate(prevProps) {
    if (!prevProps.loggedIn && this.props.loggedIn) {
      this.startRefreshInterval();
    }

    if (prevProps.loggedIn && !this.props.loggedIn) {
      this.clearRefreshInterval();
      this.clearTimer();
    }
  };

  componentWillUnmount() {
    this.clearRefreshInterval();
    this.clearTimer();
  };

  startRefreshInterval = () => {
    this.refreshInterval = setInterval(
      () => {this.openModal()}, 
      this.state.interval * 60 * 1000
    );
  };

  clearRefreshInterval = () => {
    if (!this.refreshInterval) {
      return;
    };
    clearInterval(this.refreshInterval);
  };

  startTimer = () => {
    this.endSessionTimer = setTimeout(
      this.endSession,
      this.state.timeout * 60 * 1000
    );
  };

  clearTimer = () => {
    if (!this.endSessionTimer) {
      return;
    };
    clearTimeout(this.endSessionTimer);
  }

  endSession = () => {
    this.setState(
      {modal: false},
      () => {
        this.clearTimer();
        this.props.dispatch(logOut());
      }
    );
  };

  openModal = () => {
    this.setState(
      {modal: true},
      () => {
        this.clearRefreshInterval();
        this.startTimer();
      }
    );
  };

  closeModalRenew = () => {
    this.setState(
      {modal: false},
      () => {
        this.clearTimer();
        this.startRefreshInterval();
        this.props.dispatch(refreshToken());
      }
    );
  };

  renderModal = () => {
    if (this.state.modal) {
      return <RefreshModal 
        closeModal={this.closeModalRenew}
        endSession={this.endSession}
      />
    }
  };

  render() {
    return(
        <React.Fragment>
          {this.renderModal()}
          <header>
            <Navigation />
          </header>
          <Route exact path='/' component={Landing} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/user/:username' component={UserPage} />
          <Route path='/unauthorized' component={NotAuthorized} />
          <Footer />
        </React.Fragment>
    );
  }
};

const mapStateToProps = ({auth, user}, props) => ({
  loggedIn: user.profile !== '',
  hasToken: auth.token !== '',
  error: auth.error
});

export default withRouter(connect(mapStateToProps)(App));