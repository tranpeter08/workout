'use strict';

export const fetchOptions = (method, data, token) => ({
  method: method,
  headers: {
    'content-type': 'application/json',
    'Authorization' : `Bearer ${token}`
  },
  body: JSON.stringify(data)
});