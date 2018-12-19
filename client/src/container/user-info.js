import React, { Component } from 'react';

export default class UserInfo extends Component {
  render() {
    return (
      <div>
        <h3>User Name{/* user name */}</h3>
        <span>Height: 123{/* user height */}</span>
        <span>Weight: 123{/* user weight */}</span>
        <span>Body Fat: 123{/* user height */}</span>
      </div>
    )
  }
}