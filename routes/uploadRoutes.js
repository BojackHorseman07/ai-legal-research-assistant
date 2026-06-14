const express = require("express");

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



      const document = await Document.create({
        title: req.file.originalname,
        filename: req.file.filename,
        filepath: req.file.path,
        uploadedBy: req.user.userId
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

module.exports = router;