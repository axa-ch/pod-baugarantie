const express = require('express');

const router = express.Router();

const contract = require('./contract');


router.get('/values', (req, res) => {
  res.send([
    { nummer: '8.551.910' },
    { nummer: '8.551.922' },
  ]);
  res.end();
});

router.use('/', contract);

module.exports = router;
