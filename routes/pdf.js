const express = require('express');
const router = express.Router();

const fs = require('fs');
const path = require('path');
const tmp_dir_path = path.join(__dirname, '../tmp');

const PDFDocument = require('pdfkit');


router.post('/pdfkit_1', function(req, res) {
  // const payload =  {
  //   title : 'pdfkit_1 | PDF',
  //   data: {}
  // };
  // res.render('pdf/pdfkit_1', payload);

  const doc = new PDFDocument;
  const file_path = path.join(tmp_dir_path, `${(new Date()).toISOString()}.pdf`);

  doc.pipe(fs.createWriteStream(file_path));
  doc.pipe(res);

  doc.on('pageAdded', () => doc.text('Page Title'));

  doc.text('Hello world!', 100, 100);

  doc.end();
});


router.get('/:view', function(req, res, next) {
  res.render('pdf/' + req.params.view, { title: req.params.view + ' | PDF', data: {} });
});



module.exports = router;

