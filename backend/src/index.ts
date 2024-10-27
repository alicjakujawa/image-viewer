import express from 'express';
import type { Request } from 'express';
import multer from 'multer';
import cors from 'cors';
import fs from 'fs';

const PORT = 3000;
const app = express();
app.use(cors());

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

// issue with types for response
app.post('/upload', upload.single('image'), (req: Request, res: any) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No files uploaded' });
  }

  const imageUrl = `http://localhost:${PORT}/${req.file.filename}`;

  return res.json({ imageUrl });
});

app.get('/images', (req: Request, res: any) => {
  fs.readdir('./images', (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Could not retrieve images' });
    }

    const imageUrls = files.map((file) => `http://localhost:${PORT}/${file}`);
    res.json({ images: imageUrls });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
