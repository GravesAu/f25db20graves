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

// Handle Artifact delete on DELETE.
exports.artifact_delete = async function(req, res) {
  console.log("Delete request for id " + req.params.id);

  try {
    let result = await Artifact.findByIdAndDelete(req.params.id);

    if (!result) {
      res.status(404);
      res.send(`{"error": "Artifact with id ${req.params.id} not found"}`);
      return;
    }

    console.log("Removed:", result);
    res.send(result);   // Sends back the deleted object
  } catch (err) {
    res.status(500);
    res.send(`{"error": "Error deleting: ${err}"}`);
  }
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

exports.artifact_view_all_Page = async function(req, res) {
  try {
    const allArtifacts = await Artifact.find(); // get all artifacts from DB
    res.render('artifacts', { 
      title: 'Artifact Search Results', 
      results: allArtifacts  
    });
  } catch (err) {
    res.status(500).send(`{"error": ${err}}`);
  }
};



exports.artifact_view_one_Page = async function(req, res) {
    console.log("single view for id " + req.query.id)
    try {
        let result = await Artifact.findById(req.query.id);

        if (!result) {
            // artifact not found
            res.status(404).send(`Artifact with id ${req.query.id} not found`);
            return;
        }

        res.render('artifactdetail', { 
            title: 'Artifact Detail', 
            toShow: result 
        });
    } catch (err) {
        res.status(500);
        res.send(`{'error': '${err}'}`);
    }
};

