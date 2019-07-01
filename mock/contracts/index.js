const express = require('express');

const router = express.Router();

router.get('/values', (req, res) => {
  res.send([
    { nummer: '8.551.910' },
    { nummer: '8.551.922' },
  ]);
  res.end();
});

module.exports = router;
