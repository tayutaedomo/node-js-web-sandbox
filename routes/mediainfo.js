const express = require('express');
const router = express.Router();

const os = require('os');
const multer = require('multer');
const upload_local = multer({ dest: os.tmpdir() });

const child_process = require('child_process');
const parse = require('mediainfo-parser').parse;


router.post('/file_upload', upload_local.fields([ { name: 'file' } ]), function(req, res) {
  const payload =  {
    title : 'Local Store | mediainfo',
    data: {
      files: req.files
    }
  };

  //const mediapath = '~/Downloads/big_buck_bunny_1080p_h264.mov';
  const mediapath = req.files.file[0].path;

  child_process.exec(`mediainfo --Full --Output=XML "${mediapath}"`, (stderr, stdout) => {
    payload.data.stderr = stderr;
    payload.data.stdout = stdout;

    parse(stdout, (err, obj) => {
      payload.data.err = err;
      payload.data.obj = obj;

      res.render('mediainfo/file_upload', payload);
    });
  });
});

router.get('/:view', function(req, res, next) {
  res.render('mediainfo/' + req.params.view, { title: req.params.view + ' | mediainfo', data: {} });
});




module.exports = router;

