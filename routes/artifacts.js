var express = require('express');
var router = express.Router();
var artifact_controller = require('../controllers/artifact');

// Middleware to check if user is logged in
const secured = (req, res, next) => {
  if (req.user) {
    return next();
  }
  res.redirect('/login');
};

// Pug Pages
router.get('/', artifact_controller.artifact_view_all_Page);      // All artifacts
router.get('/create', secured, artifact_controller.artifact_create_Page);  // Create form (protected)
router.get('/update', secured, artifact_controller.artifact_update_Page);  // Update form (protected)
router.get('/detail', artifact_controller.artifact_view_one_Page);         // Detail page
router.get('/delete', secured, artifact_controller.artifact_delete_Page);  // Delete page (protected)

// JSON / API endpoints
router.get('/:id', artifact_controller.artifact_detail);           // JSON detail
router.post('/', secured, artifact_controller.artifact_create_post);       // Create
router.put('/:id', secured, artifact_controller.artifact_update_put);      // Update
router.delete('/:id', secured, artifact_controller.artifact_delete);       // Delete

module.exports = router;

