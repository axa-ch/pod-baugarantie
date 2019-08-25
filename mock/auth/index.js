const express = require('express');

const router = express.Router();

router.post('/login', (req, res) => {
  res.set('content-type', 'application/json');
  res.send({ access_token: 'ftzjkhlnasdhbgvszuaiulbhknjdKJHBJNLKBHDendhlnhb5768zhb80besouz' });
  res.end();
});

router.delete('/login', (req, res) => {
  res.set('content-type', 'application/json');
  res.send({ logout: true });
  res.end();
});

module.exports = router;
