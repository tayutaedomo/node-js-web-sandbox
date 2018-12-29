const express = require('express');
const router = express.Router();

const os = require('os');
const multer = require('multer');
const upload_local = multer({ dest: os.tmpdir() });
const upload_memoney = multer({}); // No file output, file.buffer only

const util = require('util')
const multiparty = require('multiparty');


router.post('/multer_local', upload_local.fields([ { name: 'file' } ]), function(req, res) {
  console.log('files', req.files);
  console.log('files.file[0]', req.files.file[0]);
  console.log('body', req.body);

  const payload =  {
    title : 'Local Store | Multer',
    data: {}
  };

  res.render('file_upload/multer_local', payload);
});

router.post('/multer_memory', upload_memoney.fields([ { name: 'file' } ]), function(req, res) {
  console.log('files', req.files);
  console.log('body', req.body);

  const payload =  {
    title : 'On Memory | Multer',
    data: {}
  };

  res.render('file_upload/multer_memory', payload);
});

router.post('/multer_xhr', upload_local.fields([ { name: 'file' } ]), function(req, res) {
  console.log('files', req.files);
  console.log('body', req.body);

  const payload = {
    files: req.files,
    body: req.body
  };

  res.send(util.inspect(payload, { depth: 10 }));
});


router.post('/multiparty', function(req, res) {
  const payload =  {
    title : 'multiparty',
    data: {}
  };

  const form = new multiparty.Form();

  form.parse(req, function(err, fields, files) {
    if (err) console.error(err.stack || err);

    console.log('body', req.body);
    console.log('fields', fields);
    console.log('files', util.inspect(files, { colors: true, depth: 10 }));

    res.render('file_upload/multiparty', payload);
  });
});


router.get('/:view', function(req, res, next) {
  res.render('file_upload/' + req.params.view, { title: req.params.view + ' | File Upload', data: {} });
});




module.exports = router;

