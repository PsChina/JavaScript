# WebWorker
WebWorker 是一个浏览器开启的独立线程，用于解决大计算量阻塞主线程造成卡顿的问题。

## dev环境
在 dev 环境如何优雅的使用 webworker

参考如下代码
```js
import worker from './worker.js?raw' // ?raw 是为了标识以文件的方式 import， 而不是以内容的方式。
const blob = new Blob([worker], {type:'application/javascript'})
const workUrl = window.URL.createObjectURL(blob)
const webWorker = new Worker(workUrl)
```
