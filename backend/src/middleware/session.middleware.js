const logEvent = require('../utils/logger');

//Session timeout -> Upon user inactivity scenario
function sessionTimeout(req, res, next) {
  if (!req.session.user) return next();

  const now = Date.now();
  const TIMEOUT = 5* 60 * 1000;      //5 min. session duration

  //Last Activity Safety Check
  if (!req.session.lastActivity) {
    req.session.lastActivity = now;
    return next();
  }

  const diff = now - req.session.lastActivity;

  if (diff > TIMEOUT) {

    //Logging session-expired event
    logEvent({
      userId: req.session.user.id,
      action: 'SESSION_EXPIRED',
      status: 'TIMEOUT',
      ipAddress: req.ip,
    });

    return req.session.destroy(() => {
      res.clearCookie('connect.sid');
      return res.status(401).json({ message: 'Session expired' });
    });
  }

  //Update Last Activity
  req.session.lastActivity = now;
  next();


  //Old Partially Working Code
  // const now = Date.now();

  // if (!req.session.lastActivity) {
  //   req.session.lastActivity = now;
  //   return next();
  // }

  // //checking last user activity
  // if (req.session.lastActivity) {

  //   const diff = now - req.session.lastActivity;    //calculating time difference for last time the user has been active

  //   const TIMEOUT = 10 * 1000;   //15min session limit

  //   //checking if user surpasses the session timeout limit for 'automatic logout'
  //   if (diff > TIMEOUT) {
  //     req.session.destroy(() => {
  //       res.clearCookie('connect.sid');
  //       return res.status(401).json({ message: 'Session expired' });
  //     });
  //   }
  // }

  // //updating the user's last activity -> means the user is currently active
  // req.session.lastActivity = now;
  // next();
}

module.exports = sessionTimeout;