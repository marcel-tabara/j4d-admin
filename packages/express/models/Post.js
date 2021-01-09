const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
  created: { type: Date, required: true },
  updated: { type: Date, required: true },
  priority: { type: String, required: false },
  markdown: { type: Object, required: true },
  seo: { type: Object, required: true },
})

module.exports = mongoose.model('Post', PostSchema)
