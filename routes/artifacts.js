var express = require('express');
const artifact_controller = require('../controllers/artifact');
var router = express.Router();

/* GET artifacts page (all artifacts) */
router.get('/', artifact_controller.artifact_view_all_Page);

/* GET detail page for one artifact */
router.get('/detail', artifact_controller.artifact_view_one_Page);

module.exports = router;
