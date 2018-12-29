const express = require('express');
const router = express.Router();

const os = require('os');
const multer = require('multer');
//const upload = multer({ dest: os.tmpdir() });
const upload = multer({}); // No file output, file.buffer only


router.post('/multer_1', upload.fields([ { name: 'file' } ]), function(req, res) {
  console.log('files', req.files);
  console.log('files.file[0]', req.files.file[0]);

  var payload =  {
    title : 'multer Simple Post',
    data: {}
  };

  res.render('file_upload/multer_1', payload);
});


router.get('/:view', function(req, res, next) {
  res.render('file_upload/' + req.params.view, { title: req.params.view + ' | File Upload', data: {} });
});



module.exports = router;

