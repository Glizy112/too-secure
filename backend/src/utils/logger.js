const db = require('../config/db.helper');

function logEvent({
  userId = null,
  action,
  status,
  ipAddress = null,
}) {
  try {
    db.run(
      `
      INSERT INTO logs (user_id, action, status, ip_address)
      VALUES (?, ?, ?, ?)
      `,
      [userId, action, status, ipAddress]
    );
  } catch (err) {
    console.error('Logging failed:', err.message);
  }
}

module.exports = logEvent;