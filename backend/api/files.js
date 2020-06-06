const route = require('express').Router();
const {Files} = require('../model');
const multer = require('multer')
const path = require('path')
const fs = require('fs')
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
// Get file -
route.get('/:id',async (req,res)=>{
    console.log('Params Id',req.params.id);
    const file = await Files.findById(req.params.id)
    if(file.error) return res.status(500).send(file);
    return res.status(200).send(file);
});

route.post('/upload/:id',(req,res) => {
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
        const fileAlreadyExist = await Files.fileExist(fileHash);
        console.log('FIle already existt ---',fileAlreadyExist)
        if((fileAlreadyExist.result === null ))
        {
            const addFileToDB = await Files.add({
                name: fileUploaded.originalname,
                size: fileUploaded.size,
                type:  fileUploaded.mimetype,
                fileHash: fileHash,
                userId: req.params.id,
            });
            if(addFileToDB.error) return res.status(500).send(addFileToDB);
            return res.status(200).send(addFileToDB)
        }
        else {
            if(fileAlreadyExist.error) return res.status(500).send(fileAlreadyExist)
            return res.status(200).send(fileAlreadyExist)
        }
    })
    console.log('File')
});
route.get('/user/:id',async (req,res)=>{
    const files = await Files.fileUser(req.params.id)
    if(files.error) return res.status(500).send(files);
    return res.status(200).send(files);
})

exports = module.exports = {route};