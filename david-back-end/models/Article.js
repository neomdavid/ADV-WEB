const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: Array, required: true }, // Array of sections (paragraphs, headings, lists, etc.)
  author: { type: String, required: true },
  date: { type: String, required: true },
  image: { type: String },
  isActive: { type: Boolean, default: true },
});

module.exports = mongoose.model('Article', articleSchema); 