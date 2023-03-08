require('dotenv').config({ path: __dirname + '/.env' })
const express = require("express");
var app = express()
const multer = require('multer')
const cors = require("cors")
const userRouter = require("./api/users/user.router")
const productRouter = require("./api/product/product.router")
const path = require("path")
var bodyParser = require('body-parser')

const port = 3000



app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Parse json data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// For multi form data
// app.use(upload.single("image"));

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload')
    },
    filename: function (req, file, cb) {    
        cb(null, req.body.seller_id + '-' + file.fieldname + '-' + '' + path.extname(file.originalname))
    }
}),


    upload = multer({
        storage: storage,
        limit: { fileSize: '10000000' },
        // fileFilter: (req, file, cb) => {
        //     const fileTypes = /jpeg|jpg|png|gif/
        //     const mimeType = fileTypes.test(file.mimetype)
        //     const extname = fileTypes.test(path.extname(file.mimetype))

        //     if(mimeType && extname){
        //         return cb(null, true)
        //     }
        //     cb("Give proper file to upload")

        // }
    })




app.use("/api/users", userRouter)
app.use("/api/product", upload.fields([{ name: 'coverImage', maxCount: 1 }, { name: 'backImage', maxCount: 1 }, { name: 'othersideImage', maxCount: 1 }]), productRouter)





app.listen(process.env.APP || port, () => console.log(`Listen on port ${port}`));