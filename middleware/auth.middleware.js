const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next();
  }

  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        message: 'Пользователь не авторизован нет токена',
      });
    }
    const decoded = jwt.verify(token, config.get('JWT_SECRET'));
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      message: 'Пользователь не авторизованY',
    });
  }
};
