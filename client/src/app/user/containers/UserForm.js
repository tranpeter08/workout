import React from 'react';
import {connect} from 'react-redux';
import {reduxForm, formValueSelector} from 'redux-form';
import UserInputs from '../components/UserInputs';
import {} from '../user-actions';
import '../style/userForm.css';

export class UserForm extends React.Component{
  onSubmit = data => {

  }

  render() {
    const {heightUnitValue, toggleForm, handleSubmit} = this.props;

    return (
      <div className='modal-backdrop'>
        <form onSubmit={handleSubmit(this.onSubmit)} id='profile-form'>
          <fieldset>
            <legend>Editing Profile</legend>
            <div className='user-inputs-wrapper'>
                <UserInputs heightUnitValue={heightUnitValue} />
            </div>
          </fieldset>

          <div className='userForm-button-container'>
            <button type>Submit</button>
            <button type='button' onClick={toggleForm}>Close</button>
          </div>
        </form>
      </div>
    )
  }
}

const selector = formValueSelector('UserForm');

const mapStateToProps = (state) => {
  return {heightUnitValue: selector(state, 'heightUnit')}
}

const DecoratedUserForm = reduxForm({
    form: 'UserForm'
})(UserForm);

export default connect(mapStateToProps)(DecoratedUserForm);