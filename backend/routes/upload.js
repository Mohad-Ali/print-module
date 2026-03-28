const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse/lib/pdf-parse");  // ✅ correct
const fs = require("fs");

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/", upload.single("file"), async (req, res) => {
  try {
    console.log("REQ.FILE:", req.file);

    if (!req.file) {
      return res.status(400).json({ error: "File not received" });
    }

    const dataBuffer = fs.readFileSync(req.file.path);
    const pdfData = await pdfParse(dataBuffer); // ✅ correct usage

    res.json({
      fileName: req.file.filename,
      pageCount: pdfData.numpages,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;