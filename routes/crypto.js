const express = require('express');
const router = express.Router();


router.post('/encrypt', (req, res) => {
  // TODO
});


router.get('/:view', function(req, res, next) {
  const local = {
    title: req.params.view + ' | Crypto', data: {}
  };

  res.render('crypto/' + req.params.view, local);
});



module.exports = router;

