const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  seo: { type: Object, required: false },
  markdown: { type: String, required: true },
  created: { type: Date, required: false },
  updated: { type: Date, required: false },
  category: { type: String, required: false },
  subcategory: { type: String, required: false },
  priority: { type: String, required: false },
});

module.exports = mongoose.model('Post', PostSchema);
