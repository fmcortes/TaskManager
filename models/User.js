const mongoose = require('mongoose');

// Destructuring Schema from mongoose
const { Schema } = mongoose;
// Define user schema.
const userSchema = new Schema();

mongoose.model('users', userSchema);