import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import NavBrand from '../components/NavBrand';
import NavToggle from '../components/NavToggle';
import NavLinks from '../components/NavLinks';
import {logOut} from '../../auth/auth-actions';
import '../navigation.css';

export class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: true
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleWindowResize.bind(this));
  }

  handleWindowResize(e) {
    return this.state.collapse ? null :
      e.target.innerWidth >= 600 ? this.setState({collapse: true}) : null;
  };

  handleLogout = ()=>{
    this.closeNav();
    this.props.dispatch(logOut());
  };

  toggleNav = () => {
    this.setState(state => ({collapse: !state.collapse}));
  };

  closeNav = () => {
    if (!this.state.collapse) {
      this.setState({collapse: true})
    };
  };

  render() {
    const {collapse} = this.state;
    const {username} = this.props;

    return (
      <NavContext.Provider value={{closeNav: this.closeNav}}>
        <nav className='top-nav'>
          <NavBrand closeNav={this.closeNav} />
          <NavToggle
            collapse={collapse} 
            toggleNav={this.toggleNav}/>
          <NavLinks 
            collapse={collapse}
            username={username} 
            handleLogout={this.handleLogout} />
        </nav>
      </NavContext.Provider>
    );
  }
}

export const NavContext = React.createContext({
  closeNav: () => {}
});

const mapStateToProps = ({auth: {username}}) => ({username});

export default withRouter(connect(mapStateToProps)(Navigation));