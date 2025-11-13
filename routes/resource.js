var express = require('express');
var router = express.Router();

// Require controller modules
var api_controller = require('../controllers/api');
var artifact_controller = require('../controllers/artifact');

/// API ROUTE ///
// GET resources base
router.get('/', api_controller.api);

/// ARTIFACT ROUTES ///
router.post('/artifacts', artifact_controller.artifact_create_post);
router.delete('/artifacts/:id', artifact_controller.artifact_delete);
router.put('/artifacts/:id', artifact_controller.artifact_update_put);
router.get('/artifacts/:id', artifact_controller.artifact_detail);
router.get('/artifacts', artifact_controller.artifact_list);

module.exports = router;
