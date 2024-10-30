const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const File = require('../models/validate.js');
const { v4: uuid4 } = require('uuid');
const { v2: cloudinary } = require('cloudinary');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
require('dotenv').config();

router.post("/", async (req, res) => {
    try {
        const {fileName,fileUUID,fileHash,fileLink,fileSize} = req.body;
        if (!fileLink) {
            return res.status(201).json({ error: "Upload a File First!" });
        }
        const file_data = new File({
            filename:fileName,
            path:fileLink,
            uuid:fileUUID,
            filehash:fileHash,
            fileSize:fileSize,
        });
        const response = await file_data.save();
        return res.json({data:file_data});
    } catch (err) {
        return res.json({ error: err.message });
    }
})


module.exports = router;