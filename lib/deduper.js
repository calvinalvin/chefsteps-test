module.exports = {
  /*
  * dedupes an array of values
  * uses a Set, since sets by nature do not allow for dupes, then just recasts it back into an Array
  */
  clean(array) {
    return [...new Set(array)];
  }
};
