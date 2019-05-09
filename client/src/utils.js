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
    if (
        res.headers.has('content-type') &&
        res.headers.get('content-type').startsWith('application/json')
    ) {
        return res.json().then(err => Promise.reject(err));
    }
    return Promise.reject({
      code: res.status,
      message: res.statusText
    });
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