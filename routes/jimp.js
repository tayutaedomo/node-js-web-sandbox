const express = require('express');
const router = express.Router();

const Jimp = require('jimp');
const os = require('os');
const multer = require('multer');
const upload_local = multer({ dest: os.tmpdir() });



router.post('/resize', upload_local.fields([ { name: 'file' } ]), function(req, res) {
  console.log('files', req.files);
  //console.log('files.file[0]', req.files.file[0]);
  //console.log('body', req.body);

  const payload =  {
    title : 'Resize | Jimp',
    data: {}
  };

  Jimp.read(req.files.file[0].path).then(image => {
    return image.resize(64, 64).getBase64Async(Jimp.MIME_PNG); // resize

  }).then(function(base64) {
    payload.data.image_src = base64;
    res.render('jimp/resize', payload);

  }).catch(function(err) {
    console.error(err);
    payload.data.err = err;
    res.render('jimp/resize', payload);
  });

  // res.render('jimp/resize', payload);
});

router.get('/:view', function(req, res, next) {
  res.render('jimp/' + req.params.view, { title: req.params.view + ' | Jimp', data: {} });
});



module.exports = router;

