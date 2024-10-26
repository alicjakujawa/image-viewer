import express from 'express';
import type { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';

const PORT = 3000;
const app = express();

const storage = multer.diskStorage({
  destination:   (req, file, cb) => {
    cb(null, './images')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage });

app.use(express.static('images'));

// issue with types
app.post('/upload', upload.array('images', 10), (req: any, res: any) => {
  if (!req.files) {
    return res.status(400).json({ error: 'No files uploaded' });
  }

  const imageUrls = (req.files as Express.Multer.File[]).map(file => {
    return `http://localhost:${PORT}/${file.filename}`;
  });

  return res.json({ imageUrls });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
