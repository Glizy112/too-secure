const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,          //limit of 1 min.
  max: 5,                           //max. no. of attempts in the limit
  message: 'Oops! Too many login attempts. Try again later.',
});

module.exports = {
  loginLimiter,
};