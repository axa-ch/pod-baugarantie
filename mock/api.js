const express = require('express');

const router = express.Router();
const maam = require('./maam');
const emr = require('./emr');

router.use('/maam', maam);
router.use('/emr', emr);

router.use('/', (req, res) => {
  res.set('content-type', 'application/json');
  res.status(404).send(JSON.stringify({
    error: 'not found',
  }));
  res.end();
});

module.exports = router;
