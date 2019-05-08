import React from 'react';

export default class RefreshModal extends React.Component{
  state = {
    count: 10
  }

  componentDidMount() {
    this.counter = setInterval(this.countDown, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.counter);
  }
  
  countDown = () => {
    this.setState((state, props) => ({count: state.count - 1}))
  }

  render(){
  console.log(this.state.count);
    return <div className='modal-backdrop'>
      <div className='modal-body'>
      <h3>Session is about to expire!</h3>
      <p>Continue? {this.state.count}</p>
      <button onClick={this.props.closeModal}>Yes</button>
      <button onClick={this.props.endSession}>End Session</button>
      </div>
    </div>;
  }
}