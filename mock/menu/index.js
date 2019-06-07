const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.set('content-type', 'application/json');
  res.send(
    [
      {
        name: 'home',
        url: '/'
      },{
        name: 'dashboard',
        url: '/dashboard'
      },{
        name: 'asdfg',
        url: '/asdfg'
      }
    ]
  );
  res.end();
});

module.exports = router;
