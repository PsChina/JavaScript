# WebWorker
WebWorker 是一个浏览器开启的独立线程，用于解决大计算量阻塞主线程造成卡顿的问题。

## dev环境
在 dev 环境如何优雅的使用 webworker

参考如下代码
```js
const webWorker = new Worker(new URL('./worker.js', import.meta.url), {type:'module'})
```
