const express = require('express');

const router = express.Router();

router.get('/items', (req, res) => {
  res.set('content-type', 'application/json');
  res.send(
    {
      thead: [
        { html: 'Title 0', sort: 'ASC' },
        { html: 'Title 1', sort: 'ASC' },
        { html: 'Title 3', sort: 'DESC' },
        { html: 'Title 2' },
      ],
      tbody: [
        [
          { html: '<span>11 Some Text</span>' },
          { html: '<span>Some Text</span>' },
          { html: '<span>Cell 2</span>' },
          { html: 'A' },
        ],
        [
          { html: '<span>1 Some Text</span>' },
          { html: '<span>Z Some Text</span>' },
          { html: '<span>Cell 2</span>' },
          { html: 'B' },
        ],
        [
          { html: '<span>ad d sfdasdf </span>' },
          { html: '<span>kfkfo djdidjd</span>' },
          { html: '<span>Cell 44</span>' },
          { html: 'D' },
        ],
        [
          { html: '<span>2 Some Text</span>' },
          { html: '<span>A Some Text</span>' },
          { html: '<span>Cell 90</span>' },
          { html: 'E' },
        ],
        [
          { html: '<span>sdf fdfa geafvad</span>' },
          { html: '<span>d fgfrrsadf d da</span>' },
          { html: '<span>Cell 23</span>' },
          { html: 'F' },
        ],
        [
          { html: '<span>dfs s dfadfadf adf</span>' },
          { html: '<span>jjf  hlsdj k dsas dasd</span>' },
          { html: '<span>Cell 445</span>' },
          { html: 'G' },
        ],
        [
          { html: '<span>dfs diisd dsff hilud fkasjaf </span>' },
          { html: '<span>miao hallo</span>' },
          { html: '<span>Cell 99</span>' },
          { html: 'H' },
        ],
      ],
    }
  );
  res.end();
});

module.exports = router;
