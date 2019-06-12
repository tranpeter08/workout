import React from 'react';

export default class SuccessStatus extends React.Component{
  componentDidMount() {
    this.setTimer = setTimeout(
      this.onTimeout,
      2 * 1000  
    );
  }

  componentWillUnmount() {
    this.clearTimer()
  }

  onTimeout = () => {
    this.props.toggleForm()
  }

  clearTimer() {
    if (this.setTimer) {
      clearTimeout(this.setTimer);
    }
  }

  render(){
    return (
      <div className='success-container'>
        <i className="success-icon far fa-thumbs-up"></i>
        <h2>Success!</h2>
      </div>
    )
  }
}