var express = require('express');
var router = express.Router();

// GET /artifacts
router.get('/', function(req, res, next) {
  res.render('artifacts', { title: 'Search Results – Artifacts' });
});

module.exports = router;
