const express = require('express');

const router = express.Router();

router.get('/authorize', (req, res) => {
  res.set('content-type', 'application/json');
  res.send({ access_token: 'ftzjkhlnasdhbgvszuaiulbhknjdKJHBJNLKBHDendhlnhb5768zhb80besouz' });
  res.end();
});

module.exports = router;
