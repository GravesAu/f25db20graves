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
exports.artifact_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Artifact detail: ' + req.params.id);
};

// Handle Artifact create on POST
exports.artifact_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Artifact create POST');
};

// Handle Artifact delete on DELETE
exports.artifact_delete = function(req, res) {
    res.send('NOT IMPLEMENTED: Artifact delete DELETE ' + req.params.id);
};

// Handle Artifact update on PUT
exports.artifact_update_put = function(req, res) {
    res.send('NOT IMPLEMENTED: Artifact update PUT ' + req.params.id);
};
