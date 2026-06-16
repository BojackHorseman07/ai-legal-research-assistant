const express = require("express");

const fs = require("fs");
const pdfParse = require("pdf-parse");

const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

const authMiddleware = require("../middleware/authMiddleware");

const Document = require("../models/Document");
router.post(
  "/upload",
  authMiddleware,
  upload.single("pdf"),
  async (req, res) => {
    try {

      const pdfBuffer = fs.readFileSync(req.file.path);


      const data = await pdfParse(pdfBuffer);

      console.log(data.text);


      const document = await Document.create({
        title: req.file.originalname,
        filename: req.file.filename,
        filepath: req.file.path,
        uploadedBy: req.user.userId,
        extractedText: data.text
      });
      


      res.json({
        message: "PDF uploaded successfully",
        file: req.file
      });

    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Error uploading document"
      });
    }
  }
);
router.get(
  "/search",
  authMiddleware,
  async (req, res) => {
    try {
      const searchTerm = req.query.q;

      const results = await Document.find({
  uploadedBy: req.user.userId,
  extractedText: {
    $regex: searchTerm
  }
});
// return res.json(results);
const firstDoc = results[0];

const position = firstDoc.extractedText.indexOf(searchTerm);

console.log("Position:", position);

const snippet = firstDoc.extractedText.substring(
  position - 100,
  position + 100
);

return res.json({
  title: firstDoc.title,
  snippet: snippet
});
      console.log(searchTerm);

      return res.json({
        success: true,
        searchTerm
      });

    } catch (error) {
      console.log(error);

      return res.status(500).json({
        message: "Error"
      });
    }
  }
);
module.exports = router;