const mongoose = require("mongoose");
const documentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  filename: {
  type: String,
  required: true
 },
 filepath: {
  type: String,
  required: true
 },
 uploadedBy: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true
 },
 uploadDate: {
  type: Date,
  default: Date.now
 },
  extractedText: {
  type: String,
  required: true
 }
});
const Document = mongoose.model("Document", documentSchema);

module.exports = Document;