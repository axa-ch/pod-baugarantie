const express = require('express');

const router = express.Router();

const translations = {
  view: 'view',
  edit: 'edit',
  pdf: 'pdf',
};

router.get('/items', (req, res) => {
  res.set('content-type', 'application/json');
  const model = {
    thead: [
      { html: 'Title 0', sort: 'ASC' },
      { html: 'Title 1', sort: 'ASC' },
      { html: 'Title 3', sort: 'DESC' },
      { html: 'Title 2' },
      { html: 'Title 5', sort: 'ASC' },
      { html: 'Title 33', sort: 'ASC' },
      { html: 'Title 435', sort: 'DESC' },
      { html: 'Title 2345345' },
    ],
    tbody: [
      [
        { html: '<span>11 Some Text</span>' },
        { html: '<span>Some Text</span>' },
        { html: '<span>Cell 2</span>' },
        { html: 'A' },
        { html: '<span>11 Some Text</span>' },
        { html: '<span>Some Text</span>' },
        { html: '<span>Cell 2</span>' },
        {
          html: translations.view,
          interaction: {
            type: 'view'
          }
        },
      ],
      [
        { html: '<span>1 Some Text</span>' },
        { html: '<span>Z Some Text</span>' },
        { html: '<span>Cell 2</span>' },
        { html: 'B' },
        { html: '<span>1 Some Text</span>' },
        { html: '<span>Z Some Text</span>' },
        { html: '<span>Cell 2</span>' },
        { html: translations.view,
          interaction: {
            type: 'view'
          }
        },
      ],
      [
        { html: '<span>ad d sfdasdf </span>' },
        { html: '<span>kfkfo djdidjd</span>' },
        { html: '<span>Cell 44</span>' },
        { html: 'D' },
        { html: '<span>ad d sfdasdf </span>' },
        { html: '<span>kfkfo djdidjd</span>' },
        { html: '<span>Cell 44</span>' },
        {
          html: translations.edit,
          interaction: {
            type: 'edit'
          }
        },
      ],
      [
        { html: '<span>2 Some Text</span>' },
        { html: '<span>A Some Text</span>' },
        { html: '<span>Cell 90</span>' },
        { html: 'E' },
        { html: '<span>2 Some Text</span>' },
        { html: '<span>A Some Text</span>' },
        { html: '<span>Cell 90</span>' },
        {
          html: translations.view,
          interaction: {
            type: 'view'
          }
        },
      ],
      [
        { html: '<span>sdf fdfa geafvad</span>' },
        { html: '<span>d fgfrrsadf d da</span>' },
        { html: '<span>Cell 23</span>' },
        { html: 'F' },
        { html: '<span>sdf fdfa geafvad</span>' },
        { html: '<span>d fgfrrsadf d da</span>' },
        { html: '<span>Cell 23</span>' },
        {
          html: translations.view,
          interaction: {
            type: 'view'
          }
        },
      ],
      [
        { html: '<span>dfs s dfadfadf adf</span>' },
        { html: '<span>jjf  hlsdj k dsas dasd</span>' },
        { html: '<span>Cell 445</span>' },
        { html: 'G' },
        { html: '<span>dfs s dfadfadf adf</span>' },
        { html: '<span>jjf  hlsdj k dsas dasd</span>' },
        { html: '<span>Cell 445</span>' },
        {
          html: translations.edit,
          interaction: {
            type: 'edit'
          }
        },
      ],
      [
        { html: '<span>dfs diisd dsff hilud fkasjaf </span>' },
        { html: '<span>miao hallo</span>' },
        { html: '<span>Cell 99</span>' },
        { html: 'H' },
        { html: '<span>dfs diisd dsff hilud fkasjaf </span>' },
        { html: '<span>miao hallo</span>' },
        { html: '<span>Cell 99</span>' },
        {
          html: translations.view,
          interaction: {
            type: 'view'
          }
        },
      ],
    ],
  };

  const randomTypes = ['view', 'edit', 'pdf'];

  for (let i = 0; i < 20000; i++) {
    const type = randomTypes[Math.floor(Math.random() * 3)];
    model.tbody.push([
      { html: `<span>${i} dfs s dfadfadf adf </span>` },
      { html: `<span>jjf  hlsdj ${Math.ceil(Math.random(1, 40) * i, 1)} k dsas dasd</span>` },
      { html: `<span>${Math.ceil(Math.random(1, 40) * i, 1)} Cell 445</span>` },
      { html: `${Math.ceil(parseInt(Math.random(1, 40) * i, 32), 1)}` },
      { html: `<span>dfs s dfadfadf adf ${Math.ceil(Math.random(1, 40) * i, 1)}</span>` },
      { html: `<span>jjf  hlsdj ${Math.ceil(Math.random(1, 40) * i, 1)} k dsas dasd</span>` },
      { html: `<span>${Math.ceil(Math.random(1, 40) * i, 1)} Cell 445</span>` },
      {
        html: translations[type] ,
        interaction: {
          type,
          url: type === 'pdf' ? 'http://localhost:3000/api/ongoing/pdf' : undefined,
        }
      },
    ]);
  }
  res.send(model);
  res.end();
});

module.exports = router;
