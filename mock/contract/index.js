const express = require('express');

const router = express.Router();

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
