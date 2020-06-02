const route = require('express').Router();
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
    console.log('abc ---- ')
    for await (const result of ipfs.add({path: fileName, content: file})) {
        results.push(result);
    }
    console.log(results)
    return results[0].cid.toString();
};

route.post('/',(req,res) => {
    upload(req,res, async (err)=>{
        if(err){
           return res.status(500).send({message:"Error in uploading"})
        }
        const fileName = req.file.filename;
        const filePath = req.file.path;
        const fileHash = await addFile(fileName,filePath);
        console.log('FILE HASH ',fileHash)
        // fs.unlink(filePath,(err)=>{
        //     if(err) console.error('Error in unlinking file',err)
        //     console.log('FIle deleted')
        // })
        console.log(req.file);
       return res.status(200).send({
            message:"file uploaded successfully",
           fileHash
       })
    })
    console.log('File')
})


exports = module.exports = {route};