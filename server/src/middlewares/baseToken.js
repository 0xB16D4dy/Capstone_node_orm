const jwt = require('jsonwebtoken');
const { authErrorCode } = require('../configs/response');

const parseToken = (data) => {
  let token = jwt.sign({ data }, 'secret', {
    algorithm: 'HS256',
    expiresIn: '10m',
  });
  return token;
};

const convertToken = (token) => {
  let checkSecret = jwt.verify(token, 'secret');
  return checkSecret;
};

const checkToken = (token) => {
  try {
    let checkSecret = jwt.verify(token, 'secret');
    if (checkSecret) {
      return { checkData: true, message: '' };
    }
  } catch (error) {
    return { checkData: false, message: error.message };
  }
};

const verifyToken = (req, res, next) => {
  const { token } = req.headers;
  const verifyToken = checkToken(token);
  if (verifyToken.checkData) {
    next();
  } else {
    authErrorCode(res, verifyToken.message);
  }
};

module.exports = { checkToken, parseToken, verifyToken, convertToken };
