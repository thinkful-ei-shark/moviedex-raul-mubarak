const {NODE_ENV} = require('../config');

// error handler middleware
function serverError(error, req, res, next) { // eslint-disable-line no-unused-vars
  let response;
  if(NODE_ENV === 'production'){
    response = {error: {message: 'server error'}};
  }else{
    console.error(error); // eslint-disable-line no-console
    response = {message: error.message, error};
  }
  res.status(500).json(response);
}

module.exports = serverError;