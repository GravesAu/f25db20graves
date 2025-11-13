const mongoose = require('mongoose');

const artifactSchema = new mongoose.Schema({
    artifact_name: String,
    age: Number,
    material: String
});

module.exports = mongoose.model('Artifact', artifactSchema);
