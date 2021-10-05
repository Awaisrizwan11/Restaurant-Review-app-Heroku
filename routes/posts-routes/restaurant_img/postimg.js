const _ = require('lodash');
const {User} = require('../../../models/postSchema');
const express = require('express');
const app = express();
const router = express.Router();
const Joi = require('joi');
const fileUpload =require('../restaurant_img/lib/index')

app.use('/form', express.static(__dirname + 'C:/Users/CyberFoxWS3/Desktop/Restaurant-App Project/restaurant-app-frontend/src/Dashboard/Additems/Additem.js'));

// default options
app.use(fileUpload());

app.get('/ping', function(req, res) {
  res.send('pong');
});

app.post('/upload', function(req, res) {
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send('No files were uploaded.');
    return;
  }

  console.log('req.files >>>', req.files); // eslint-disable-line

  sampleFile = req.files.sampleFile;

  uploadPath = __dirname + '/uploads/' + sampleFile.name;

  sampleFile.mv(uploadPath, function(err) {
    if (err) {
      return res.status(500).send(err);
    }

    res.send('File uploaded to ' + uploadPath);
  });
});

// router.use(express.static(__dirname +"../restaurant_img/"))

// router.post('/' ,async (req, res) => {
//   const {
//     error
//   } = schema.validate(req.body);

//   if(req.files){
//       console.log(req.files);
//       var file = req.files.file
//       var filename = file.name
//       console.log(filename)

//       file.mv('/routes/posts-routes/restaurant_img/uploads' +filename , function(err){
//         if(err){
//             res.send(err)
//         }
//             else{
//                 res.send("file Uploaded")
//             }
//         }

//       )
//   }


// });


// const schema = Joi.object({
//     user_name: Joi.string().min(5).max(50).required(),
//     restaurant_name: Joi.string().min(5).max(50).required(),
//     restaurant_review: Joi.string().min(5).max(50).required(),
//     restaurant_img: Joi.string().min(5).max(50)
    
//   });

module.exports = router; 
