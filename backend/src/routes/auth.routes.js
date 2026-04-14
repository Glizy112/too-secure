const express = require('express');
const router = express.Router();

const {
    register,
    login, 
    logout,
    getCurrentUser
} = require('../controllers/auth.controller');
const { loginLimiter } = require('../middleware/rateLimit.middleware');


router.post('/register', register);
//router.post('/login', login);
router.post('/login', loginLimiter, login);
router.post('/logout', logout);
router.get('/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});
router.get("/me", getCurrentUser);

module.exports = router;