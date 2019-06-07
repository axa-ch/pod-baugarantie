const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.set('content-type', 'application/json');
  res.send(
    [
      {
        name: 'Vertragsübersicht',
        url: '/'
      },{
        name: 'Neuer Garantieschein',
        url: '/new'
      },{
        name: 'Laufende Garantiescheine',
        url: '/ongoing'
      },{
        name: 'Abgelaufene, annulierte und abgelehnte Garantiescheine',
        url: '/cancelled'
      },{
        name: 'Depot Erneuerung',
        url: '/depot-renewal'
      },{
        name: 'Engagement per Stichtag',
        url: '/engagement-per-deadline'
      },{
        name: 'Support',
        url: '/support'
      },{
        name: 'Logout',
        url: '/logout'
      }
    ]
  );
  res.end();
});

module.exports = router;
