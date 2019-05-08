import React from 'react';
import { NavLink, Redirect, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import {logOut} from '../actions/auth'

class Header extends React.Component {

  handleLogout = () => {
    this.props.dispatch(logOut());
  }

  render(){  
    // console.log(this.props)
  
    const {username} = this.props;
    
    return (  
      
      <nav>
        <NavLink to="/">Home</NavLink>
        {
          username ?
            <React.Fragment>
              <NavLink to={`/user/${username}`} >Workouts</NavLink> 
              <button onClick={this.handleLogout} >LogOut</button>
            </React.Fragment>
            : 
            <NavLink to="/login">Login</NavLink>
        }
      </nav>
    )
  }
}

const mapStateToProps = ({auth}, props) => ({username: auth.username});

export default connect(mapStateToProps)(Header);