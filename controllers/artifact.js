var Artifact = require('../models/artifact');

// List of all Artifacts
exports.artifact_list = async function(req, res) {
    try {
        let allArtifacts = await Artifact.find();
        res.json(allArtifacts); // sends all artifacts as JSON
    } catch (err) {
        res.status(500).send(`{"error": ${err}}`);
    }
};

// For a specific Artifact
exports.artifact_detail = async function(req, res) {
    console.log("detail " + req.params.id);
    try {
        const result = await Artifact.findById(req.params.id);
        if (!result) {
            res.status(404).send(`{"error": "Artifact with id ${req.params.id} not found"}`);
        } else {
            res.send(result);
        }
    } catch (error) {
        res.status(500).send(`{"error": "Error retrieving artifact with id ${req.params.id}"}`);
    }
};


// Handle Artifact create on POST
exports.artifact_create_post = async function(req, res) {
    console.log(req.body); // logs the incoming request body

    // Create a new Artifact instance
    let document = new Artifact();

    // Expecting a JSON body like:
    // {"artifact_name":"Ancient Vase", "age":120, "material":"Clay"}
    document.artifact_name = req.body.artifact_name;
    document.age = req.body.age;
    document.material = req.body.material;

    try {
        let result = await document.save(); // save to MongoDB
        res.send(result); // respond with the created document
    } catch (err) {
        res.status(500).send(`{"error": ${err}}`);
    }
};

// Handle Artifact delete on DELETE
exports.artifact_delete = function(req, res) {
    res.send('NOT IMPLEMENTED: Artifact delete DELETE ' + req.params.id);
};


// Handle Artifact update form on PUT.
exports.artifact_update_put = async function (req, res) {
  console.log(`Update on id ${req.params.id} with body ${JSON.stringify(req.body)}`);

  try {
    let toUpdate = await Artifact.findById(req.params.id);

    if (!toUpdate) {
      res.status(404);
      res.send(`{"error": "Artifact with id ${req.params.id} not found"}`);
      return;
    }

    // Update fields if they are in the request body
    if (req.body.artifact_name) toUpdate.artifact_name = req.body.artifact_name;
    if (req.body.age) toUpdate.age = req.body.age;
    if (req.body.material) toUpdate.material = req.body.material;

    let result = await toUpdate.save();
    console.log("Success " + result);
    res.send(result);
  } catch (err) {
    res.status(500);
    res.send(`{"error": "${err}: Update for id ${req.params.id} failed"}`);
  }
};

// Show all Artifacts in a Pug view
exports.artifact_view_all_Page = async function(req, res) {
  try {
    const allArtifacts = await Artifact.find(); // get all artifacts from DB
    res.render('artifacts', { 
      title: 'Artifact Search Results', 
      results: allArtifacts  // pass to Pug as "results"
    });
  } catch (err) {
    res.status(500).send(`{"error": ${err}}`);
  }
};


