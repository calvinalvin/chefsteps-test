module.exports = {
  /*
  * dedupes an array of values
  */
  clean(arr) {
    //return [...new Set(arr)];
    let exists = {};
    let uniques = [];

    // use for loop because it's faster than .forEach
    for (var i = 0; i < arr.length; i++) {
      if (!exists[arr[i]]) {
        uniques.push(arr[i]);
        exists[arr[i]] = true;
      }
    }
    return uniques;
  }
};
