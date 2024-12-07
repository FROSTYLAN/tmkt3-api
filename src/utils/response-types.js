// responseUtils.js

const badRequest = (res, message) => {
    return res.status(400).json({
      message,
      data: null,
      status: 400,
    });
  };
  
  const success = (res, data, message = "Success") => {
    return res.status(200).json({
      message,
      data,
      status: 200,
    });
  };
  
  const error = (res, message, status = 500) => {
    return res.status(status).json({
      message,
      data: null,
      status,
    });
  };
  
  module.exports = {
    badRequest,
    success,
    error,
  };
  