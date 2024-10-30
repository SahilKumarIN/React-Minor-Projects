const express = require('express');
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const PORT = process.env.PORT || 8000;

const { v2: cloudinary } = require('cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

//connecting to Database
const connectDb = require('./database/db.js');
connectDb();

//middleware
app.use(bodyParser.json());
app.use(cors());

//static files for deployment
app.use(express.static(path.join(__dirname,'./client/build')));

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname),'./client/build/index.html');
})

//Routes
app.use('/api/files',require('./routes/routes.js'));
app.use('/files',require('./routes/show.js'));
// app.use('/api/files/download',require('./routes/download.js'));

app.listen(PORT,()=>{
    console.log(`Server is listening at PORT: ${PORT}`);
})
