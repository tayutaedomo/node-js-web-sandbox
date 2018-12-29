const express = require('express');
const router = express.Router();

const os = require('os');
const multer = require('multer');
const upload_local = multer({ dest: os.tmpdir() });
const upload_memoney = multer({}); // No file output, file.buffer only


router.post('/multer_local', upload_local.fields([ { name: 'file' } ]), function(req, res) {
  console.log('files', req.files);
  console.log('files.file[0]', req.files.file[0]);
  console.log('body', req.body);

  var payload =  {
    title : 'Local Store | Multer',
    data: {}
  };

  res.render('file_upload/multer_local', payload);
});

router.post('/multer_memory', upload_memoney.fields([ { name: 'file' } ]), function(req, res) {
  console.log('files', req.files);
  console.log('body', req.body);

  var payload =  {
    title : 'On Memory | Multer',
    data: {}
  };

  res.render('file_upload/multer_memory', payload);
});


router.get('/:view', function(req, res, next) {
  res.render('file_upload/' + req.params.view, { title: req.params.view + ' | File Upload', data: {} });
});



module.exports = router;

