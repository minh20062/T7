// routes/user.routes.js
const express = require('express');
const router = express.Router();
const authorizeRole = require('../middleware/authorizeRole');
const ROLES = require('../constants/roles');

// Route chỉ admin truy cập
router.get('/admin-only', authorizeRole(ROLES.ADMIN), (req, res) => {
  res.send('Chào Admin!');
});

// Route admin + staff được truy cập
router.get('/manage-data', authorizeRole(ROLES.ADMIN, ROLES.STAFF), (req, res) => {
  res.send('Chào quản trị viên hoặc nhân viên!');
});

module.exports = router;