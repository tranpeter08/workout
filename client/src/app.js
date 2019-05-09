import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Route, withRouter} from 'react-router-dom';
import Header from './container/header';
import Landing from './components/landing';
import Login from './container/login';
import Register from './container/register';
import UserPage from './components/user-page';
import RefreshModal from './components/refreshModal';
import {logOut, refreshToken} from './actions/auth';
import {Footer} from './components/footer';

class App extends React.Component{
  state = {
    modal: false,
    interval: 1,
    timeout: 1
  };

  componentDidUpdate(prevProps) {
    if (!prevProps.loggedIn && this.props.loggedIn) {
      this.startRefreshInterval();
    }

    if(prevProps.loggedIn && !this.props.loggedIn) {
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
    console.log('log out')
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
          <Header />
          <Route exact path='/' component={Landing} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/user/:username' component={UserPage} />
          <Footer />
        </React.Fragment>
    );
  }
};

const mapStateToProps = ({auth, user}, props) => ({
  loggedIn: user.profile !== null,
  hasToken: auth.token !== null,
  error: auth.error
});

export default withRouter(connect(mapStateToProps)(App));