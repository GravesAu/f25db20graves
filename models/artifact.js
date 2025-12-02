const mongoose = require('mongoose');

const artifactSchema = new mongoose.Schema({
    artifact_name: String,
    age: { 
        type: Number, 
        min: 0,        // no negative ages
        max: 10000     // reasonable upper bound
    },
    material: String
});

module.exports = mongoose.model('Artifact', artifactSchema);


