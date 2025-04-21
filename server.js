const express = require('express');
const fileUpload = require('express-fileupload');
const exif = require('exif-parser');
const path = require('path');

const app = express();

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());

// Routes
app.post('/upload', (req, res) => {
  if (!req.files?.photo) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    const parser = exif.create(req.files.photo.data);
    const result = parser.parse();
    res.json(result.tags);
  } catch (err) {
    res.status(500).json({ error: 'Error parsing EXIF data' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));