const assert = require('assert');
const EmailGenerator = require('../lib/email-generator');
const deduper = require('../lib/deduper');

describe('EmailGenerator', function() {
  describe('#generateWithDupes()', function() {
    it('should generate emails', function() {
      let emails = EmailGenerator.generateWithDupes(10, 0);
      assert.equal(emails.length, 10);
    });
  });
});

describe('Deduper', function() {
  describe('#clean()', function() {
    it('should dedupe duplicate emails', function() {
      let emails = EmailGenerator.generateWithDupes(10, 0.5);
      let deduped = deduper.clean(emails);
      // the length of the deduped emails should be 5 because that's 50% of the dupes
      assert.equal(deduped.length, 5);

      // 2nd part of test
      // store a check for all deduped emails and then iterate originals to make sure deduped contain all of originals
      let exists = {};
      deduped.forEach((d) => {
        exists[d] = true;
      });

      emails.forEach((e) => {
        assert.ok(exists[e]);
      });
    });
  })
});
