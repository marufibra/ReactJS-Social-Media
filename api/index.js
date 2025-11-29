import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import postRoutes from './routes/posts.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import multer from 'multer';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));//this makes the folder public and can be accessed through a URL


app.use(cors({
    origin: `${process.env.CLIENT_URL}`, // frontend origin
    credentials:true,
}));


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    // cb(null, file.fieldname + '-' + uniqueSuffix)
    cb(null,Date.now() + "-" + file.originalname )
  }
})

const upload = multer({ storage: storage })


app.post('/api/upload', upload.single('file'), function (req, res) {
    const file = req.file;
    res.status(200).json(file.filename);
})

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)

app.listen(8800,()=>{
    console.log('Server running...')
})