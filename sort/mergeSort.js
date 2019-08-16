function mergeSort(arr, middle = Math.floor(arr.length / 2) || 1, temp = []){
  if(arr.length>2){
    const leftArr = mergeSort(arr.slice(0,middle));
    const rightArr = mergeSort(arr.slice(middle));
    while(leftArr.length){
      if(leftArr[0]>rightArr[0]){
        temp.push(rightArr.shift())
      }else{
        temp.push(leftArr.shift())
      }
    }
    while(rightArr.length){
      temp.push(rightArr.shift())
    }
    return temp;
  } else if(arr.length === 2) {
    if(arr[0]>arr[1]){
      const tempNum = arr[0];
      arr[0] = arr[1];
      arr[1] = tempNum;
      return arr;
    } else {
      return arr; 
    }
  } else {
    return arr;
  }
}


function mergePass(arr = [], temp = new Array(arr.length), N = arr.length, length = 1){
  let t;
  for (t = 0; Math.pow(2,t) < N; t++, length *= 2) {
    const even = t%2 === 0;
    for (let i = 0;  i < N; i += 2 * length) {
      merge(even ? arr : temp, even ? temp : arr, i, i + length, i + (2 * length));
    }
  }
  merge(arr, temp, 0, Math.pow(2,t-1), Math.pow(2,t));
  temp.length = N;
  return temp;
}


function merge(arr, temp, left, middle, right){
  const leftEnd = middle - 1;
  while (left <= leftEnd && middle < right) {
    if (arr[left] > arr[middle]) {
      temp[left + middle - leftEnd -1] = arr[middle++];
    } else {
      temp[left + middle - leftEnd -1] = arr[left++];
    }
  }
  while(left > leftEnd && middle < right){
    temp[left + middle - leftEnd -1] = arr[middle++];
  }
  while(left <= leftEnd && middle >= right){
    temp[left + middle - leftEnd -1] = arr[left++];
  }
}

module.exports = mergePass;