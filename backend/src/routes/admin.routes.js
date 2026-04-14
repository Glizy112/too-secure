const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth.middleware');
const allowRoles = require('../middleware/role.middleware');
const { getLogs, createUser } = require('../controllers/admin.controller');

const {
  getAllUsers,
  deleteUser,
} = require('../controllers/admin.controller');

router.post(
  "/users",
  authMiddleware,
  allowRoles("admin"),
  createUser
);

router.get(
  '/users',
  authMiddleware,
  allowRoles('admin'),
  getAllUsers
);

router.delete(
  '/users/:id',
  authMiddleware,
  allowRoles('admin'),
  deleteUser
);

router.get(
  '/logs',
  authMiddleware,
  allowRoles('admin'),
  getLogs
);

module.exports = router;