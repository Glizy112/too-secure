const bcrypt = require('bcrypt');
const userModel = require('../models/user.model');
const validator = require('validator');
const logEvent = require('../utils/logger');

const MAX_ATTEMPTS = 5;
const LOCK_TIME = 15 * 60 * 1000; // 15min lockout period

//User registration
async function register(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Missing fields' });
    }
    
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: 'Invalid email' });
    }

    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({ message: 'Weak password' });
    }

    const existing = userModel.findByEmail(email);
    if (existing) {
      return res.status(400).json({ message: 'User exists' });
    }

    const hash = await bcrypt.hash(password, 10);

    userModel.createUser({
      email,
      password_hash: hash,
      role: 'user',
    });

    res.json({ message: 'User registered' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}

//User login
async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = userModel.findByEmail(email);
    if (!user) {
      //Logging invalid email(user not found) attempt
      logEvent({
        action: 'LOGIN',
        status: 'FAILED_USER_NOT_FOUND',
        ipAddress: req.ip,
      });
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    //check if account locked out
    if (user.lock_until && Date.now() < user.lock_until) {
      return res.status(403).json({ message: 'Account locked! Try again later.' });
    }

    //Comparing secured passwords for verifying user login
    const match = await bcrypt.compare(password, user.password_hash);

    if (!match) {
      const attempts = user.failed_attempts + 1;   //tracking failed login attempts

      let lockUntil = null;
      if (attempts >= MAX_ATTEMPTS) {
        lockUntil = Date.now() + LOCK_TIME;     //doing account lockout if attempts exceed set threshold

        //Logging account-locked attempt
        logEvent({
          userId: user.id,
          action: 'ACCOUNT_LOCK',
          status: 'LOCKED',
          ipAddress: req.ip,
        });
      }

      userModel.updateFailedAttempts(user.id, attempts, lockUntil);    //updating failed attempts in db

      //Logging invalid password attempt
      logEvent({
        userId: user.id,
        action: 'LOGIN',
        status: 'FAILED_PASSWORD',
        ipAddress: req.ip,
      });

      return res.status(400).json({ message: 'Invalid credentials' });
    }

    //Reset failed login attempts in db
    userModel.updateFailedAttempts(user.id, 0, null);

    //Initializing logged-in user session (basic for now)
    //Old session creation codeblock -> one time session only, same session usage after login
    /*req.session.user = {
      id: user.id,
      role: user.role,
      
    }; 
    res.json({ message: 'Login successful' });*/

    //New session creation code -> regenerating session for each login
    req.session.regenerate((err) => {
      if (err) {
        return res.status(500).json({ message: "Session error" });
      }

      req.session.user = {
        id: user.id,
        role: user.role,
      };

      req.session.lastActivity = Date.now();
      
      //Logging successful login attempt
      logEvent({
        userId: user.id,
        action: 'LOGIN',
        status: 'SUCCESS',
        ipAddress: req.ip,
      });
      
      res.json({ message: "Login successful" });
    });

  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}

//User logout
function logout(req, res) {

  //Logging logout attempt
  logEvent({
    userId: req.session?.user?.id,
    action: 'LOGOUT',
    status: 'SUCCESS',
    ipAddress: req.ip,
  });
  
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.json({ message: 'Logged out securely' });
  });
}

//Current User
function getCurrentUser(req, res) {
  if (!req.session.user) {
    return res.status(401).json({
      message: "Not authenticated",
    });
  }

  res.json({
    user: req.session.user,
  });
}

module.exports = {
  register,
  login,
  logout,
  getCurrentUser
};