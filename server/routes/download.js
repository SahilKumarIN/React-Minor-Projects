const router = require('express').Router();
const File = require('../models/validate.js');
// const https = require('https');
const download = require('download');
const https = require('https');

router.get('/:uuid', async (req, res) => {
    const uuid = req.params.uuid;
    const file = await File.findOne({ uuid });
    if (!file) {
        return res.status(404).json({ msg: "File Not Found! or Link Has Been Expired!" });
    }
    // https.get(file.path,(fileStream)=>{
    //     fileStream.pipe(res);
    // })
    // res.download(file.path);
    // await download(file.path);
    // return res.json({
    //     downloadLink: file.path,
    // })

});

module.exports = router;