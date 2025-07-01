// middleware/authorizeRole.js
const ROLES = require('../constants/roles');

const authorizeRole = (...allowedRoles) => {
  return (req, res, next) => {
    const user = req.user; // Giả sử user được gắn sau khi xác thực
    if (!user || !allowedRoles.includes(user.role)) {
      return res.status(403).json({ message: 'Không có quyền truy cập' });
    }
    next();
  };
};

module.exports = authorizeRole;