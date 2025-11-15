var express = require('express');
var router = express.Router();
var artifact_controller = require('../controllers/artifact');

/// JSON / API Endpoints ///

// Get all artifacts (JSON)
router.get('/artifacts', artifact_controller.artifact_list);

// Get a single artifact by ID (JSON)
router.get('/artifacts/:id', artifact_controller.artifact_detail);

// Create a new artifact
router.post('/artifacts', artifact_controller.artifact_create_post);

// Update an artifact
router.put('/artifacts/:id', artifact_controller.artifact_update_put);

// Delete an artifact
router.delete('/artifacts/:id', artifact_controller.artifact_delete);

module.exports = router;
