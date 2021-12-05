const { Router } = require('express');
const Link = require('../models/Link');
const router = Router();
const config = require('config');
const shortid = require('shortid');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/generate', authMiddleware, async (req, res) => {
  try {
    const baseUrl = config.get('BASE_URL');

    const { from } = req.body;

    const code = shortid.generate();

    const existing = await Link.findOne({ from });

    if (existing) {
      return res.json({ link: existing });
    }

    const to = baseUrl + '/t/' + code;

    const link = new Link({
      code,
      to,
      from,
      owner: req.user.userId,
    });

    await link.save();

    res.status(201).json({ link });
  } catch (e) {
    res.status(500).json({
      message: 'ЧТо то пошло не такККККККККК',
    });
  }
});

router.get('/', authMiddleware, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.userId });
    res.json(links);
  } catch (e) {
    res.status(500).json({
      message: 'ЧТо то пошло не такККККККККК',
    });
  }
});

router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const links = await Link.findById(req.params.id);
    res.json(links);
  } catch (e) {
    res.status(500).json({
      message: 'не удалось получить ссылку по id',
    });
  }
});

module.exports = router;
