const bcrypt = require("bcrypt");
const db = require('../config/db.helper');
const logEvent = require('../utils/logger');

async function createUser(req, res) {
  try {
    const { email, password, role } = req.body;

    const existing = db.get(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existing) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hash = await bcrypt.hash(password, 10);

    db.run(
      `
      INSERT INTO users (email, password_hash, role)
      VALUES (?, ?, ?)
      `,
      [email, hash, role || "user"]
    );

    logEvent({
      userId: req.session.user.id,
      action: "CREATE_USER",
      status: "SUCCESS",
      ipAddress: req.ip,
    });

    res.json({
      message: "User created successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Create user failed",
    });
  }
}

function getAllUsers(req, res) {
  try {
    const users = db.all(`
      SELECT id, email, role, is_active, created_at
      FROM users
    `);

    res.json(users);
  } catch (err) {
    res.status(500).json({
      message: 'Failed to fetch users',
    });
  }
}

function deleteUser(req, res) {
  try {
    const { id } = req.params;
    const adminId = req.session.user.id;

    //Logging delete user admin attempt
    logEvent({
      userId: adminId,
      action: 'DELETE_USER',
      status: 'SUCCESS',
      ipAddress: req.ip,
    });

    if (Number(id) === req.session.user.id) {
      return res.status(400).json({
        message: 'Admin cannot delete their own account',
      });
    }

    db.run('DELETE FROM users WHERE id = ?', [id]);

    res.json({
      message: 'User deleted successfully',
    });
  } catch (err) {
    res.status(500).json({
      message: 'Delete failed',
    });
  }
}

function getLogs(req, res) {
  try {
    const logs = db.all(`
      SELECT *
      FROM logs
      ORDER BY timestamp DESC
    `);

    res.json(logs);
  } catch (err) {
    res.status(500).json({
      message: 'Failed to fetch logs',
    });
  }
}

module.exports = {
  createUser,
  getAllUsers,
  deleteUser,
  getLogs
};