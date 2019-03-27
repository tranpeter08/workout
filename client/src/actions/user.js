'use strict';
import {SubmissionError} from 'redux-form'

import {API_BASE_URL} from '../config';
import {fetchOptions} from '../utils';

export const createUser = data => dispatch => {
  return fetch(`${API_BASE_URL}/users`, fetchOptions('POST', data))
    .then(res => {
      return res.json()
    })
    .catch(error => {
      console.error(error);
      return error
    });
}

export const getProfile = (userId, token) => {
  return fetch(`${API_BASE_URL}/profile/${userId}`, fetchOptions('GET', null, token))
    .then(res => {
      console.log('RES ===', res.json())
      return res.json()
    })
    .catch(err => {
      console.error(err);
      return err;
    })  
}
