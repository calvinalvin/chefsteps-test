const Promise = require('bluebird');
const express = require('express');
const router = express.Router();
const EmailGenerator = require('../lib/email-generator');
const deduper = require('../lib/deduper');
const fs = Promise.promisifyAll(require('fs'));
const uuidV1 = require('uuid/v1');
const DOWNLOAD_PATH = './public/download';

router.get('/', function(req, res, next) {
  let num = req.query.num || 1;
  let percentDupe = req.query.pctdupe || 0;
  if (num > 100000) {
    return res.render('error', {
      message: "You cannot generate more than 100,000 records",
      error: {
        status: "Try again with less records"
      }
    });
  } else if (percentDupe > 100) {
    percentDupe = 100;
  }

  let emails = EmailGenerator.generateWithDupes(num, percentDupe);
  const benchmarkStart = process.hrtime();
  const benchmarkPrecision = 3;
  let deduped = deduper.clean(emails);
  const elapsed = process.hrtime(benchmarkStart)[1] / 1000000; // divide by a million to get nano to milli
  const benchmarkStr = `${process.hrtime(benchmarkStart)[0]}s, ${elapsed.toFixed(benchmarkPrecision)}ms`;


  const fullFile = `${uuidV1()}.csv`;
  const dedupedFile = `${uuidV1()}.csv`;
  fs.writeFileAsync(`${DOWNLOAD_PATH}/${fullFile}`, emails.join(','))
    .then(() => {
      return fs.writeFileAsync(`${DOWNLOAD_PATH}/${dedupedFile}`, deduped.join(','));
    })
    .then(() => {
      return res.render('dedupe', {
        num: num,
        percentDupe: percentDupe,
        benchmark: benchmarkStr,
        dedupedFileUrl: `/download/${dedupedFile}`,
        fullFileUrl: `/download/${fullFile}`
      });
    })
    .catch((err) => {
      return res.render('error', {
        message: "Something went wrong trying to stringify csv and write to fs",
        error: err
      });
    });
});

module.exports = router;
