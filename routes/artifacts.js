var express = require('express');
var router = express.Router();

// A little function to check if we have an authorized user and continue on
// or redirect to login.
const secured = (req, res, next) => {
  if (req.user) {
    return next();
  }
  res.redirect('/login');
};

var artifact_controller = require('../controllers/artifact');

// Pug Pages
router.get('/', artifact_controller.artifact_view_all_Page); // All artifacts
router.get('/create', artifact_controller.artifact_create_Page); // Create form

/* GET update artifact page (protected) */
router.get('/update', secured, artifact_controller.artifact_update_Page);

router.get('/detail', artifact_controller.artifact_view_one_Page); // Detail page
router.get('/delete', artifact_controller.artifact_delete_Page); // Delete page

// JSON / API endpoints
router.get('/:id', artifact_controller.artifact_detail); // JSON detail
router.post('/', artifact_controller.artifact_create_post); // Create
router.put('/:id', artifact_controller.artifact_update_put); // Update
router.delete('/:id', artifact_controller.artifact_delete); // Delete

module.exports = router;
