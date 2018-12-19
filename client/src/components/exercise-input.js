import React, {Component} from 'react';

export default class ExcerciseInput extends Component {
  //props: name, label, type, 
  render() {
    return(
      <div>
        <label htmlFor="">{this.props.label}</label>
        <input type={this.props.type} {...this.props.input}/>
      </div>
    )
}
}