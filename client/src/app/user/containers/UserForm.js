import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import UserInputs from '../components/UserInputs';

export class UserForm extends React.Component{
  render() {
    const {heightUnitValue, toggleForm} = this.props;
    return (
      
      <div className='modal-backdrop'>
      <button type='button' onClick={() => toggleForm()}>Close</button>
        <form>
          <UserInputs heightUnitValue={heightUnitValue} />
        </form>
      </div>
    )
  }
}

export default reduxForm({
  form: 'UserForm'
})(UserForm);