var express = require('express');
const artifact_controller = require('../controllers/artifact');
var router = express.Router();

/* GET artifacts page */
router.get('/', artifact_controller.artifact_view_all_Page);

module.exports = router;
