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
          { html: '<span>2 Some Text</span>' },
          { html: '<span>A Some Text</span>' },
          { html: '<span>Cell 2</span>' },
          { html: 'C' },
        ],
      ],
    }
  );
  res.end();
});

module.exports = router;
