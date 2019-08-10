const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.set('content-type', 'application/json');
  res.send(
    [
      {
        label: 'bg.contract_form.company_name',
        name: 'company_name',
        type: 'axa-input-text',
        required: true,
        lines: 3,
      },
      {
        label: 'bg.contract_form.post_code',
        name: 'post_code',
        required: true,
        type: 'axa-input-text'
      },
      {
        label: 'bg.contract_form.place',
        name: 'place',
        required: true,
        type: 'axa-input-text'
      },
      {
        label: 'bg.contract_form.countries',
        name: 'countries',
        required: true,
        type: 'axa-dropdown',
        options: [
          { name: 'bg.contract_form.countries_name.ch', value: 'ch', selected: true },
          { name: 'bg.contract_form.countries_name.li', value: 'li' },
        ]
      },
    ]
  );
  res.end();
});

module.exports = router;
