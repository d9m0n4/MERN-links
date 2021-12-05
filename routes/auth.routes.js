const { Router } = require('express');
const router = Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post(
  '/register',
  [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'минимальная длина пароля 6 символов').isLength({ min: 6 }),
  ],
  async function (req, res) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ errors: errors.array, message: 'Некорректные данные при регистрации' });
      }

      const { email, password } = req.body;
      const candidate = await User.findOne({ email });

      if (candidate) {
        res.status(400).json({ message: 'такой пользователь уже существует' });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({ email, password: hashedPassword });

      await user.save();

      res.status(200).json({ message: 'пользователь создан' });
    } catch (e) {
      res.status(500).json({
        message: 'ЧТо то пошло не такККККККККК',
      });
    }
  },
);

router.post(
  '/login',
  [
    check('email', 'Ведите корректный email').normalizeEmail().isEmail(),
    check('password', 'введите пароль').exists(),
  ],
  async function (req, res) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ errors: errors.array, message: 'Некорректные данные при Входе в систему' });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: 'Пользователь не найден' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(404).json({ message: 'Неверный пароль попроюуйте снова' });
      }

      const token = jwt.sign({ userId: user.id }, config.get('JWT_SECRET'), { expiresIn: '1h' });

      res.json({ token, userId: user.id });
    } catch (e) {
      res.status(500).json({
        message: 'ЧТо то пошло не такКККК',
      });
    }
  },
);

module.exports = router;
