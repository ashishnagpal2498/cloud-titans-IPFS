const route = require('express').Router();
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const {Files} = require('../model')
//Ipfs -
const IpfsClient = require('ipfs-http-client')
const storage = multer.diskStorage({
    destination: path.join(__dirname,'../fileUploads/'),
    filename: function (req,file,cb) {
        cb(null,file.fieldname + '-'+ Date.now()+ path.extname(file.originalname))
    }
});

const upload = multer({
    storage: storage,
    limits: {fileSize: 1e+8}
}).single('file-value');

const ipfs = new IpfsClient({ host:"localhost", port:"5001", protocol: "http" });

const addFile = async (fileName, filePath) => {
    const file = fs.readFileSync(filePath);
    let results = [];
    for await (const result of ipfs.add({path: fileName, content: file})) {
        results.push(result);
    }
    return results[0].cid.toString();
};

route.post('/:id',(req,res) => {
    console.log(req.params.id);
    upload(req,res, async (err)=>{
        if(err){
           return res.status(500).send({message:"Error in uploading"})
        }
        const fileUploaded = req.file;
        const fileHash = await addFile(fileUploaded.filename,fileUploaded.path);
        console.log('FILE HASH ',fileHash);

        fs.unlink(fileUploaded.path,(err)=>{
            if(err) console.error('Error in unlinking file',err)
            console.log('FIle deleted')
        })
        console.log(req.file);
        const addFileToDB = await Files.add({
            name: fileUploaded.name,
            size: fileUploaded.size,
            type:  fileUploaded.mimetype,
            fileHash: fileHash,
            userId: req.params.id,
        });
        if(addFileToDB.error) return res.status(500).send(addFileToDB);
       return res.status(200).send(addFileToDB)
    })
    console.log('File')
})


exports = module.exports = {route};