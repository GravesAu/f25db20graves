var express = require('express');
var router = express.Router();
var artifact_controller = require('../controllers/artifact');

/// ARTIFACT ROUTES ///
// POST request for creating an Artifact
router.post('/', artifact_controller.artifact_create_post);
// DELETE request to delete Artifact
router.delete('/:id', artifact_controller.artifact_delete);
// PUT request to update Artifact
router.put('/:id', artifact_controller.artifact_update_put);
// GET request for one Artifact
router.get('/:id', artifact_controller.artifact_detail);
// GET request for list of all Artifact items
router.get('/', artifact_controller.artifact_list);

module.exports = router;

