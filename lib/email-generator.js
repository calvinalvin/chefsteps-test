const faker = require('faker');

class EmailGenerator {
  static shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  /*
  * generates fake emails MAX 100,000
  * @param num {Int} - the number of emails to generate
  * @param percentDuplicate {Double} - the percentage we want to be
  *   duplicates for example 0.5 would return 50% duplicates
  */
  static generateWithDupes(num = 1, percentDuplicate = 0) {
    if (num > 100000) {
      num = 10000;
    }
    if (percentDuplicate < 0) {
      percentDuplicate = 0;
    } else if (percentDuplicate > 1) {
      percentDuplicate = 1;
    }

    let uniques = [];
    let dupes = [];
    const numDupe = num * percentDuplicate;
    const numUnique = num - numDupe;
    for (var i = 0; i < numUnique; i++) {
      uniques.push(faker.internet.email());
    }

    dupes = uniques.slice(0, numDupe);

    return EmailGenerator.shuffle(uniques.concat(dupes));
  }
};

module.exports = EmailGenerator;
