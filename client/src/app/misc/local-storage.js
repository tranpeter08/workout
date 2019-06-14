export const saveToken = token => {
  try {
    localStorage.setItem('authToken', token);
  } 
  catch(err) { console.error(err) };
}

export const loadToken = () => {
  return localStorage.getItem('authToken');
}

export const deleteToken = () => {
  try {
    localStorage.removeItem('authToken');
  }
  catch(err) {
    console.error(err);
  };
}