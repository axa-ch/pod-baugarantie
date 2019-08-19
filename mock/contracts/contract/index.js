const express = require('express');

const router = express.Router();

router.get('/:id/overview', (req, res) => {
  const {
    params: { id },
  } = req;

  if (id === '8.551.922') {
    res.send({
      contractor: {
        name: 'BG Account 2',
        adress_line1: 'BG Test 2',
        adress_line2: 'Teststrasse 2',
        adress_line3: 'CH 4800 Zürich',
      },
      detail_overview: {
        police_nummer: '8.551.922',
        deposit_amount: '444444 CHF',
        left_amount: '30200 CHF',
        max_paying_out: '5454665 CHF',
      },
    });
  } else {
    res.send({
      contractor: {
        name: 'BG Account 1',
        adress_line1: 'BG Test 1',
        adress_line2: 'Teststrasse 1',
        adress_line3: 'CH 8400 Winterthur',
      },
      detail_overview: {
        police_nummer: '8.551.910',
        deposit_amount: '16200 CHF',
        left_amount: '5000 CHF',
        max_paying_out: '3000 CHF',
      },
    });
  }

  res.end();
});

router.get('/:id', (req, res) => {
  const { params: { id } } = req;

  if (id === '8.551.910') {
    res.send({
      'description': `here details of contract ${id}`
    });
  } else if (id === '8.551.922') {
    res.send({
      'description': `here some random details of contract ${id}`
    });
  }

  res.end();
});

module.exports = router;
