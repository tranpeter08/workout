'use strict';

export const fetchOptions = (method, data, token) => ({
  method: method,
  headers: {
    'content-type': 'application/json',
    'Authorization' : `Bearer ${token}`
  },
  body: JSON.stringify(data)
});

export const normalizeRes = (res) => {
  console.log('res', res)
  if (!res.ok) {
    return res.json()
      .then((error) => Promise.reject(error))
  }
  return res
}

export const parseInput = (input) => {
  if(input === '0' || input === '') {
    return ''
  } else {
    return Number(input);
  }
}