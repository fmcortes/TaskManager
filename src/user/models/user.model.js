const mongoose = require("mongoose");
// Desctructuring === const Schema  = mongoose.Schema
const { Schema } = mongoose;

const UserSchema = new Schema({
   name: { type: String, required: true},
   position: { type: String}
   //createdAt: { type: Date, default: Date.now }
});

// Exports the UserSchema for use elsewhere
module.exports = mongoose.model("users", UserSchema);
