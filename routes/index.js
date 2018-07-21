var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('^/$', (req, res, next) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

// Catch all and return home page
router.get('*', (req, res, next) => {
  res.redirect('/');
});




module.exports = router;
