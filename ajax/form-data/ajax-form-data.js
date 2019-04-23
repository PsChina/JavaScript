function transformRequest(data) {
    // Do whatever you want to transform the data
    let ret = ''
    for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    return ret
}

export default transformRequest
/**
 ajax({
     url:'xxx',
     method:'xxx',
     data: transformRequest(myParams)
 })  
*/