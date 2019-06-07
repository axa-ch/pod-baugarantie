const express = require('express');

const router = express.Router();

const auth = require('./auth');
const menu = require('./menu');

router.use('/auth', auth);
router.use('/menu', menu);

router.use('/', (req, res) => {
  res.set('content-type', 'application/json');
  res.status(404).send(JSON.stringify({
    error: 'not found',
  }));
  res.end();
});

module.exports = router;
