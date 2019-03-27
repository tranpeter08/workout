'use strict';
function createError(reason, message, code) {
  return Promise.reject({reason, message, code});
}

function handleError(err, res) {
  console.error('=== ERROR ===\n',err);
  if(err.reason === 'validationError'){
    return sendRes(res, err.code, err.message);
  };
  return sendRes(res, 500, 'Something went wrong :(');
};

function sendRes(res, code, message) {
  return res.status(code).json({message});
}

module.exports = {createError, handleError, sendRes};