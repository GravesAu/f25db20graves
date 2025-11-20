const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const accountSchema = new Schema({
  username: String,
  password: String
});

accountSchema.plugin(passportLocalMongoose);

// Export the model
module.exports = mongoose.model("Account", accountSchema);
