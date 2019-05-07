function insertionSort(arr) {
  const result = [arr[0]];
  const { length } = arr;
  for (let i = 1; i < length; i++) {
    const oldLen = result.length;

    for (let j = 0; j < oldLen; j++) {
      if (result[j] > arr[i]) {
        result.splice(j, 0, arr[i]);
        break;
      }
    }

    if (oldLen === result.length) {
        result.push(arr[i]);
    }
  }
  return result;
}

module.exports = insertionSort
