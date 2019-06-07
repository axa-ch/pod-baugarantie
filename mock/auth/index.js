const express = require('express');

const router = express.Router();

router.post('/login', (req, res) => {
  res.set('content-type', 'application/json');
  console.log(req.body)
  res.send({ access_token: 'ftzjkhlnasdhbgvszuaiulbhknjdKJHBJNLKBHDendhlnhb5768zhb80besouz' });
  res.end();
});

module.exports = router;
