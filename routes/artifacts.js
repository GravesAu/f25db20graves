var express = require('express');
var router = express.Router();
var artifact_controller = require('../controllers/artifact');

// Pug Pages
router.get('/', artifact_controller.artifact_view_all_Page); // All artifacts
router.get('/create', artifact_controller.artifact_create_Page); // Create form
router.get('/update', artifact_controller.artifact_update_Page); // Update form (needs ?id=)
router.get('/detail', artifact_controller.artifact_view_one_Page); // Detail page (?id=)

// JSON / API endpoints
router.get('/:id', artifact_controller.artifact_detail); // JSON detail
router.post('/', artifact_controller.artifact_create_post); // Create
router.put('/:id', artifact_controller.artifact_update_put); // Update
router.delete('/:id', artifact_controller.artifact_delete); // Delete

module.exports = router;

