'use strict';
import {loadToken} from './local-storage';

export const fetchOptions = (method, data, notProtected) => {
  const options = {
    method: method,
    headers: {
      'content-type': 'application/json'
    }
  }

  if (!notProtected) {
    options.headers['Authorization'] = `Bearer ${loadToken()}`;
  }

  if (data) {
    options.body = JSON.stringify(data);
  }
  
  return options;
}

export const normalizeRes = (res) => {
  if (!res.ok) {
    return res.json()
      .then((error) => {
        console.error('res error', error);
        return Promise.reject(error)
      })
  }
  return res.json();
}

export const parseInput = (input) => {
  if(input === '0' || input === '') {
    return ''
  } else {
    return Number(input);
  }
}