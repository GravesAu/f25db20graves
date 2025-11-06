var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  // Get query parameters from the URL
  let query = req.query;
  console.log(`rows ${query.rows}`);
  console.log(`cols ${query.cols}`);

  // Render the grid view and pass query data
  res.render('grid', { title: 'Grid Display', query: query });
});

module.exports = router;
