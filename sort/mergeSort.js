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

module.exports = mergeSort;
