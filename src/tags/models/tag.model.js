const mongoose = require('mongoose');
const { Schema } = mongoose;

const TagSchema = new Schema({
   name: { type: String, required: true},
   status: { type: Boolean, required: true},
   description: { type: String},
   createdAt: { type: Date, default: Date.now },
   updatedAt: { type: Date, default: Date.now },
});

TagSchema.pre('save', next => {
   now = new Date();
   if (!this.createdAt) {
      this.createdAt = now;
   }
   next();
});

module.exports = mongoose.model('tag', TagSchema);