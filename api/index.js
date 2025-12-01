import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import postRoutes from './routes/posts.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import multer from 'multer';
import { upload } from './cloudinary.js';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
// app.use('/uploads', express.static('uploads'));//this makes the folder public and can be accessed through a URL


app.use(cors({
  origin: `${process.env.CLIENT_URL}`, // frontend origin
  credentials: true,
}));


// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './uploads')
//   },
//   filename: function (req, file, cb) {
//     // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//     // cb(null, file.fieldname + '-' + uniqueSuffix)
//     cb(null,Date.now() + "-" + file.originalname )
//   }
// })
// const upload = multer({ storage: storage })
// app.post('/api/upload', upload.single('file'), function (req, res) {
//     const file = req.file;
//     res.status(200).json(file.filename);
// })


// Cloudinary upload route
// app.post('/api/upload', upload.single('file'), (req, res) => {
//   console.log("Hello world");
//   try {
//     // req.file.path contains the Cloudinary URL
//     res.status(200).json({ url: req.file.path });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json("Image upload failed");
//   }
// });

// app.get("/api/upload",(req, res)=>{
//   res.json({message: "Hello world"})
// })

app.post('/api/upload', (req, res, next) => {
  upload.single('file')(req, res, (err) => {
    if (err) {
      console.error("Multer error:", err);
      return res.status(500).json({ error: "Upload failed" });
    }
    console.log("Upload route hit");
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });
    res.status(200).json({ url: req.file.path });
  });
});



app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)

const port = process.env.PORT || 8800;
// process.env.PORT is provided by render.com
app.listen(port, () => {
  console.log("Server is running on port " + port);
});