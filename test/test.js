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
    it('shouuld dedupe duplicate emails', function() {
      let emails = EmailGenerator.generateWithDupes(10, 0.5);
      let deduped = deduper.clean(emails);
      // the length of the deduped emails should be 5 because that's 50% of the dupes
      assert.equal(deduped.length, 5);
    });
  })
});
