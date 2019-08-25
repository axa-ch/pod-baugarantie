const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.set('content-type', 'application/json');
  res.send(
    [
      {
        name: 'bg.menu.overview',
        url: '/'
      },{
        name: 'bg.menu.new',
        url: '/new'
      },{
        name: 'bg.menu.ongoing',
        url: '/ongoing'
      },{
        name: 'Logout',
        url: '/logout'
      }
    ]
  );
  res.end();
});

module.exports = router;
