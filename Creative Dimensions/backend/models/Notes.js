// models/Note.js
const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subject: { type: String, required: true },
  pdfUrl: { type: String, required: true },
  originalPrice: { type: Number, required: true },
  discountPrice: { type: Number, required: true },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  studentsBought: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});



module.exports = mongoose.model('Note', noteSchema);